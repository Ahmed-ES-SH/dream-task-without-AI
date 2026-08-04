import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type loginSchemaType } from "@/validations/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { apiClient } from "@/lib/axios";
import { AUTH_API } from "@/constants/auth.api";
import { useState } from "react";
import EnableMFACard from "./EnableMFACard";
import VerifyOtpAfterLogin from "./VerifyOtpAfterLogin";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/auth-keys";
import { useNavigate } from "react-router";
import useLocale from "@/hooks/useLocale";
import { useAuth } from "@/store/auth-slice";

export function LoginForm() {
  const navigate = useNavigate();
  const locale = useLocale();
  const { setUser } = useAuth();

  const [enableMFACard, setEnableMFACard] = useState(false);
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [otp, setOtp] = useState<string>("");
  const [errorMesage, setErrorMessage] = useState<string | null>("");
  const [mfa_token, setMfaToken] = useState("");
  const [loadingOtp, setLoadingOtp] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: loginSchemaType) => {
    try {
      const response = await apiClient.post(AUTH_API.LOGIN, data);
      if (response.status == 200) {
        const mainNest = response.data.data;
        const access_token = mainNest.access_token;
        const refresh_token = mainNest.refresh_token;
        const mfa = mainNest.mfa;
        // helper for save tokens
        saveTokens(access_token, refresh_token);
        if (mainNest.mfa_required) {
          setMfaToken(mainNest.mfa_token);
          setStep("mfa");
          return;
        }

        if (!mfa.verified) {
          setEnableMFACard(true);
        }
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.status == 401) {
        setErrorMessage("The Email or Password is Invaild");
      } else {
        setErrorMessage(
          "There is an unExpected Error  , please try in another time ",
        );
      }
    }
  };

  const verifyOtp = async () => {
    try {
      setLoadingOtp(true);
      const response = await apiClient.post(AUTH_API.MFA_VERIFY, {
        code: otp,
        context: "login",
        mfa_token: mfa_token,
      });
      if (response.status == 200) {
        const mainNest = response.data.data;
        saveTokens(mainNest.access_token, mainNest.refresh_token);
        setUser(response.data.data);
        navigate(`/${locale}/dashboard`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <>
      <Card className="w-full   bg-white/60 rounded-2xl backdrop-blur-lg  dark:bg-background max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-primary">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step == "credentials" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label className="text-primary" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors && errors.email?.message && (
                    <p className="text-red-400 underline">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors && errors.password?.message && (
                    <p className="text-red-400 underline">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <CardFooter className="flex-col gap-2 bg-transparent mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 cursor-pointer mx-auto px-6 py-3 rounded-md"
                >
                  {isSubmitting && <Loader className="animate-spin" />}
                  <p>{isSubmitting ? "Login..." : "Login"}</p>
                </Button>
              </CardFooter>
            </form>
          )}

          {step == "mfa" && (
            <VerifyOtpAfterLogin
              otp={otp}
              setOtp={setOtp}
              isLoading={loadingOtp}
              onSubmit={verifyOtp}
            />
          )}
        </CardContent>
      </Card>

      <EnableMFACard
        isOpen={enableMFACard}
        onClose={() => setEnableMFACard(false)}
        reLogin={() => handleSubmit(onSubmit)}
      />
    </>
  );
}

function saveTokens(access_token: string, refresh_token: string) {
  if (!access_token || !refresh_token) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
}

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AUTH_API } from "@/constants/auth.api";
import { apiClient } from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

interface EnableMFAOtpProps {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  reLogin: () => void;
}

export default function EnableMFAOtp({
  otp,
  setOtp,
  onBack,
  reLogin,
}: EnableMFAOtpProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyOTP = async () => {
    if (isVerifying || otp.length !== 6) return;

    try {
      setIsVerifying(true);
      const response = await apiClient.post(AUTH_API.MFA_VERIFY, {
        code: otp,
      });

      if (response.status === 200) {
        onBack();
        reLogin();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <CardHeader className="border-b border-border/60 bg-muted/20 px-6 py-5">
        <CardTitle className="text-foreground">Verify Code</CardTitle>
        <CardDescription className="text-muted-foreground/90">
          Enter the 6-digit verification code.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center px-6 py-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] dark:border-white/10 dark:bg-background/80">
            <InputOTPSlot
              index={0}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
            <InputOTPSlot
              index={1}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
            <InputOTPSlot
              index={2}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
            <InputOTPSlot
              index={3}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
            <InputOTPSlot
              index={4}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
            <InputOTPSlot
              index={5}
              className="size-12 rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm transition-all dark:border-white/10 dark:bg-background/70"
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t border-border/60 px-6 py-4">
        <Button variant="outline" onClick={onBack} className="min-w-24">
          Back
        </Button>

        <Button
          disabled={otp.length !== 6 || isVerifying}
          onClick={verifyOTP}
          className="min-w-32"
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </Button>
      </CardFooter>
    </>
  );
}

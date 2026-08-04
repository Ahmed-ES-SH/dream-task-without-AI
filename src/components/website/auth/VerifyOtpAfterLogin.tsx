import { CardContent, CardFooter } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@base-ui/react/button";
import { Loader } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface VerifyOtpAfterLoginProps {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function VerifyOtpAfterLogin({
  otp,
  setOtp,
  isLoading,
  onSubmit,
}: VerifyOtpAfterLoginProps) {
  useEffect(() => {
    if (otp.length == 6) {
      onSubmit();
    }
  }, [otp]);

  return (
    <>
      <CardContent className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="flex items-center gap-2 py-4">
            <InputOTPSlot
              index={0}
              className="size-12 rounded-none shadow-md"
            />
            <InputOTPSlot
              index={1}
              className="size-12 rounded-none shadow-md"
            />
            <InputOTPSlot
              index={2}
              className="size-12 rounded-none shadow-md"
            />
            <InputOTPSlot
              index={3}
              className="size-12 rounded-none shadow-md"
            />
            <InputOTPSlot
              index={4}
              className="size-12 rounded-none shadow-md"
            />
            <InputOTPSlot
              index={5}
              className="size-12 rounded-none shadow-md"
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>

      <CardFooter className="bg-transparent">
        <Button
          className={
            "bg-primary p-2 text-white flex items-center gap-1 dark:text-black ml-auto rounded-md px-4"
          }
          onClick={onSubmit}
          disabled={otp.length != 6}
          type="submit"
        >
          {isLoading && <Loader className="animate-spin" />}
          <p>{isLoading ? "Verify..." : "Verify"}</p>
        </Button>
      </CardFooter>
    </>
  );
}

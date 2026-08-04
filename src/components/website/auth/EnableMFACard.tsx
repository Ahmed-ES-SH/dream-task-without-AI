import { useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import EnableMFAOtp from "./EnableMFAOTP";
import EnableMfaDisplayData from "./EnableMfaDisplayData";
import { apiClient } from "@/lib/axios";
import { AUTH_API } from "@/constants/auth.api";

interface EnableMFACardProps {
  isOpen: boolean;
  onClose: () => void;
  reLogin: () => void;
}

export default function EnableMFACard({
  isOpen,
  onClose,
  reLogin,
}: EnableMFACardProps) {
  const [step, setStep] = useState<"default" | "display" | "otp">("default");
  const [qrImage, setQrImage] = useState("");
  const [base32Code, setbase32Code] = useState("");
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const enableMFA = async () => {
    try {
      const body = {
        issuer: "MAYA",
      };
      const response = await apiClient.post(AUTH_API.MFA_SETUP, body);
      if (response.status == 200) {
        const mainNest = response.data.data;
        setQrImage(mainNest.qrcode_data_uri);
        setbase32Code(mainNest.secret_base32);
        setStep("display");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <Card className="w-full max-md:w-[95%] mx-auto p-2 max-w-md z-99 shadow-lg">
        {step === "default" && (
          <>
            <CardHeader>
              <CardTitle>Action Required</CardTitle>
              <CardDescription>
                You must enable Multi-Factor Authentication (MFA) before you can
                access your account.
              </CardDescription>
            </CardHeader>

            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>

              <Button onClick={enableMFA}>Enable MFA</Button>
            </CardFooter>
          </>
        )}

        {step == "display" && (
          <EnableMfaDisplayData
            qrSrc={qrImage}
            base32Code={base32Code}
            onNext={() => setStep("otp")}
          />
        )}

        {step === "otp" && (
          <EnableMFAOtp
            otp={otp}
            setOtp={setOtp}
            onBack={onClose}
            reLogin={reLogin}
          />
        )}
      </Card>
    </div>,
    document.body,
  );
}

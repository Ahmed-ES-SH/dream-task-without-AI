import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface AlertErrorProps {
  errorTitle: string;
  errorContent: string;
}

export default function AlertError({
  errorTitle,
  errorContent,
}: AlertErrorProps) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{errorTitle}</AlertTitle>
      <AlertDescription>{errorContent}</AlertDescription>
    </Alert>
  );
}

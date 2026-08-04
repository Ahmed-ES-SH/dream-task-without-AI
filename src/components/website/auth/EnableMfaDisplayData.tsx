import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface EnableMfaDisplayDataProps {
  qrSrc: string;
  base32Code: string;
  onNext: () => void;
}

export default function EnableMfaDisplayData({
  qrSrc,
  base32Code,
  onNext,
}: EnableMfaDisplayDataProps) {
  return (
    <>
      <CardContent>
        <CardTitle>Scan</CardTitle>
        <CardDescription>Scan The QR code or take the code</CardDescription>
        <div className="flex flex-col gap-3">
          <img src={qrSrc} className=" object-cover w-full h-full" />

          <div className="flex items-center max-md:flex-col gap-2">
            <p className="border max-lg:py-2 lg:h-10 flex items-center justify-center px-1 flex-1/2">
              {base32Code}
            </p>
            <Button variant={"outline"} className={"lg:h-10 rounded-none"}>
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onNext}
          className="w-1/2 cursor-pointer mx-auto px-6 py-3 rounded-md"
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}

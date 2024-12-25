import { ArrowLeft, TriangleAlert } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

interface PageErrorProps {
  error: string;
  backLink?: string;
}

const PageError = ({ error, backLink }: PageErrorProps) => {
  return (
    <div className="relative flex h-full items-center justify-center">
      {backLink && (
        <Link href={backLink} className="absolute left-5 top-5">
          <Button variant="ghost">
            <ArrowLeft />
            Zpět
          </Button>
        </Link>
      )}
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-destructive/40 p-5 text-center text-destructive-foreground">
        <TriangleAlert className="size-20" />
        <h1 className="nunito mb-2 text-3xl font-bold">Chyba</h1>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default PageError;

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Microsoft from "@/components/icons/Microsoft";
import { NextPage } from "next";
import SRGH from "@/components/icons/SRGH";
import { login } from "@/auth/actions";

const LoginPage: NextPage = () => {
  return (
    <>
      <h1 className="nunito text-9xl font-bold">HejPanel 3.0</h1>
      <span className="mx-5 inline-flex items-center gap-5 text-xl">
        By
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white">
          <SRGH className="inline-block size-12 align-sub" />
        </span>
        With
        <Heart className="inline-block size-14 align-sub text-rose-600" />
      </span>
      <h4 className="text-center">Toto je dočasné, LOL</h4>
      <Button onClick={login} className="nunito text-1xl" size="lg">
        <Microsoft className="h-10 w-10 shrink-0" />
        Přihlásit se
      </Button>
    </>
  );
};

export default LoginPage;

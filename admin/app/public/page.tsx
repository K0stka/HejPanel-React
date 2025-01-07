import { Button } from "@/components/ui/button";
import HejPanel from "@/components/icons/HejPanel";
import Microsoft from "@/components/icons/Microsoft";
import { NextPage } from "next";
import { login } from "@/auth/actions";

const LoginPage: NextPage = () => {
    return (
        <>
            <h1 className="nunito flex items-center gap-5 text-9xl font-bold">
                <HejPanel className="size-[1em]" />
                HejPanel
            </h1>
            <Button
                onClick={login}
                className="nunito text-1xl mt-8"
                variant="outline"
                size="lg"
            >
                <Microsoft className="h-10 w-10 shrink-0" />
                Přihlásit se
            </Button>
        </>
    );
};

export default LoginPage;

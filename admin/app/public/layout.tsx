import { Button } from "@/components/ui/button";
import { NextLayout } from "@/lib/types";
import SRGH from "@/components/icons/SRGH";
import ThemePicker from "@/components/theme/ThemePicker";

const Layout: NextLayout = ({ children }) => {
    return (
        <main className="m-auto flex h-dvh w-4/5 select-none flex-col items-center justify-center gap-5 text-center">
            <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#0062a3_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#3364ee_100%)]" />
            {children}
            <div className="fixed bottom-5 left-5 opacity-50 transition-opacity hover:opacity-100">
                <ThemePicker />
            </div>
            <div className="fixed bottom-5 right-5 opacity-50 transition-opacity hover:opacity-100">
                <Button
                    size="icon"
                    variant="outline"
                    className="flex w-auto cursor-default items-center gap-2 px-2"
                >
                    Made by
                    <SRGH className="size-9 shrink-0 bg-white" />
                    SRGH
                </Button>
            </div>
        </main>
    );
};

export default Layout;

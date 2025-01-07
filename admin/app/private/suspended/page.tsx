import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LogOut, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import SRGH from "@/components/icons/SRGH";
import { logout } from "@/auth/actions";

const SuspendedPage: NextPage = async () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <TriangleAlert />
                        Váš účet byl zablokován
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-1">
                    Pro více informací kontaktujte
                    <SRGH className="inline-block size-8" />
                    SRGH
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="destructive" onClick={logout}>
                        <LogOut />
                        Odhlásit se
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SuspendedPage;

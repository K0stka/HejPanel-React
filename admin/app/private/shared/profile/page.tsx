import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import { getSessionUserInfo } from "@/auth/session-hooks";
import { logout } from "@/auth/actions";

const ProfilePage: NextPage = async () => {
  const user = await getSessionUserInfo();

  return (
    <PageTemplate title="Nastavení">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <pre className="rounded-lg bg-accent p-4 text-accent-foreground">
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>

        <Button variant="destructive" onClick={logout}>
          <LogOut />
          Odhlásit se
        </Button>
      </div>
    </PageTemplate>
  );
};

export default ProfilePage;

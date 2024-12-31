import { AuthProvider } from "@/auth/context";
import { NextLayout } from "@/lib/types";
import Notifications from "@/components/Notifications";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSessionUserInfo } from "@/auth/session-utils";

const Layout: NextLayout = async ({ children }) => {
    const user = await getSessionUserInfo();

    const notifications = <Notifications />;

    return (
        <AuthProvider user={user}>
            <SidebarProvider>
                <Sidebar NotificationsElement={notifications} />
                <main className="h-screen w-full overflow-hidden">
                    {children}
                </main>
            </SidebarProvider>
        </AuthProvider>
    );
};

export default Layout;

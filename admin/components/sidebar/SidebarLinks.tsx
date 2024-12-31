import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

import Link from "next/link";
import { User } from "shared/types";
import { getPages } from "@/lib/pages";

interface SidebarLinksProps {
    user: User;
}

const SidebarLinks = ({ user }: SidebarLinksProps) => {
    const pages = getPages(user.type).filter((page) => page.showInSidebar);

    return (
        <SidebarGroup>
            <SidebarMenu>
                {pages.map((item) => (
                    <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                            asChild
                            className="transition-colors hover:bg-accent"
                        >
                            <Link href={item.path} className="text-nowrap">
                                {item.icon && <item.icon className="h-6 w-6" />}

                                {item.name}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default SidebarLinks;

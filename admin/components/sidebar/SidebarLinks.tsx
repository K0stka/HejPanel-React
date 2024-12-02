import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { adminPages, userPages } from "@/lib/pages";

import Link from "next/link";
import { User } from "shared/types";

interface SidebarLinksProps {
  user: User;
}

const SidebarLinks = ({ user }: SidebarLinksProps) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {(user.type === "admin" ? adminPages : userPages).map((item) => (
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

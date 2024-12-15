"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { JSX, useContext } from "react";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { AuthContext } from "@/auth/context";
import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./SidebarLogo";
import { SidebarUser } from "@/components/sidebar/SidebarUser";

type SidebarProps = React.ComponentProps<typeof ShadCnSidebar> & {
  NotificationsElement: JSX.Element;
};

export function Sidebar({ NotificationsElement, ...props }: SidebarProps) {
  const user = useContext(AuthContext);

  return (
    <Dialog>
      <ShadCnSidebar
        collapsible="icon"
        {...props}
        className="select-none bg-secondary/50"
      >
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarLinks user={user} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </ShadCnSidebar>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifikace</DialogTitle>
          <DialogDescription>{NotificationsElement}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

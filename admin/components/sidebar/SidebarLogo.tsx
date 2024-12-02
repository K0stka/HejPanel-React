import { Sparkles } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <h1 className="nunito flex flex-row items-center gap-3 overflow-hidden text-2xl data-[state=open]:py-3">
          <Sparkles className="h-8 w-8 shrink-0 rounded-lg" />
          HejPanel
        </h1>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarLogo;

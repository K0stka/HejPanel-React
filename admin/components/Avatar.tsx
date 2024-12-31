import { AvatarFallback, Avatar as ShadCnAvatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AvatarProps {
  user: {
    name: string;
  };
  nameOnHover?: boolean;
}

const Avatar = ({ user, nameOnHover }: AvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ShadCnAvatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="nunito rounded-lg bg-primary/40 font-bold">
              {user.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </ShadCnAvatar>
        </TooltipTrigger>
        {nameOnHover && (
          <TooltipContent>
            <p>{user.name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Avatar;

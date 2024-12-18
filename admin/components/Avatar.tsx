import { AvatarFallback, Avatar as ShadCnAvatar } from "@/components/ui/avatar";

import { User } from "shared/types";

interface AvatarProps {
  user: User;
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <ShadCnAvatar className="h-8 w-8 rounded-lg">
      <AvatarFallback className="nunito rounded-lg bg-primary/40 font-bold">
        {user.name
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </ShadCnAvatar>
  );
};

export default Avatar;

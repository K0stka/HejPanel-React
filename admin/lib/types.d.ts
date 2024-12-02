import { User } from "shared";

export type SessionUserRecord = {
  id: User["id"];
  type: User["type"];
};

export type NextLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) =>
  | JSX.Element
  | Promise<JSX.Element>;

export type PageInfo = {
  name: string;
  path: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

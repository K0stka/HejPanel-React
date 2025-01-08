import { FunctionDetails } from "shared/types";
import { toast } from "sonner";

export type NextLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) =>
    | JSX.Element
    | Promise<JSX.Element>;

export type ToastProps = FunctionDetails<typeof toast.success>["args"];

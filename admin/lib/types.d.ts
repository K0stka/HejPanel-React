export type NextLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) =>
    | JSX.Element
    | Promise<JSX.Element>;

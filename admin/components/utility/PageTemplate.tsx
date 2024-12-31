interface PageTemplateProps {
    title?: string;
    children?: React.ReactNode;
}

const PageTemplate = ({ title, children }: PageTemplateProps) => {
    return (
        <div
            className={
                "relative box-border h-screen p-10" +
                (title ? " grid grid-rows-[auto,1fr] gap-5" : "")
            }
        >
            {title && (
                <h1 className="nunito mb-2 text-3xl font-bold">{title}</h1>
            )}
            <div className="h-full overflow-y-auto">{children}</div>
        </div>
    );
};

export default PageTemplate;

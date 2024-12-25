interface PageTemplateProps {
  title: string;
  children: React.ReactNode;
}

const PageTemplate = ({ title, children }: PageTemplateProps) => {
  return (
    <div className="box-border grid h-screen grid-rows-[auto,1fr] p-5">
      <h1 className="nunito mb-2 text-3xl font-bold">{title}</h1>
      <div className="max-h-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default PageTemplate;

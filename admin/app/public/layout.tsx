import { NextLayout } from "@/lib/types";
import ThemePicker from "@/components/theme/ThemePicker";

const Layout: NextLayout = ({ children }) => {
  return (
    <main className="m-auto flex h-screen w-6/12 select-none flex-col items-center justify-center gap-5 text-center">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#3364ee_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#3364ee_100%)]" />
      {children}
      <div className="absolute bottom-5 left-5">
        <ThemePicker />
      </div>
    </main>
  );
};

export default Layout;

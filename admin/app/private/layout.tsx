import { getSession } from "@/auth/session";
import { NextLayout } from "@/lib/types";
import { adminPages, userPages } from "@/middleware";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Profil | HejPanel",
};

const Layout: NextLayout = async ({ children }) => {
	const isAdmin = (await getSession())?.type === "admin";

	return (
		<>
			<nav>
				{isAdmin
					? adminPages.map((page, i) => (
							<Link
								key={i}
								href={page.path}>
								{page.name}
							</Link>
					  ))
					: userPages.map((page, i) => (
							<Link
								key={i}
								href={page.path}>
								{page.name}
							</Link>
					  ))}
			</nav>
			<div>{children}</div>
		</>
	);
};

export default Layout;

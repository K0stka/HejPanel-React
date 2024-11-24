import { getSessionUser } from "@/auth/dal";
import Link from "next/link";

const Header = async () => {
	const user = await getSessionUser();

	return (
		<header className={user ? "logged-in" : "anonymous"}>
			HejPanel Admin
			{user && <Link href="/profile">{user.name}</Link>}
		</header>
	);
};

export default Header;

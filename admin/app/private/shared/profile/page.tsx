import { logout } from "@/auth/auth";
import { getSessionUser } from "@/auth/dal";
import { NextPage } from "next";
import { User } from "shared";

const ProfilePage: NextPage = async () => {
	const user = (await getSessionUser()) as User;

	return (
		<div>
			<h1>Profil</h1>
			<p>Id: {user.id}</p>
			<p>Jméno: {user.name}</p>
			<p>Email: {user.email}</p>
			<p>Typ: {user.type}</p>
			<button onClick={logout}>Log out</button>
		</div>
	);
};

export default ProfilePage;

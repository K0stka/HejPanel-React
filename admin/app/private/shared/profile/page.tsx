import { NextPage } from "next";
import { getSessionUserInfo } from "@/auth/session-hooks";
import { logout } from "@/auth/actions";

const ProfilePage: NextPage = async () => {
  const user = await getSessionUserInfo();

  return (
    <div>
      <h1>Profil</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Typ: {user.type}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

import { NextPage } from "next";
import { getSessionUserInfo } from "@/auth/session-hooks";

const TestPage: NextPage = async () => {
  const user = await getSessionUserInfo();

  return (
    <>
      <h1>Test</h1>
      <p>
        {user.name} ({user.email})
      </p>
    </>
  );
};

export default TestPage;

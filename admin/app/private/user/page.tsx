import { NextPage } from "next";
import { getSessionUser } from "@/auth/dal";

const TestPage: NextPage = async () => {
	const user = await getSessionUser();

	return (
		<>
			<h1>Test</h1>
			<p>
				{user?.name} ({user?.email})
			</p>
		</>
	);
};

export default TestPage;

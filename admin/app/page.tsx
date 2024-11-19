import { getFromDb } from "./actions";

export default async function Home() {
	const a = await getFromDb();

	return <h1>{JSON.stringify(a)}</h1>;
}

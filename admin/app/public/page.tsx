"use client";

import { NextPage } from "next";

import { login } from "@/auth/auth";

const LoginPage: NextPage = () => {
	return (
		<div>
			<button onClick={() => login(8)}>Login</button>
		</div>
	);
};

export default LoginPage;

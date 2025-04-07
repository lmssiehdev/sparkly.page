import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const { isAuthenticated } = await validateRequest();

	if (!isAuthenticated) {
		redirect("/");
	}

	return <>{children}</>;
}

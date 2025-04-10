import type { Metadata } from "next";
import "./globals.css";
import { gooper, hankenGrotesk } from "@/fonts";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${gooper.variable} ${hankenGrotesk.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}

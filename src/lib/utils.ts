import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function minDelay<T>(promise: Promise<T>, ms: number) {
	const delay = new Promise((resolve) => setTimeout(resolve, ms));
	const [p] = await Promise.all([promise, delay]);

	return p;
}

import { generateRandomString } from "@oslojs/crypto/random";

const random = {
	read(bytes: Uint8Array) {
		crypto.getRandomValues(bytes);
	},
};
export function generateId(length: number) {
	const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
	return generateRandomString(random, alphabet, length);
}

export const getDiscordAvatar = (id: string, avatar: string, size = 160) => {
	if (avatar === "") {
		return "https://cdn.discordapp.com/avatars/1140994582209904640/217657ddc4fcdfd2245a47844ff0d302.webp?size=160";
	}
	return `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=160`;
};

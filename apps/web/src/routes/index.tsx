import { createFileRoute } from "@tanstack/react-router";
import SearchBar from "@/components/searchbar";
import RecoverCodes, { type RecoveryItem } from "@/components/recoverCodes";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const [query, setQuery] = useState("");

	const items: RecoveryItem[] = [
		{
			id: "1",
			logoUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
			siteName: "GitHub",
			sitePath: "github.com",
			code: "123 456",
		},
		{
			id: "2",
			logoUrl: "https://www.google.com/s2/favicons?domain=discord.com&sz=64",
			siteName: "Discord",
			sitePath: "discord.com",
			code: "987 654",
		},
		{
			id: "3",
			logoUrl: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
			siteName: "Twitter/X",
			sitePath: "x.com",
			code: "246 810",
		},
	];


    return (
        <div className="container mx-auto max-w-3xl px-4 py-4">
            <SearchBar value={query} onChange={setQuery} />
            <RecoverCodes items={items} query={query} />
        </div>
    );
}

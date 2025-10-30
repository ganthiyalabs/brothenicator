import { createFileRoute } from "@tanstack/react-router";
import SearchBar from "@/components/searchbar";
import RecoverCodes, { type RecoveryItem } from "@/components/recoverCodes";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const [query, setQuery] = useState("");

    const items: RecoveryItem[] = useMemo(
        () => [
            {
                id: "1",
                logoUrl: "/logo.png",
                siteName: "Brothenticator",
                sitePath: "app/settings/security",
                code: "123 456",
                secondsRemaining: 23,
            },
            {
                id: "2",
                logoUrl: "/logo.png",
                siteName: "Example Site",
                sitePath: "account/2fa",
                code: "987 654",
                secondsRemaining: 17,
            },
            {
                id: "3",
                logoUrl: "/logo.png",
                siteName: "Another App",
                sitePath: "login/otp",
                code: "246 810",
                secondsRemaining: 9,
            },
        ],
        []
    );

    return (
        <div className="container mx-auto max-w-3xl px-4 py-4">
            <SearchBar value={query} onChange={setQuery} />
            <RecoverCodes items={items} query={query} />
        </div>
    );
}

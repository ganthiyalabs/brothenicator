import React from "react";
import { authClient } from "@/lib/auth-client";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Container } from "@/components/container";
import { queryClient } from "@/utils/trpc";
import SearchBar from "@/components/search-bar";
import RecoveryCodes, { type RecoveryItem } from "@/components/recovery-codes";

export default function Home() {
	const { data: session } = authClient.useSession();

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

	const [query, setQuery] = React.useState("");

	return (
		<Container>
			<ScrollView className="flex-1">
				<View className="px-4">
					<SearchBar value={query} onChange={setQuery} placeholder="Search codes" />

					<RecoveryCodes items={items} query={query} />
					{session?.user ? (
						<View className="mb-6 p-4 bg-card rounded-lg border border-border">
							<View className="flex-row justify-between items-center mb-2">
								<Text className="text-foreground text-base">
									Welcome, <Text className="font-medium">{session.user.name}</Text>
								</Text>
							</View>
							<Text className="text-muted-foreground text-sm mb-4">
								{session.user.email}
							</Text>

							<TouchableOpacity
								className="bg-destructive py-2 px-4 rounded-md self-start"
								onPress={() => {
									authClient.signOut();
									queryClient.invalidateQueries();
								}}
							>
								<Text className="text-white font-medium">Sign Out</Text>
							</TouchableOpacity>
						</View>
					) : null}
				</View>
			</ScrollView>
		</Container>
	);
}

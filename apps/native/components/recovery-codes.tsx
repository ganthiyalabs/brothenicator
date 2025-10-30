import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";
import CountDown from "./countDown";

export interface RecoveryItem {
	id: string;
	logoUrl: string;
	siteName: string;
	sitePath?: string;
	code: string;
}

interface RecoveryCodesProps {
	items: RecoveryItem[];
	query?: string;
}

export function RecoveryCodes({ items, query }: RecoveryCodesProps) {
	const filtered = useMemo(() => {
		const q = (query ?? "").trim().toLowerCase();
		if (!q) return items;
		return items.filter((it) => {
			return (
				it.siteName.toLowerCase().includes(q) ||
				(it.sitePath?.toLowerCase().includes(q) ?? false) ||
				it.code.toLowerCase().includes(q)
			);
		});
	}, [items, query]);

	return (
		<View className="w-full max-w-md self-center mt-8">
			<View className="gap-4">
				{filtered.map((it) => (
					<View
						key={it.id}
						className="rounded-2xl bg-secondary px-5 py-4"
					>
						<View className="flex-row items-start justify-between">
							<View className="flex-row items-center gap-4 flex-1">
								<Image
									source={{ uri: it.logoUrl }}
									className="h-10 w-10 rounded-md"
								/>
								<View className="flex-1">
									<Text numberOfLines={1} className="font-medium text-foreground text-lg">
										{it.siteName}
									</Text>
									{it.sitePath ? (
										<Text numberOfLines={1} className="text-sm text-muted-foreground">
											{it.sitePath}
										</Text>
									) : null}
								</View>
							</View>
							<View className="ml-4">
								<CountDown duration={30} size={36} strokeWidth={4} />
							</View>
						</View>
						<View className="mt-3">
							<Text selectable className="font-mono text-4xl tracking-widest text-foreground">
								{it.code}
							</Text>
						</View>
					</View>
				))}
				{filtered.length === 0 ? (
					<View className="items-center py-6">
						<Text className="text-muted-foreground">No matches</Text>
					</View>
				) : null}
			</View>
		</View>
	);
}

export default RecoveryCodes;

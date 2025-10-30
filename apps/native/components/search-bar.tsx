import React, { useMemo, useState } from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
}

export function SearchBar(props: SearchBarProps = {}) {
	const { value, onChange, placeholder } = props;
	const isControlled = typeof value === "string" && typeof onChange === "function";
	const [internalQuery, setInternalQuery] = useState("");
	const query = isControlled ? (value as string) : internalQuery;
	const setQuery = useMemo(() => (isControlled ? (onChange as (v: string) => void) : setInternalQuery), [isControlled, onChange]);

	return (
		<View className="w-full max-w-md self-center">
			<View className="relative">
				<TextInput
					value={query}
					onChangeText={setQuery}
					placeholder={placeholder ?? "Search"}
					autoFocus={false}
					returnKeyType="search"
					className="w-full rounded-2xl bg-secondary px-5 py-4 text-primary text-lg"
				/>
			</View>
		</View>
	);
}

export default SearchBar;

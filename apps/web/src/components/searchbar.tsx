import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
	value?: string;
	onChange?: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps = {}) {
	const { value, onChange } = props;
	const isControlled = typeof value === "string" && typeof onChange === "function";
	const [internalQuery, setInternalQuery] = useState("");
	const query = isControlled ? value! : internalQuery;
	const setQuery = isControlled ? onChange! : setInternalQuery;

	const inputRef = useRef<HTMLInputElement>(null);

	// Keep focus always
	useEffect(() => {
		const keepFocus = () => {
			inputRef.current?.focus();
		};

		// Focus initially
		keepFocus();

		// Refocus if the user clicks away
		window.addEventListener("blur", keepFocus);
		window.addEventListener("focus", keepFocus);

		// Optional: refocus every few seconds (safety)
		const interval = setInterval(keepFocus, 1000);

		return () => {
			window.removeEventListener("blur", keepFocus);
			window.removeEventListener("focus", keepFocus);
			clearInterval(interval);
		};
	}, []);

	return (
		<form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm mx-auto">
			<div className="relative">
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="w-full rounded-xl bg-secondary px-4 py-3 text-primary shadow-sm focus:outline-none focus:ring-0 focus-visible:outline-none"
				/>
			</div>
		</form>
	);
}

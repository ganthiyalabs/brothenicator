import { useMemo } from "react";
import CircularCountdown from "./countDown";

export interface RecoveryItem {
	id: string;
	logoUrl: string;
	siteName: string;
	sitePath?: string;
	code: string;
	// seconds in current TOTP window remaining; for mock we'll tick this down locally
	secondsRemaining?: number;
}

interface RecoverCodesProps {
	items: RecoveryItem[];
	query?: string;
}

export default function RecoverCodes({ items, query }: RecoverCodesProps) {

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
		<div className="w-full max-w-sm mx-auto mt-10">
			<div className="grid grid-cols-1 gap-3">
				{filtered.map((it) => {
					return (
						<div
							key={it.id}
							className="rounded-xl bg-secondary text-primary px-4 py-3 shadow-sm"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3 min-w-0">
									<img
										src={it.logoUrl}
										alt={it.siteName}
										className="h-8 w-8 rounded-md object-contain bg-background/50"
									/>
									<div className="min-w-0">
										<div className="font-medium truncate">{it.siteName}</div>
										{it.sitePath ? (
											<div className="text-xs text-muted-foreground truncate">{it.sitePath}</div>
										) : null}
									</div>
								</div>
								<div className="shrink-0">
									<CircularCountdown duration={30} size={36} strokeWidth={4} />
								</div>
							</div>
							<div className="mt-2 font-mono text-3xl tracking-widest select-all">
								{it.code}
							</div>
						</div>
					);
				})}
				{filtered.length === 0 ? (
					<div className="col-span-full text-center text-muted-foreground py-6">
						No matches
					</div>
				) : null}
			</div>
		</div>
	);
}

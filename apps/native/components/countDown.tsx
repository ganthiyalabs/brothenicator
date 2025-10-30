import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularCountdownProps {
	duration: number;
	size?: number;
	strokeWidth?: number;
}

export default function CircularCountdown({
	duration,
	size = 120,
	strokeWidth = 10,
}: CircularCountdownProps) {
	const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
	const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
	const [timeLeft, setTimeLeft] = useState(duration);

	useEffect(() => {
		if (timeLeft <= 0) return;
		const interval = setInterval(() => {
			setTimeLeft((prev) => Math.max(prev - 1, 0));
		}, 1000);
		return () => clearInterval(interval);
	}, [timeLeft]);

	const progress = timeLeft / duration;
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<View
			style={{ width: size, height: size }}
			className="relative items-center justify-center"
		>
			<Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
				<Circle
					stroke="rgba(255,255,255,0.2)"
					fill="transparent"
					strokeWidth={strokeWidth}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
				<Circle
					stroke="rgb(59,130,246)"
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={strokeDashoffset}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</Svg>
			<Text
				className="absolute font-bold text-xs text-white"
			>
				{timeLeft}
			</Text>
		</View>
	);
}

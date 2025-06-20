import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "明细首页" }} />
			<Stack.Screen name="recog" options={{ title: "明细详情" }} />
			<Stack.Screen name="aaa" options={{ title: "aaa" }} />
		</Stack>
	);
}

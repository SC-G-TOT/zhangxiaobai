import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="details"
				options={{
					title: "明细",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="list.bullet" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="statistic"
				options={{
					title: "统计",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="chart.bar" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add"
				options={{
					title: "",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={32} name="plus.circle.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "发现",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="safari" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="mine"
				options={{
					title: "我的",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="person.crop.circle" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

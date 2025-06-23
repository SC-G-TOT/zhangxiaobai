import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import 'react-native-url-polyfill/auto';

import { useColorScheme } from "@/hooks/useColorScheme";
import { useOcrScreenshot } from "@/hooks/useOcrScreenshot";
import { useEffect } from "react";
import { Linking } from "react-native";

export default function RootLayout() {
	const { viewRef, captureAndRecognizeText } = useOcrScreenshot();
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		Linking.getInitialURL().then((url) => {
			handleLinking(url);
		});
		const sub = Linking.addEventListener("url", ({ url }) => {
			handleLinking(url);
		});
		return () => sub.remove?.();
	}, []);

	const handleLinking = (url: string | null) => {
		console.log("url", url);
		if (!url) return;
		if (url.startsWith("zhangxiaobai://")) {
			captureAndRecognizeText();
		}
	};

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}

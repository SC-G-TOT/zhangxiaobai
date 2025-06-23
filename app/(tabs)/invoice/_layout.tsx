import { Stack } from "expo-router";

export default function InvoiceLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "账单首页" }} />
		</Stack>
	);
}

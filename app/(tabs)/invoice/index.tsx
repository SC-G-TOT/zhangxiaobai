import { HorizontalDate } from "@/components/HorizontalDate/indext";
import { ScrollView, StyleSheet, View } from "react-native";

export default function InvoiceScreen() {
	return (
		<ScrollView>
			<View style={styles.container}>
				<HorizontalDate />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 100,
	},
});

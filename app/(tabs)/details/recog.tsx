import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useOcrScreenshot } from "@/hooks/useOcrScreenshot";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";

export default function OCRScreen() {
	const { viewRef, captureAndRecognizeText } = useOcrScreenshot();
	const [textLines, setTextLines] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const handleCapture = async () => {
		try {
			setLoading(true);
			const result = await captureAndRecognizeText();
			setTextLines(result);
		} catch (error) {
			console.error("OCR error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
		>
			<ViewShot ref={viewRef} style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.box}>
						<Text style={styles.text}>
							Hello! 👋 This is some OCR test text.
						</Text>
						<Text style={styles.text}>你也可以识别中文文本。</Text>
					</View>
					<Button title="📸 截图识别" onPress={handleCapture} />
					<Text style={styles.result}>识别结果：</Text>
					{loading ? (
						<Text>正在识别...</Text>
					) : (
						textLines.map((line, i) => <Text key={i}>• {line}</Text>)
					)}
				</ScrollView>
			</ViewShot>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		gap: 20,
	},
	box: {
		padding: 20,
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
	},
	text: {
		fontSize: 16,
	},
	result: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
	},
});

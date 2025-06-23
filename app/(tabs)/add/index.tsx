import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const categories = [
	{ id: "1", name: "餐饮", icon: "fork.knife", color: "#FF9500" },
	{ id: "2", name: "交通", icon: "car", color: "#007AFF" },
	{ id: "3", name: "购物", icon: "bag", color: "#FF3B30" },
	{ id: "4", name: "娱乐", icon: "gamecontroller", color: "#34C759" },
	{ id: "5", name: "医疗", icon: "cross.case", color: "#AF52DE" },
	{ id: "6", name: "教育", icon: "book", color: "#FF9500" },
	{ id: "7", name: "住房", icon: "house", color: "#007AFF" },
	{ id: "8", name: "其他", icon: "ellipsis.circle", color: "#8E8E93" },
];

export default function AddScreen() {
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isExpense, setIsExpense] = useState(true);

	const handleSave = () => {
		if (!amount || !selectedCategory) {
			Alert.alert("提示", "请填写金额和选择分类");
			return;
		}

		Alert.alert("成功", "记账成功！", [
			{
				text: "确定",
				onPress: () => {
					setAmount("");
					setNote("");
					setSelectedCategory("");
				},
			},
		]);
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">记一笔</ThemedText>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* 收入/支出切换 */}
				<View style={styles.typeSelector}>
					<TouchableOpacity
						style={[styles.typeButton, isExpense && styles.activeTypeButton]}
						onPress={() => setIsExpense(true)}
					>
						<ThemedText
							style={[styles.typeText, isExpense && styles.activeTypeText]}
						>
							支出
						</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.typeButton, !isExpense && styles.activeTypeButton]}
						onPress={() => setIsExpense(false)}
					>
						<ThemedText
							style={[styles.typeText, !isExpense && styles.activeTypeText]}
						>
							收入
						</ThemedText>
					</TouchableOpacity>
				</View>

				{/* 金额输入 */}
				<View style={styles.amountContainer}>
					<ThemedText type="subtitle" style={styles.currencySymbol}>
						¥
					</ThemedText>
					<TextInput
						style={styles.amountInput}
						value={amount}
						onChangeText={setAmount}
						placeholder="0.00"
						placeholderTextColor="#8E8E93"
						keyboardType="numeric"
						fontSize={32}
						fontWeight="600"
					/>
				</View>

				{/* 分类选择 */}
				<View style={styles.categorySection}>
					<ThemedText type="subtitle" style={styles.sectionTitle}>
						选择分类
					</ThemedText>
					<View style={styles.categoryGrid}>
						{categories.map((category) => (
							<TouchableOpacity
								key={category.id}
								style={[
									styles.categoryItem,
									selectedCategory === category.id &&
										styles.selectedCategoryItem,
								]}
								onPress={() => setSelectedCategory(category.id)}
							>
								<View
									style={[
										styles.categoryIcon,
										{ backgroundColor: category.color },
										selectedCategory === category.id &&
											styles.selectedCategoryIcon,
									]}
								>
									<IconSymbol size={24} name={category.icon} color="white" />
								</View>
								<ThemedText type="default" style={styles.categoryName}>
									{category.name}
								</ThemedText>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* 备注输入 */}
				<View style={styles.noteSection}>
					<ThemedText type="subtitle" style={styles.sectionTitle}>
						备注
					</ThemedText>
					<TextInput
						style={styles.noteInput}
						value={note}
						onChangeText={setNote}
						placeholder="添加备注..."
						placeholderTextColor="#8E8E93"
						multiline
					/>
				</View>

				{/* 保存按钮 */}
				<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
					<ThemedText style={styles.saveButtonText}>保存</ThemedText>
				</TouchableOpacity>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
	},
	header: {
		padding: 20,
		paddingBottom: 10,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	typeSelector: {
		flexDirection: "row",
		backgroundColor: "#F2F2F7",
		borderRadius: 8,
		padding: 4,
		marginBottom: 30,
	},
	typeButton: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 6,
	},
	activeTypeButton: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	typeText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#8E8E93",
	},
	activeTypeText: {
		color: "#007AFF",
	},
	amountContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 40,
	},
	currencySymbol: {
		fontSize: 32,
		fontWeight: "600",
		marginRight: 8,
	},
	amountInput: {
		fontSize: 32,
		fontWeight: "600",
		textAlign: "center",
		minWidth: 200,
	},
	categorySection: {
		marginBottom: 30,
	},
	sectionTitle: {
		marginBottom: 15,
	},
	categoryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	categoryItem: {
		width: "30%",
		alignItems: "center",
		marginBottom: 20,
	},
	selectedCategoryItem: {
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 10,
	},
	categoryIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	selectedCategoryIcon: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
	},
	categoryName: {
		fontSize: 12,
		textAlign: "center",
	},
	noteSection: {
		marginBottom: 30,
	},
	noteInput: {
		borderWidth: 1,
		borderColor: "#E5E5E7",
		borderRadius: 8,
		padding: 15,
		fontSize: 16,
		minHeight: 80,
		textAlignVertical: "top",
	},
	saveButton: {
		backgroundColor: "#007AFF",
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: "center",
		marginBottom: 30,
	},
	saveButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
});

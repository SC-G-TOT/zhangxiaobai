import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

// 模拟数据
const mockTransactions = [
	{
		id: "1",
		title: "午餐",
		amount: -25.5,
		category: "餐饮",
		date: "2024-01-15",
		time: "12:30",
	},
	{
		id: "2",
		title: "工资",
		amount: 5000,
		category: "收入",
		date: "2024-01-15",
		time: "09:00",
	},
	{
		id: "3",
		title: "打车",
		amount: -15.0,
		category: "交通",
		date: "2024-01-14",
		time: "18:20",
	},
	{
		id: "4",
		title: "购物",
		amount: -120.0,
		category: "购物",
		date: "2024-01-14",
		time: "16:45",
	},
	{
		id: "5",
		title: "电影票",
		amount: -45.0,
		category: "娱乐",
		date: "2024-01-13",
		time: "20:00",
	},
];

const categoryIcons = {
	餐饮: "fork.knife",
	收入: "dollarsign.circle",
	交通: "car",
	购物: "bag",
	娱乐: "gamecontroller",
};

export default function DetailsScreen() {
	const [transactions] = useState(mockTransactions);

	const renderTransaction = ({ item }) => (
		<TouchableOpacity style={styles.transactionItem}>
			<View style={styles.transactionLeft}>
				<View style={styles.iconContainer}>
					<IconSymbol
						size={24}
						name={categoryIcons[item.category] || "questionmark.circle"}
						color="#007AFF"
					/>
				</View>
				<View style={styles.transactionInfo}>
					<ThemedText type="defaultSemiBold">{item.title}</ThemedText>
					<ThemedText type="caption" style={styles.categoryText}>
						{item.category}
					</ThemedText>
				</View>
			</View>
			<View style={styles.transactionRight}>
				<ThemedText
					type="defaultSemiBold"
					style={[
						styles.amount,
						{ color: item.amount > 0 ? "#34C759" : "#FF3B30" },
					]}
				>
					{item.amount > 0 ? "+" : ""}
					{item.amount.toFixed(2)}
				</ThemedText>
				<ThemedText type="caption" style={styles.timeText}>
					{item.date} {item.time}
				</ThemedText>
			</View>
		</TouchableOpacity>
	);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">账单明细</ThemedText>
				<View style={styles.summary}>
					<ThemedText type="subtitle">本月支出: ¥1,245.50</ThemedText>
					<ThemedText type="subtitle">本月收入: ¥5,000.00</ThemedText>
				</View>
			</View>
			<FlatList
				data={transactions}
				renderItem={renderTransaction}
				keyExtractor={(item) => item.id}
				style={styles.list}
				showsVerticalScrollIndicator={false}
			/>
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
	summary: {
		marginTop: 10,
		gap: 5,
	},
	list: {
		flex: 1,
	},
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: "#E5E5E7",
	},
	transactionLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#F2F2F7",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	transactionInfo: {
		flex: 1,
	},
	categoryText: {
		color: "#8E8E93",
		marginTop: 2,
	},
	transactionRight: {
		alignItems: "flex-end",
	},
	amount: {
		fontSize: 16,
		fontWeight: "600",
	},
	timeText: {
		color: "#8E8E93",
		marginTop: 2,
	},
});

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// 模拟统计数据
const monthlyData = {
	income: 5000,
	expense: 1245.5,
	balance: 3754.5,
	categories: [
		{ name: "餐饮", amount: 450, percentage: 36, color: "#FF9500" },
		{ name: "交通", amount: 300, percentage: 24, color: "#007AFF" },
		{ name: "购物", amount: 250, percentage: 20, color: "#FF3B30" },
		{ name: "娱乐", amount: 200, percentage: 16, color: "#34C759" },
		{ name: "其他", amount: 45.5, percentage: 4, color: "#8E8E93" },
	],
};

export default function StatisticScreen() {
	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">统计</ThemedText>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* 月度概览 */}
				<View style={styles.overviewCard}>
					<ThemedText type="subtitle" style={styles.cardTitle}>
						本月概览
					</ThemedText>
					<View style={styles.overviewRow}>
						<View style={styles.overviewItem}>
							<ThemedText type="caption">收入</ThemedText>
							<ThemedText type="title" style={{ color: "#34C759" }}>
								¥{monthlyData.income.toFixed(2)}
							</ThemedText>
						</View>
						<View style={styles.overviewItem}>
							<ThemedText type="caption">支出</ThemedText>
							<ThemedText type="title" style={{ color: "#FF3B30" }}>
								¥{monthlyData.expense.toFixed(2)}
							</ThemedText>
						</View>
						<View style={styles.overviewItem}>
							<ThemedText type="caption">结余</ThemedText>
							<ThemedText type="title" style={{ color: "#007AFF" }}>
								¥{monthlyData.balance.toFixed(2)}
							</ThemedText>
						</View>
					</View>
				</View>

				{/* 支出分类 */}
				<View style={styles.categoryCard}>
					<ThemedText type="subtitle" style={styles.cardTitle}>
						支出分类
					</ThemedText>
					{monthlyData.categories.map((category, index) => (
						<View key={index} style={styles.categoryItem}>
							<View style={styles.categoryLeft}>
								<View
									style={[
										styles.categoryColor,
										{ backgroundColor: category.color },
									]}
								/>
								<ThemedText type="defaultSemiBold">{category.name}</ThemedText>
							</View>
							<View style={styles.categoryRight}>
								<ThemedText type="defaultSemiBold">
									¥{category.amount.toFixed(2)}
								</ThemedText>
								<ThemedText type="default" style={styles.percentage}>
									{category.percentage}%
								</ThemedText>
							</View>
						</View>
					))}
				</View>

				{/* 趋势图 */}
				<View style={styles.trendCard}>
					<ThemedText type="subtitle" style={styles.cardTitle}>
						支出趋势
					</ThemedText>
					<View style={styles.chartContainer}>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 60, backgroundColor: "#FF9500" }]}
							/>
							<ThemedText type="caption">周一</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 80, backgroundColor: "#007AFF" }]}
							/>
							<ThemedText type="caption">周二</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 40, backgroundColor: "#FF3B30" }]}
							/>
							<ThemedText type="caption">周三</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[
									styles.bar,
									{ height: 100, backgroundColor: "#34C759" },
								]}
							/>
							<ThemedText type="caption">周四</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 70, backgroundColor: "#8E8E93" }]}
							/>
							<ThemedText type="caption">周五</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 90, backgroundColor: "#FF9500" }]}
							/>
							<ThemedText type="caption">周六</ThemedText>
						</View>
						<View style={styles.chartBar}>
							<View
								style={[styles.bar, { height: 50, backgroundColor: "#007AFF" }]}
							/>
							<ThemedText type="caption">周日</ThemedText>
						</View>
					</View>
				</View>
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
	overviewCard: {
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	cardTitle: {
		marginBottom: 15,
	},
	overviewRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	overviewItem: {
		alignItems: "center",
		flex: 1,
	},
	categoryCard: {
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	categoryItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: "#E5E5E7",
	},
	categoryLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	categoryColor: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 10,
	},
	categoryRight: {
		alignItems: "flex-end",
	},
	percentage: {
		color: "#8E8E93",
		fontSize: 12,
	},
	trendCard: {
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	chartContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: 120,
		paddingTop: 20,
	},
	chartBar: {
		alignItems: "center",
		flex: 1,
	},
	bar: {
		width: 20,
		borderRadius: 10,
		marginBottom: 8,
	},
});

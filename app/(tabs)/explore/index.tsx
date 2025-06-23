import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const tips = [
	{
		id: "1",
		title: "如何制定预算计划",
		content: "制定合理的预算计划是理财的第一步，建议按照50/30/20法则分配收入。",
		icon: "chart.pie",
		color: "#FF9500",
	},
	{
		id: "2",
		title: "投资理财入门",
		content: "了解基本的投资知识，选择合适的投资产品，分散投资风险。",
		icon: "chart.line.uptrend.xyaxis",
		color: "#34C759",
	},
	{
		id: "3",
		title: "信用卡使用技巧",
		content: "合理使用信用卡，享受免息期，避免高额利息支出。",
		icon: "creditcard",
		color: "#007AFF",
	},
	{
		id: "4",
		title: "应急资金准备",
		content: "建议准备3-6个月的生活费作为应急资金，应对突发情况。",
		icon: "shield",
		color: "#FF3B30",
	},
];

const news = [
	{
		id: "1",
		title: "央行发布最新货币政策报告",
		time: "2小时前",
		tag: "政策",
	},
	{
		id: "2",
		title: "股市今日表现分析",
		time: "4小时前",
		tag: "股市",
	},
	{
		id: "3",
		title: "基金投资策略分享",
		time: "6小时前",
		tag: "基金",
	},
];

export default function ExploreScreen() {
	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">发现</ThemedText>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* 理财小贴士 */}
				<View style={styles.section}>
					<ThemedText type="subtitle" style={styles.sectionTitle}>
						理财小贴士
					</ThemedText>
					{tips.map((tip) => (
						<TouchableOpacity key={tip.id} style={styles.tipCard}>
							<View style={[styles.tipIcon, { backgroundColor: tip.color }]}>
								<IconSymbol size={24} name={tip.icon} color="white" />
							</View>
							<View style={styles.tipContent}>
								<ThemedText type="defaultSemiBold" style={styles.tipTitle}>
									{tip.title}
								</ThemedText>
								<ThemedText type="default" style={styles.tipText}>
									{tip.content}
								</ThemedText>
							</View>
						</TouchableOpacity>
					))}
				</View>

				{/* 财经资讯 */}
				<View style={styles.section}>
					<ThemedText type="subtitle" style={styles.sectionTitle}>
						财经资讯
					</ThemedText>
					{news.map((item) => (
						<TouchableOpacity key={item.id} style={styles.newsCard}>
							<View style={styles.newsContent}>
								<ThemedText type="defaultSemiBold" style={styles.newsTitle}>
									{item.title}
								</ThemedText>
								<View style={styles.newsMeta}>
									<View style={styles.newsTag}>
										<ThemedText style={styles.tagText}>{item.tag}</ThemedText>
									</View>
									<ThemedText type="default" style={styles.newsTime}>
										{item.time}
									</ThemedText>
								</View>
							</View>
							<IconSymbol size={20} name="chevron.right" color="#8E8E93" />
						</TouchableOpacity>
					))}
				</View>

				{/* 工具推荐 */}
				<View style={styles.section}>
					<ThemedText type="subtitle" style={styles.sectionTitle}>
						实用工具
					</ThemedText>
					<View style={styles.toolsGrid}>
						<TouchableOpacity style={styles.toolCard}>
							<View style={[styles.toolIcon, { backgroundColor: "#FF9500" }]}>
								<IconSymbol size={28} name="calculator" color="white" />
							</View>
							<ThemedText type="default" style={styles.toolName}>
								房贷计算器
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolCard}>
							<View style={[styles.toolIcon, { backgroundColor: "#34C759" }]}>
								<IconSymbol size={28} name="chart.bar" color="white" />
							</View>
							<ThemedText type="default" style={styles.toolName}>
								投资计算器
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolCard}>
							<View style={[styles.toolIcon, { backgroundColor: "#007AFF" }]}>
								<IconSymbol size={28} name="calendar" color="white" />
							</View>
							<ThemedText type="default" style={styles.toolName}>
								还款提醒
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolCard}>
							<View style={[styles.toolIcon, { backgroundColor: "#FF3B30" }]}>
								<IconSymbol size={28} name="target" color="white" />
							</View>
							<ThemedText type="default" style={styles.toolName}>
								目标设定
							</ThemedText>
						</TouchableOpacity>
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
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		marginBottom: 15,
	},
	tipCard: {
		flexDirection: "row",
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 15,
		marginBottom: 12,
		alignItems: "center",
	},
	tipIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	tipContent: {
		flex: 1,
	},
	tipTitle: {
		marginBottom: 4,
	},
	tipText: {
		color: "#8E8E93",
		fontSize: 14,
		lineHeight: 20,
	},
	newsCard: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: "#E5E5E7",
	},
	newsContent: {
		flex: 1,
	},
	newsTitle: {
		marginBottom: 8,
		lineHeight: 20,
	},
	newsMeta: {
		flexDirection: "row",
		alignItems: "center",
	},
	newsTag: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
		marginRight: 8,
	},
	tagText: {
		color: "white",
		fontSize: 12,
	},
	newsTime: {
		color: "#8E8E93",
		fontSize: 12,
	},
	toolsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	toolCard: {
		width: "48%",
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		padding: 20,
		alignItems: "center",
		marginBottom: 12,
	},
	toolIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	toolName: {
		fontSize: 14,
		textAlign: "center",
	},
});

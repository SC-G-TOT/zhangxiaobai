import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Switch,
	TouchableOpacity,
	View,
} from "react-native";

export default function MineScreen() {
	const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
	const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

	const menuItems = [
		{
			id: "1",
			title: "账户设置",
			icon: "person.circle",
			color: "#007AFF",
			action: "navigate",
		},
		{
			id: "2",
			title: "预算设置",
			icon: "chart.pie",
			color: "#FF9500",
			action: "navigate",
		},
		{
			id: "3",
			title: "数据导出",
			icon: "square.and.arrow.up",
			color: "#34C759",
			action: "navigate",
		},
		{
			id: "4",
			title: "通知设置",
			icon: "bell",
			color: "#FF3B30",
			action: "switch",
			value: notificationsEnabled,
			onValueChange: setNotificationsEnabled,
		},
		{
			id: "5",
			title: "深色模式",
			icon: "moon",
			color: "#AF52DE",
			action: "switch",
			value: darkModeEnabled,
			onValueChange: setDarkModeEnabled,
		},
		{
			id: "6",
			title: "帮助与反馈",
			icon: "questionmark.circle",
			color: "#8E8E93",
			action: "navigate",
		},
		{
			id: "7",
			title: "关于我们",
			icon: "info.circle",
			color: "#8E8E93",
			action: "navigate",
		},
	];

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">我的</ThemedText>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* 用户信息卡片 */}
				<View style={styles.userCard}>
					<View style={styles.avatarContainer}>
						<IconSymbol
							size={60}
							name="person.crop.circle.fill"
							color="#007AFF"
						/>
					</View>
					<View style={styles.userInfo}>
						<ThemedText type="title" style={styles.userName}>
							张三
						</ThemedText>
						<ThemedText type="default" style={styles.userEmail}>
							zhangsan@example.com
						</ThemedText>
						<View style={styles.userStats}>
							<View style={styles.statItem}>
								<ThemedText type="subtitle" style={styles.statNumber}>
									156
								</ThemedText>
								<ThemedText type="default" style={styles.statLabel}>
									记账天数
								</ThemedText>
							</View>
							<View style={styles.statItem}>
								<ThemedText type="subtitle" style={styles.statNumber}>
									¥12,450
								</ThemedText>
								<ThemedText type="default" style={styles.statLabel}>
									总支出
								</ThemedText>
							</View>
							<View style={styles.statItem}>
								<ThemedText type="subtitle" style={styles.statNumber}>
									¥25,000
								</ThemedText>
								<ThemedText type="default" style={styles.statLabel}>
									总收入
								</ThemedText>
							</View>
						</View>
					</View>
				</View>

				{/* 菜单列表 */}
				<View style={styles.menuSection}>
					{menuItems.map((item) => (
						<TouchableOpacity key={item.id} style={styles.menuItem}>
							<View style={styles.menuLeft}>
								<View
									style={[styles.menuIcon, { backgroundColor: item.color }]}
								>
									<IconSymbol size={20} name={item.icon} color="white" />
								</View>
								<ThemedText type="defaultSemiBold" style={styles.menuTitle}>
									{item.title}
								</ThemedText>
							</View>
							<View style={styles.menuRight}>
								{item.action === "switch" ? (
									<Switch
										value={item.value}
										onValueChange={item.onValueChange}
										trackColor={{ false: "#E5E5E7", true: "#007AFF" }}
										thumbColor="white"
									/>
								) : (
									<IconSymbol size={20} name="chevron.right" color="#8E8E93" />
								)}
							</View>
						</TouchableOpacity>
					))}
				</View>

				{/* 版本信息 */}
				<View style={styles.versionInfo}>
					<ThemedText type="default" style={styles.versionText}>
						记账助手 v1.0.0
					</ThemedText>
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
	userCard: {
		backgroundColor: "#F2F2F7",
		borderRadius: 16,
		padding: 20,
		marginBottom: 30,
		flexDirection: "row",
		alignItems: "center",
	},
	avatarContainer: {
		marginRight: 15,
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		marginBottom: 4,
	},
	userEmail: {
		color: "#8E8E93",
		marginBottom: 15,
	},
	userStats: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statNumber: {
		color: "#007AFF",
		marginBottom: 2,
	},
	statLabel: {
		color: "#8E8E93",
		fontSize: 12,
	},
	menuSection: {
		backgroundColor: "#F2F2F7",
		borderRadius: 12,
		marginBottom: 30,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: "#E5E5E7",
	},
	menuLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	menuTitle: {
		fontSize: 16,
	},
	menuRight: {
		alignItems: "center",
	},
	versionInfo: {
		alignItems: "center",
		paddingVertical: 20,
	},
	versionText: {
		color: "#8E8E93",
		fontSize: 14,
	},
});

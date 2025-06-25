import { getLabelInMonth } from "@/utils/Date";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface DateItemProps extends HorizontalDateProps {
	day: number;
}

const DateItem: React.FC<DateItemProps> = (props) => {
	const { day, year, month } = props;

	return (
		<View style={styles.dateItem}>
			<Text>{day}</Text>
			<Text>{getLabelInMonth(day, year, month)}</Text>
		</View>
	);
};

interface HorizontalDateProps {
	year?: number;
	month?: number;
}

export const HorizontalDate: React.FC<HorizontalDateProps> = (props) => {
	const { year, month } = props;

	const days = useMemo(() => {
		const _year = year ?? new Date().getFullYear();
		const _month = month ?? new Date().getMonth();
		const date = new Date(_year, _month, 0);
		return date.getDate();
	}, [year, month]);

	return (
		<ScrollView horizontal>
			{Array.from({ length: days }).map((_, index) => (
				<DateItem key={index} day={index + 1} year={year} month={month} />
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	dateItem: {
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

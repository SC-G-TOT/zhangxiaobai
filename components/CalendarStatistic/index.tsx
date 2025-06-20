import { Animated } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface ICalendarStatisticProps {
    /** 年份不传默认当前年份 */
    year?: number;
    /** 月份不传显示年份 */
    month?: number;
}

export default function CalendarStatistic(props: ICalendarStatisticProps) {
    const { year, month } = props;
    const currentYear = year ?? new Date().getFullYear();
    const days = month ? getDaysInMonth(currentYear, month) : 12;

  return (
    <ThemedView>
      {
        Array.from({length: days}).map((_, index) => (
            <Animated.View key={index} style={{
                width: 10,
                height: 10,
                backgroundColor: 'red',
            }}>
                <ThemedText>
                    {index + 1}
                </ThemedText>
            </Animated.View>
        ))
      }
    </ThemedView>
  )
}

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
}

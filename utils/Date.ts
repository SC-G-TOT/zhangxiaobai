const WEEK_LABELS = [
	"星期日",
	"星期一",
	"星期二",
	"星期三",
	"星期四",
	"星期五",
	"星期六",
];

export const getDaysInMonth = (year?: number, month?: number) => {
	const _year = year ?? new Date().getFullYear();
	const _month = month ?? new Date().getMonth();
	const date = new Date(_year, _month, 0);
	return date.getDate();
};

export const getLabelInMonth = (day: number, year?: number, month?: number) => {
	const _year = year ?? new Date().getFullYear();
	const _month = month ? month - 1 : new Date().getMonth();
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	if (_year === currentYear && currentMonth === _month) {
		const oneDay = 24 * 60 * 60 * 1000;
		const today = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate(),
		);
		const targetDate = new Date(today.getFullYear(), today.getMonth(), day);
		const diffTime = targetDate.getTime() - today.getTime();
		const diffDays = Math.round(diffTime / oneDay);

		if (diffDays === 0) return "今天";
		if (diffDays === 1) return "明天";
		if (diffDays === -1) return "昨天";
	}
	return getWeekLabel(_year, _month, day);
};

export const getWeekLabel = (year: number, month: number, day: number) => {
	return WEEK_LABELS[new Date(year, month, day).getDay()];
};

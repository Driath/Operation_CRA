import { Agent } from '../../agent/agent';
import { ImputationWithColor } from '../../imputation/imputation';
import { Mission } from '../../mission/mission';

export type DateDay = {
    date: number | null;
    day: number | null;
    missionsColors?: string[];
};

type Week = DateDay[];

// type WeekWithImputation = Week & {
//     mission?: Mission;
//     agent?: Agent;
// };
/**
 * return weeks for a given month and year
 * [
 *  [{date: 1, day: 0}, {date: 2, day: 1}, {date: 3, day: 2}, {date: 4, day: 3}, {date: 5, day: 4}, {date: 6, day: 5}, {date: 7, day: 6}],
 * ...
 * ]
 */
export const getWeeks = (
    month: number,
    year: number,
    firstDayOfWeek: number,
    imputations: ImputationWithColor[],
): Week[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const weeks: Week[] = [];
    let currentWeek: Week = [];

    // thank you chat GPT :) lacks of time to do it myself

    // Calculate how many empty cells we need before the first day of the month
    let firstDayIndex = firstDay.getDay() - firstDayOfWeek;
    if (firstDayIndex < 0) firstDayIndex += 7;

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
        currentWeek.push({
            date: null,
            day: null,
        });
    }

    // Generate days for the month
    for (let day = 1; day <= daysInMonth; day++) {
        const missionsColors = imputations
            .filter(
                imputation =>
                    imputation.date.getDate() === day &&
                    imputation.date.getFullYear() === year &&
                    imputation.date.getMonth() === month,
            )
            .map(({ color }) => color);
        currentWeek.push({
            date: day,
            day: (firstDayIndex + day - 1) % 7,
            missionsColors,
        });

        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // Add empty days after the last day of the month
    while (currentWeek.length < 7 && currentWeek.length > 0) {
        currentWeek.push({
            date: null,
            day: null,
        });
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    return weeks;
};

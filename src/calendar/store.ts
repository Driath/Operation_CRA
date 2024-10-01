import { computed, inject, InjectionToken } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { SettingsStore } from '../settings/store';

const key = 'CalendarState';

type CalendarState = {
    date: Date; // current date ref
    daysOfWeekRef: Date; // compute first day of the week ref
    limits: {
        min: Date; // could be removed ?
        max: Date; // could be removed ?
        asYears: number[];
    };
    monthRange: number;
    /**
     * [
     *  { label: 'Janvier', value: 0 },
     *  { label: 'Février', value: 1 },
     *  { label: 'Mars', value: 2 },
     *  { label: 'Avril', value: 3 },
     *  { label: 'Mai', value: 4 },
     *  { label: 'Juin', value: 5 },
     *  { label: 'Juillet', value: 6 },
     *  { label: 'Août', value: 7 },
     *  { label: 'Septembre', value: 8 },
     * ...
     */
    months: {
        label: string;
        value: number;
    }[];
};

const date = new Date();
const yearDelta = 4;
const min = new Date(date);
min.setFullYear(date.getFullYear() - yearDelta);
const max = new Date(date);
max.setFullYear(date.getFullYear() + yearDelta);

/**
 * [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
 * -4 ,-3 ,-2 ,-1 , 0 , 1 , 2 , 3 , 4
 */
const asYears = Array.from(
    { length: yearDelta * 2 + 1 },
    (_, i) => date.getFullYear() - yearDelta + i,
);

const daysOfWeekRef = new Date(Date.UTC(2024, 0, 8)); // 2024-01-08 is a Monday
const monthRange = 3;
const initialState: CalendarState = {
    date,
    daysOfWeekRef,
    limits: {
        min,
        max,
        asYears,
    },
    monthRange,
    months: [], // calculated with computed
};

const calendarStateToken = new InjectionToken<CalendarState>(key, {
    factory: (settingsStore = inject(SettingsStore)) => {
        return {
            ...initialState,
            months: Array.from({ length: 12 }, (_, i) => ({
                label: new Date(0, i).toLocaleString(settingsStore.i18n(), { month: 'short' }),
                value: i,
            })),
        };
    },
});

export const CalendarStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(calendarStateToken)),
    withComputed(store => ({
        // year: computed(() => store.date().getFullYear()),
        // month: computed(() => store.date().getMonth()),
        // day: computed(() => store.date().getDate()),
        monthsWithYear: computed(() => {
            const currentMonth = store.date().getMonth();
            const currentYear = store.date().getFullYear();
            return Array.from({ length: 3 }, (_, i) => {
                const month = (currentMonth + i) % 12;
                const year = currentYear + Math.floor((currentMonth + i) / 12);
                return { month, year };
            });
        }),
    })),
    withMethods(store => ({
        setDate(date: Date) {
            patchState(store, { date });
        },
        setYear(year: number) {
            patchState(store, {
                date: new Date(year, store.date().getMonth(), store.date().getDate()),
            });
        },
        setMonth(month: number) {
            patchState(store, {
                date: new Date(store.date().getFullYear(), month, 1),
            });
        },
    })),
);

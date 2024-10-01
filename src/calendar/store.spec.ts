import { TestBed } from '@angular/core/testing';
import { CalendarStore } from './store';

describe('ImputationStore', () => {
    let store: InstanceType<typeof CalendarStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(CalendarStore);
    });

    describe('monthsWithYear', () => {
        it('should return an array with the first three months of the current year', () => {
            const monthsWithYear = store.monthsWithYear();
            expect(monthsWithYear).toBeTruthy();
            expect(monthsWithYear.length).toBe(3);
            const currentDate = new Date();
            expect(monthsWithYear.at(0)?.month).toBe(currentDate.getMonth());
            expect(monthsWithYear.at(0)?.year).toBe(currentDate.getFullYear());
            expect(monthsWithYear.at(1)?.month).toBe(currentDate.getMonth() + 1);
            expect(monthsWithYear.at(1)?.year).toBe(currentDate.getFullYear());
            expect(monthsWithYear.at(2)?.month).toBe(currentDate.getMonth() + 2);
            expect(monthsWithYear.at(2)?.year).toBe(currentDate.getFullYear());
        });

        it('should return an array with the first threefollowing months, with december 2024', () => {
            store.setYear(2024);
            store.setMonth(11);
            const monthsWithYear = store.monthsWithYear();
            expect(monthsWithYear).toBeTruthy();
            expect(monthsWithYear.length).toBe(3);
            const december2024Date = new Date(2024, 11, 1);
            expect(monthsWithYear.at(0)?.month).toBe(december2024Date.getMonth());
            expect(monthsWithYear.at(0)?.year).toBe(december2024Date.getFullYear());
            expect(monthsWithYear.at(1)?.month).toBe(0);
            expect(monthsWithYear.at(1)?.year).toBe(2025);
            expect(monthsWithYear.at(2)?.month).toBe(1);
            expect(monthsWithYear.at(2)?.year).toBe(2025);
        });
    });

    describe('setYear', () => {
        it('should set the year', () => {
            store.setYear(2024);
            expect(store.date().getFullYear()).toBe(2024);
        });
    });

    describe('setMonth', () => {
        it('should set the month', () => {
            store.setMonth(11);
            expect(store.date().getMonth()).toBe(11);
        });
    });
});

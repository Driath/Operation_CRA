import { TestBed } from '@angular/core/testing';
import { MissionStore } from './store';

describe('MissionStore', () => {
    let store: InstanceType<typeof MissionStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(MissionStore);
    });

    describe('setSelectedMission', () => {
        it('should set the selected mission when a valid id is provided', () => {
            const missionId = 2;
            store.setSelectedMission(missionId);
            expect(store.selectedMission()).toBeTruthy();
            expect(store.selectedMission()).toEqual({
                id: 2,
                name: 'Prevent the Apocalypse',
                description: 'Avoid nuclear conflict, 🦅',
                color: 'blue',
            });
        });

        it('should throw an error when an invalid id is provided', () => {
            const invalidMissionId = 999;
            expect(() => store.setSelectedMission(invalidMissionId)).toThrowError(
                '[setSelectedMission] could not retrieve mission',
            );
        });
    });

    describe('getColorsId', () => {
        it('should return a Map with mission ids as keys and colors as values', () => {
            const colorsMap = store.getColorsId();

            expect(colorsMap instanceof Map).toBe(true);
            expect(colorsMap.size).toBe(3);
            expect(colorsMap.get(1)).toBe('red');
            expect(colorsMap.get(2)).toBe('blue');
            expect(colorsMap.get(3)).toBe('orange');
        });
    });
});

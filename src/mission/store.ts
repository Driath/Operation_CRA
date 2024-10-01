import { computed, inject, InjectionToken } from '@angular/core';
import { Mission } from './mission';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

const key = 'MissionState';

type MissionState = {
    missions: Mission[];
    selectedMission: Mission;
};
const missions = [
    {
        id: 1,
        name: 'Steal Coca Cola recipe',
        description: 'The agent has to steal the Coca Cola recipe from the evil coca cola company.',
        color: 'red',
    },
    {
        id: 2,
        name: 'Prevent the Apocalypse',
        description: 'Avoid nuclear conflict, 🦅',
        color: 'blue',
    },
    {
        id: 3,
        name: 'Neutralise the traitor 008 agent',
        description: 'Unfortunately 008 agent was a traitor.',
        color: 'orange',
    },
];

const selectedMission = missions.at(0) as Mission;

const initialState: MissionState = {
    missions,
    selectedMission,
};

const missionStateToken = new InjectionToken<MissionState>(key, {
    factory: () => initialState,
});

export const MissionStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(missionStateToken)),
    withComputed(store => ({
        getColorsId: computed(
            () => new Map(store.missions().map(mission => [mission.id, mission.color])),
        ),
    })),
    withMethods(store => ({
        setSelectedMission(idNumber: number) {
            const selectedMission = store.missions().find(mission => mission.id === idNumber);
            if (!selectedMission) {
                throw new Error('[setSelectedMission] could not retrieve mission');
            }
            patchState(store, state => ({
                ...state,
                selectedMission,
            }));
        },
    })),
);

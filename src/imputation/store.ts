import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Imputation } from './imputation';
import { inject, InjectionToken } from '@angular/core';
import { AgentStore } from '../agent/store';
import { MissionStore } from '../mission/store';
import { imputations } from './imputations.mock';

const key = 'ImputationState';

type ImputationState = {
    imputations: Imputation[];
};

const initialState = new InjectionToken<ImputationState>(key, {
    factory: () => ({
        imputations,
    }),
});

export const ImputationStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(initialState)),
    withMethods((store, agentStore = inject(AgentStore), missionStore = inject(MissionStore)) => ({
        reset() {
            patchState(store, state => ({
                ...state,
                imputations: [],
            }));
        },
        toggleImputation(dateAsDay: number, month: number, year: number) {
            const date = new Date(year, month, dateAsDay);

            const hasImputation = store
                .imputations()
                .some(
                    imputation =>
                        imputation.date.getDate() === dateAsDay &&
                        imputation.date.getFullYear() === year &&
                        imputation.date.getMonth() === month &&
                        imputation.agentId === agentStore.selectedAgent().id &&
                        imputation.missionId === missionStore.selectedMission().id,
                );
            if (hasImputation) {
                patchState(store, state => ({
                    ...state,
                    imputations: state.imputations.filter(
                        imputation =>
                            !(
                                imputation.date.getDate() === dateAsDay &&
                                imputation.date.getFullYear() === year &&
                                imputation.date.getMonth() === month &&
                                imputation.agentId === agentStore.selectedAgent().id &&
                                imputation.missionId === missionStore.selectedMission().id
                            ),
                    ),
                }));
                return;
            }

            const newImputation: Imputation = {
                id: Math.floor(Math.random() * 100), // TODO: uuid, currently not safe :)
                date,
                agentId: agentStore.selectedAgent().id,
                missionId: missionStore.selectedMission().id,
            };
            patchState(store, state => ({
                ...state,
                imputations: [...state.imputations, newImputation],
            }));
        },
    })),
);

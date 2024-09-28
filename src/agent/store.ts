import { computed, inject, InjectionToken } from '@angular/core';
import { Agent } from './agent';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

const key = 'AgentState';

type AgentState = {
    agents: Agent[];
    currentAgent: Agent | null;
};

const initialState: AgentState = {
    agents: [
        {
            id: 1,
            name: 'Herbien',
            lastName: 'Jean-Phillippe',
        },
        {
            id: 2,
            name: 'Rémi',
            lastName: 'Fasol',
        },
        {
            id: 3,
            name: 'Paul',
            lastName: 'Ochon',
        },
        {
            id: 4,
            name: 'Justin',
            lastName: 'Ptitpeu',
        },
    ],
    currentAgent: null,
};

const agentStateToken = new InjectionToken<AgentState>(key, {
    factory: () => initialState,
});

export const AgentStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(agentStateToken)),
    withMethods(store => ({
        setCurrentAgent(idNumber: number) {
            patchState(store, state => ({
                ...state,
                currentAgent: state.agents.find(agent => agent.id === idNumber),
            }));
        },
        logout() {
            patchState(store, state => ({
                ...state,
                currentAgent: null,
            }));
        },
    })),
    withComputed(store => ({
        currentAgent: computed(() => store.currentAgent()),
        agents: computed(() => store.agents()),
    })),
);

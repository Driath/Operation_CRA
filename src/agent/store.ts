import { inject, InjectionToken } from '@angular/core';
import { Agent } from './agent';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const key = 'AgentState';

type AgentState = {
    agents: Agent[];
    selectedAgent: Agent;
};

const agents = [
    {
        id: 1,
        name: 'Jean-Phillippe Herbien',
    },
    {
        id: 2,
        name: 'Justin Ptitpeu',
    },
    {
        id: 3,
        name: 'Sterling Archer',
    },
];

const selectedAgent = agents.at(0) as Agent;
const initialState: AgentState = {
    agents,
    selectedAgent,
};

const agentStateToken = new InjectionToken<AgentState>(key, {
    factory: () => initialState,
});

export const AgentStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(agentStateToken)),
    withMethods(store => ({
        setSelectedAgent(idNumber: number) {
            const selectedAgent = store.agents().find(agent => agent.id === idNumber);
            if (!selectedAgent) {
                throw new Error('[setSelectedAgent] could not retrieve agent');
            }
            patchState(store, state => ({
                ...state,
                selectedAgent,
            }));
        },
    })),
);

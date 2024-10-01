import { TestBed } from '@angular/core/testing';
import { ImputationStore } from './store';
import { AgentStore } from '../agent/store';
import { MissionStore } from '../mission/store';

describe('ImputationStore', () => {
    let store: InstanceType<typeof ImputationStore>;
    let agentStore: InstanceType<typeof AgentStore>;
    let missionStore: InstanceType<typeof MissionStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(ImputationStore);
        agentStore = TestBed.inject(AgentStore);
        missionStore = TestBed.inject(MissionStore);
        store.reset();
    });

    describe('toggleImputation', () => {
        it('should on first toggle add an imputation for a given date and agent', () => {
            const dateAsDay = 15;
            const month = 6;
            const year = 2023;
            agentStore.setSelectedAgent(1);
            missionStore.setSelectedMission(1);
            store.toggleImputation(dateAsDay, month, year);
            expect(store.imputations().length).toBe(1);
            expect(store.imputations()[0].date.getDate()).toBe(dateAsDay);
            expect(store.imputations()[0].date.getMonth()).toBe(month);
            expect(store.imputations()[0].date.getFullYear()).toBe(year);
            expect(store.imputations()[0].agentId).toBe(agentStore.selectedAgent().id);
            expect(store.imputations()[0].missionId).toBe(missionStore.selectedMission().id);
        });

        it('should on second toggle remove the imputation for a given date and agent', () => {
            const dateAsDay = 15;
            const month = 6;
            const year = 2023;
            agentStore.setSelectedAgent(1);
            missionStore.setSelectedMission(1);
            store.toggleImputation(dateAsDay, month, year);
            store.toggleImputation(dateAsDay, month, year);
            expect(store.imputations().length).toBe(0);
        });

        it('should on toggle off a mission with an agent with several missions should not erase the other ones ', () => {
            const dateAsDay = 15;
            const month = 6;
            const year = 2023;
            agentStore.setSelectedAgent(1);
            missionStore.setSelectedMission(1);
            store.toggleImputation(dateAsDay, month, year);

            missionStore.setSelectedMission(2);
            store.toggleImputation(dateAsDay, month, year);

            expect(store.imputations().length).toBe(2);

            store.toggleImputation(dateAsDay, month, year);
            expect(store.imputations().length).toBe(1);
            // only the second should be removed
            expect(store.imputations().at(0)?.missionId).toBe(1);
        });
    });
});

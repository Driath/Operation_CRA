import { TestBed } from '@angular/core/testing';
import { AgentStore } from './store';

describe('AgentStore', () => {
    let store: InstanceType<typeof AgentStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(AgentStore);
    });

    describe('setSelectedAgent', () => {
        it('should set the selected mission when a valid id is provided', () => {
            const agentId = 2;
            store.setSelectedAgent(agentId);
            expect(store.selectedAgent()).toBeTruthy();
            expect(store.selectedAgent()).toEqual({
                id: 2,
                name: 'Justin Ptitpeu',
            });
        });

        it('should throw an error when an invalid id is provided', () => {
            const invalidAgentId = 999;
            expect(() => store.setSelectedAgent(invalidAgentId)).toThrowError(
                '[setSelectedAgent] could not retrieve agent',
            );
        });
    });
});

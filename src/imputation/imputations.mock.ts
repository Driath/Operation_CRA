import { Imputation } from './imputation';

const maxDateOctobre = new Date(2024, 9 + 1, 0).getDate();

export const imputations: Imputation[] = [];
for (let i = 1; i < maxDateOctobre; i++) {
    const missionId = Math.floor(Math.random() * 4) + 1;
    imputations.push({
        id: 1,
        agentId: 1,
        missionId,
        date: new Date(2024, 9, i),
    });

    if (Math.random() < 0.5) {
        imputations.push({
            id: 1,
            agentId: 1,
            missionId: (missionId + 1) % 4,
            date: new Date(2024, 9, i),
        });
    }
}

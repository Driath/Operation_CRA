import { Imputation } from './imputation';

const maxDateOctobre = new Date(2024, 9 + 1, 0).getDate();

export const imputations: Imputation[] = [];
for (let i = 1; i < maxDateOctobre; i++) {
    imputations.push({
        id: 1,
        agentId: 1,
        missionId: Math.floor(Math.random() * 4) + 1,
        date: new Date(2024, 9, i),
    });
}

for (let i = 1; i < maxDateOctobre && Boolean(Math.round(Math.random())); i++) {
    imputations.push({
        id: 1,
        agentId: 1,
        missionId: Math.floor(Math.random() * 4) + 1,
        date: new Date(2024, 9, i),
    });
}

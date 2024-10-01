export type Imputation = {
    id: number;
    date: Date;
    missionId: number; // DISCUSS : or ref to mission instead of ID
    agentId: number; // Same as misison
};

export type ImputationWithColor = Imputation & {
    color: string;
};

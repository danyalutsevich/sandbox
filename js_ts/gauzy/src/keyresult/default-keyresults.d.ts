export declare const DEFAULT_KEY_RESULTS: ({
    name: string;
    level: string;
    keyResults: {
        name: string;
        type: string;
        targetValue: number;
        initialValue: number;
        unit: string;
        deadline: string;
        hardDeadline: string;
        softDeadline: any;
    }[];
} | {
    name: string;
    level: string;
    keyResults: ({
        name: string;
        type: string;
        targetValue: number;
        initialValue: number;
        unit: string;
        deadline: string;
        hardDeadline: any;
        softDeadline: any;
        description?: undefined;
    } | {
        name: string;
        description: string;
        type: string;
        targetValue: number;
        initialValue: number;
        unit: string;
        deadline: string;
        hardDeadline: any;
        softDeadline: any;
    })[];
})[];

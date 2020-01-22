export class ResponseChartModel {
    status: boolean;
    message: string;
    payload: ChartModel[];
}

export class ChartModel {
    id: string;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    t5: number;
    t6: number;
    reqst_type: string;
    plantid: string;
    lineid: string;
    prodid: string;
    bk_time: number;
    createAt: string;
}

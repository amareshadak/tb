export class IResopnseIPlant {
    status: boolean;
    message: string;
    payload: IPlant[];
}

export class IPlant {
    id: string;
    plant_id: string;
    plant_name: string;
    plant_location: string;
}

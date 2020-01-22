export interface IResponseMobileNumberConfig {
    status: boolean;
    message: string;
    payload: MobileNumberConfig[];
}

export interface MobileNumberConfig {
    plant_id: string;
    master_number: string;
    alt_number_one: string;
    alt_number_two: string;
    alt_number_three: string;
    alt_number_four: string;
    alt_number_five: string;
    alt_number_six: string;
}
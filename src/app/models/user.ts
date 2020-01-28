export class ResponseIUser {
    status: boolean;
    message: string;
    payload: IUser[];
}

export class IUser {
    id: string;
    name: string;
    designation: string;
    employee_id: string;
    role: string;
    login_id: string;
    password: string
}

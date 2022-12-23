export class CustomError extends Error {
    name = 'Controller Error';

    status: number;

    message: string;

    constructor(status:number, msg: string) {
        super(msg);
        this.message = msg;
        this.status = status;
    }
}

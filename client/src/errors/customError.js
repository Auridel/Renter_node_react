export default class CustomError extends Error {

    constructor(status, desc = "Error", ...params) {

        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.status = status;
        this.desc = desc;
    }
}
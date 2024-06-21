import { ErrorDetail, UnauthorizedError } from "@shipengine/connect-runtime";
import { HttpStatusCode } from "axios";


export const getCustomError = (err: any) => {
    const customError = err.Error;
    if (customError === "Access Denied") {
        throw new UnauthorizedError('Error from Carrier Api', [
            {
                errorCode: err.ErrorLevel,
                message: "Access denied"
            }
        ]);
    }
};

export const HandlesError = (error: any) => {
    const errorCode: ErrorDetail[] = [];
    if (error?.details) {
        errorCode.push(
            {
                errorCode: error.details[0].errorCode,
                message: error.details[0].message
            }
        )

    }

    if (error.statusCode === HttpStatusCode.Unauthorized) {
        throw new UnauthorizedError("Message From Carrier Api", errorCode);
    }
}

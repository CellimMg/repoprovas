export interface ICustomError{
    code: string,
    message: string | null
}

export function isCustomError(error: object): error is ICustomError{
    return (error as ICustomError).code !== undefined;
}

export function codeStringToNumber(code: string){
        switch(code){
            case "unauthorized":
                return 403;
            case "already_exists":
                return 409;
            case "not_found":
                return 404;
            case "wrong_credentials":
                return 401;
            default: //or unexpected
                return 500;
        }
}

export function unauthorized(message: string): ICustomError{
    return {code: "unauthorized", message};
}

export function unexpected(): Omit<ICustomError, "message">{
    return {code: "unexpected"};
}

export function wrongCredentials(message: string): ICustomError{
    return {code: "wrong_credentials", message};
}

export function notFound(message: string): ICustomError{
    return {code: "not_found", message};
}

export function alreadyExists(message: string): ICustomError{
    return {code: "already_exists", message};
}





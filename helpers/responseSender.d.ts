declare const sendSuccess: (res: any, req: any) => Promise<void>;
declare const sendAuthError: (res: any, req: any) => Promise<void>;
declare const sendError: (res: any, error: any) => Promise<void>;
declare const sendValidationError: (res: any, error: any) => Promise<void>;
export { sendSuccess, sendError, sendAuthError, sendValidationError };

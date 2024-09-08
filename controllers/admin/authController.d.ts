declare const signUp: (req: any, res: any) => Promise<void>;
declare const signIn: (req: any, res: any) => Promise<void>;
declare const admininfo: (req: any, res: any) => Promise<void>;
declare const changePassword: (req: any, res: any) => Promise<void>;
declare const dashboardInfo: (req: any, res: any) => Promise<void>;
export { signUp, signIn, admininfo, changePassword, dashboardInfo };

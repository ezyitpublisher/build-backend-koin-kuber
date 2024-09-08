declare const getNotifications: (req: any, res: any) => Promise<void>;
declare const sendNotification: (req: any, res: any) => Promise<void>;
declare const deleteNotification: (req: any, res: any) => Promise<void>;
export { getNotifications, sendNotification, deleteNotification };

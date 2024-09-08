declare const jwtToken: (id: any) => any;
declare const notificationSend: (content: any, fcmToken: any, notifiy_img?: any) => Promise<any>;
export { jwtToken, notificationSend };

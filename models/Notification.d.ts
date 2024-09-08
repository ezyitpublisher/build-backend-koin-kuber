import { Model } from 'sequelize';
interface NotificationAttributes {
    id: number;
    notify_title: string;
    notify_msg: string;
    notify_img: string;
    status: number;
}
declare class Notification extends Model<NotificationAttributes> implements NotificationAttributes {
    id: number;
    notify_title: string;
    notify_msg: string;
    notify_img: string;
    status: number;
}
export default Notification;

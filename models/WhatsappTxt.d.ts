import { Model } from 'sequelize';
interface WhatsappTxtAttributes {
    id: number;
    title: string;
    share_txt: string;
    imageandvideo: string;
    status: number;
}
declare class WhatsappTxt extends Model<WhatsappTxtAttributes> implements WhatsappTxtAttributes {
    id: number;
    title: string;
    share_txt: string;
    imageandvideo: string;
    status: number;
}
export default WhatsappTxt;

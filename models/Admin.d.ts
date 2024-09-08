import { Model } from 'sequelize';
interface AdminAttributes {
    id: number;
    fullname: string;
    email: string;
    password: string;
    is_superadmin: number;
}
declare class Admin extends Model<AdminAttributes> implements AdminAttributes {
    id: number;
    fullname: string;
    email: string;
    password: string;
    is_superadmin: number;
}
export default Admin;

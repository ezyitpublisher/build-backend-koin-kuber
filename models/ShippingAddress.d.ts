import { Model } from 'sequelize';
interface ShippingAddressAttributes {
    id: number;
    full_name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    pincode: string;
    phone_number: string;
    fcm_token: string;
    is_winner: number;
    status: number;
}
declare class ShippingAddress extends Model<ShippingAddressAttributes> implements ShippingAddressAttributes {
    id: number;
    full_name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    pincode: string;
    phone_number: string;
    fcm_token: string;
    is_winner: number;
    status: number;
}
export default ShippingAddress;

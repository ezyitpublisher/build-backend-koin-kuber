import { Model } from 'sequelize';
interface PaymentWithdrawAttributes {
    id: number;
    full_name: string;
    phone_number: string;
    payment_gateway: string;
    payment_number: string;
    upi_id: string;
    paypal_id: string;
    crypto_id: string;
    fcm_token: string;
    is_winner: number;
}
declare class PaymentWithdraw extends Model<PaymentWithdrawAttributes> implements PaymentWithdrawAttributes {
    id: number;
    full_name: string;
    phone_number: string;
    payment_gateway: string;
    payment_number: string;
    upi_id: string;
    paypal_id: string;
    crypto_id: string;
    fcm_token: string;
    is_winner: number;
}
export default PaymentWithdraw;

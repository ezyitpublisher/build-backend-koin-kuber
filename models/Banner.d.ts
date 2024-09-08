import { Model } from 'sequelize';
interface BannerAttributes {
    id: number;
    phone_name: string;
    banner: string;
    phones: string;
    status: number;
}
declare class Banner extends Model<BannerAttributes> implements BannerAttributes {
    id: number;
    phone_name: string;
    banner: string;
    phones: string;
    status: number;
}
export default Banner;

import { Model } from 'sequelize';
interface TermsConditionsAttributes {
    id: number;
    terms_condition: string;
}
declare class TermsConditions extends Model<TermsConditionsAttributes> implements TermsConditionsAttributes {
    id: number;
    terms_condition: string;
}
export default TermsConditions;

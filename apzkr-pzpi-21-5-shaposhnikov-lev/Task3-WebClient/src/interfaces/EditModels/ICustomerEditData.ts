import { ICustomerCreateData } from "../CreateModels/ICustomerCreateData";

export interface ICustomerEditData extends ICustomerCreateData {
    id: number,
}
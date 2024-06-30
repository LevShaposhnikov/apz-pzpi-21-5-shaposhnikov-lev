import { ICustomer } from "./ICustomer";
import { IRental } from "./IRental";

export interface IFeedback {
    id: number,
    customerId: number,
    customer: ICustomer,
    rentalId: number,
    rental: IRental,
    feedbackDate: string,
    rating: number,
    comments: string
}
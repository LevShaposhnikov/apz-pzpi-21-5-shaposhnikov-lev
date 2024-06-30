import { ICar } from "./ICar";
import { ICustomer } from "./ICustomer";

export interface IRental {
    id: number,
    car: ICar,
    carId: number,
    customer: ICustomer,
    customerId: number,
    rentalStartDate: string,
    rentalEndDate: string,
    isActive: boolean,
    rentalCost: number,
    mileageStart: number,
    mileageEnd: number,
}
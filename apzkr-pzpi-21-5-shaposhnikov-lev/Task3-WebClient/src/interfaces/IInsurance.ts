import { ICar } from "./ICar";

export interface IInsurance {
    id: number,
    carId: number,
    car: ICar,
    policyNumber: string,
    provider: string,
    startDate: string,
    endDate: string,
    coverageAmount: number,
    premium: number
}
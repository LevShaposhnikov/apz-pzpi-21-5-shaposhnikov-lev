import { ICar } from "./ICar";

export interface IMaintenance {
    id: number,
    carId: number,
    car: ICar,
    maintenanceDate: string,
    description: string,
    cost: number,
    serviceCenter: string,
    mileage: number,
    isCompleted: boolean
}
export interface IMaintenanceCreateData {
    carId: number,
    maintenanceDate: string,
    description: string,
    cost: number,
    serviceCenter: string,
    mileage: number,
    isCompleted: boolean
}
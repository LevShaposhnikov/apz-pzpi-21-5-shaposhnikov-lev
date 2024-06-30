export interface IRentalCreateData {
    carId: number,
    customerId: number,
    rentalStartDate: string,
    rentalEndDate: string,
    isActive: boolean,
    rentalCost: number,
    mileageStart: number,
    mileageEnd: number,
}
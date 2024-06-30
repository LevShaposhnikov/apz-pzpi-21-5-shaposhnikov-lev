export interface IInsuranceCreateData {
    carId: number,
    policyNumber: string,
    provider: string,
    startDate: string,
    endDate: string,
    coverageAmount: number,
    premium: number
}
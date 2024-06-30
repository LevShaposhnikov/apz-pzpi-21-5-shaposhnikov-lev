import { $authhost } from ".";
import { ICarCreateData } from "../interfaces/CreateModels/ICarCreateData";
import { IRentalCreateData } from "../interfaces/CreateModels/IRentalCreateData";
import { ICarEditData } from "../interfaces/EditModels/ICarEditData";
import { IRentalEditData } from "../interfaces/EditModels/IRentalEditData";

export const getRentals = async () => {
    const { data } = await $authhost.get('api/Rentals')
    return data;
}

export const createRental = async (formData: IRentalCreateData) => {
    const { data } = await $authhost.post('api/Rentals', formData)
    return data;
}

export const editRental = async (id: number, formData: IRentalEditData) => {
    const { data } = await $authhost.put(`api/Rentals/${id}`, formData)
    return data;
}

export const deleteRental = async (id: number) => {
    const { data } = await $authhost.delete(`api/Rentals/${id}`)
    return data;
}

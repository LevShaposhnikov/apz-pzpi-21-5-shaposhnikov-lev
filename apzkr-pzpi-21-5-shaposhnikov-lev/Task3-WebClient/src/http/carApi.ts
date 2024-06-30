import { $authhost } from ".";
import { ICarCreateData } from "../interfaces/CreateModels/ICarCreateData";
import { ICarEditData } from "../interfaces/EditModels/ICarEditData";

export const getCars = async () => {
    const { data } = await $authhost.get('api/Cars')
    return data;
}

export const createCar = async (formData: ICarCreateData) => {
    const { data } = await $authhost.post('api/Cars', formData)
    return data;
}

export const editCar = async (id: number, formData: ICarEditData) => {
    const { data } = await $authhost.put(`api/Cars/${id}`, formData)
    return data;
}

export const deleteCar = async (id: number) => {
    const { data } = await $authhost.delete(`api/Cars/${id}`)
    return data;
}

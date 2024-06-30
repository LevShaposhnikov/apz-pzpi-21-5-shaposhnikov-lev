import { $authhost } from ".";
import { ICarCreateData } from "../interfaces/CreateModels/ICarCreateData";
import { IInsuranceCreateData } from "../interfaces/CreateModels/IInsuranceCreateData";
import { ICarEditData } from "../interfaces/EditModels/ICarEditData";
import { IInsuranceEditData } from "../interfaces/EditModels/IInsuranceEditData";

export const getInsurances = async () => {
    const { data } = await $authhost.get('api/Insurances')
    return data;
}

export const createInsurance = async (formData: IInsuranceCreateData) => {
    const { data } = await $authhost.post('api/Insurances', formData)
    return data;
}

export const editInsurance = async (id: number, formData: IInsuranceEditData) => {
    const { data } = await $authhost.put(`api/Insurances/${id}`, formData)
    return data;
}

export const deleteInsurance = async (id: number) => {
    const { data } = await $authhost.delete(`api/Insurances/${id}`)
    return data;
}

import { $authhost } from ".";
import { ICarCreateData } from "../interfaces/CreateModels/ICarCreateData";
import { IMaintenanceCreateData } from "../interfaces/CreateModels/IMaintenanceCreateData";
import { ICarEditData } from "../interfaces/EditModels/ICarEditData";
import { IMaintenanceEditData } from "../interfaces/EditModels/IMaintenanceEditData";

export const getMaintenances = async () => {
    const { data } = await $authhost.get('api/Maintenances')
    return data;
}

export const createMaintenance = async (formData: IMaintenanceCreateData) => {
    const { data } = await $authhost.post('api/Maintenances', formData)
    return data;
}

export const editMaintenance = async (id: number, formData: IMaintenanceEditData) => {
    const { data } = await $authhost.put(`api/Maintenances/${id}`, formData)
    return data;
}

export const deleteMaintenance = async (id: number) => {
    const { data } = await $authhost.delete(`api/Maintenances/${id}`)
    return data;
}

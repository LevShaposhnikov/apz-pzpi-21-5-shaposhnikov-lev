import { $authhost } from ".";
import { ICustomerCreateData } from "../interfaces/CreateModels/ICustomerCreateData";
import { ICustomerEditData } from "../interfaces/EditModels/ICustomerEditData";

export const getCustomers = async () => {
    const { data } = await $authhost.get('api/Customers')
    return data;
}

export const createCustomer = async (formData: ICustomerCreateData) => {
    const { data } = await $authhost.post('api/Customers', formData)
    return data;
}

export const editCustomer = async (id: number, formData: ICustomerEditData) => {
    const { data } = await $authhost.put(`api/Customers/${id}`, formData)
    return data;
}

export const deleteCustomer = async (id: number) => {
    const { data } = await $authhost.delete(`api/Customers/${id}`)
    return data;
}

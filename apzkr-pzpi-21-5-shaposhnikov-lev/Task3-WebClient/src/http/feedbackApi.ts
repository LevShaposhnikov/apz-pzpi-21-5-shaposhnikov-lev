import { $authhost } from ".";
import { ICarCreateData } from "../interfaces/CreateModels/ICarCreateData";
import { IFeedbackCreateData } from "../interfaces/CreateModels/IFeedbackCreateData";
import { ICarEditData } from "../interfaces/EditModels/ICarEditData";
import { IFeedbackEditData } from "../interfaces/EditModels/IFeedbackEditData";

export const getFeedbacks = async () => {
    const { data } = await $authhost.get('api/Feedbacks')
    return data;
}

export const createFeedback = async (formData: IFeedbackCreateData) => {
    const { data } = await $authhost.post('api/Feedbacks', formData)
    return data;
}

export const editFeedback = async (id: number, formData: IFeedbackEditData) => {
    const { data } = await $authhost.put(`api/Feedbacks/${id}`, formData)
    return data;
}

export const deleteFeedback = async (id: number) => {
    const { data } = await $authhost.delete(`api/Feedbacks/${id}`)
    return data;
}

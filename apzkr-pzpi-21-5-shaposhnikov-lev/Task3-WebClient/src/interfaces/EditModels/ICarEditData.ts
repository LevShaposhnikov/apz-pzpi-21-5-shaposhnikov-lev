import { ICarCreateData } from "../CreateModels/ICarCreateData";

export interface ICarEditData extends ICarCreateData {
    id: number,
}
import { IFeedbackCreateData } from "../CreateModels/IFeedbackCreateData";

export interface IFeedbackEditData extends IFeedbackCreateData {
    id: number,
}
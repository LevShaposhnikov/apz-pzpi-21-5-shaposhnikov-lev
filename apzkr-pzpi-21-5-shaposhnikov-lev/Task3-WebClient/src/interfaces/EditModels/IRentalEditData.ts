import { IRentalCreateData } from "../CreateModels/IRentalCreateData";

export interface IRentalEditData extends IRentalCreateData {
    id: number,
}
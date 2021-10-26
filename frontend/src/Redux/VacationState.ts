import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = []; 
}

export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload?: any; 
}

export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(updatedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}
export function vacationDeletedAction(id: number): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added vacation
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated vacation
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            if (action.payload.followCount !== undefined) {
                newState.vacations[indexToUpdate].followCount = action.payload.followCount;
                break;
            }
            if (newState.vacations[indexToUpdate] !== undefined)
                if (action.payload.image === undefined || action.payload.image === "null")
                    action.payload.image = newState.vacations[indexToUpdate].image;
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = vacation id to delete
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

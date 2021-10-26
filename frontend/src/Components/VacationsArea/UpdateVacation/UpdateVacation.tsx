import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import VacationModel from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import "./UpdateVacation.css";

interface UpdateVacationProps {
    vacation: VacationModel;
}

function UpdateVacation(props: UpdateVacationProps): JSX.Element {
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    async function updateVacation(vacation: VacationModel) {
        try {
            const id = props.vacation.vacationId;
            const response = await jwtAxios.put<VacationModel>(globals.vacationsUrl + id, VacationModel.convertToFormData(vacation));
            const updatedVacation = response.data;
            notify.success("Vacation has been updated. \n Name : " + updatedVacation.destination)
        }
        catch (err) {
            notify.error("Error: " + err)
        }
    }

    function parseDatabaseDate(realDate: string) {
        if (realDate.includes("T")) return realDate;
        const parts = realDate.split(' - ');
        const date = parts[0];
        const dateParts = date.split('/');
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        const time = parts[1];
        return `${year}-${month}-${day}T${time}`;
    }

    return (
        <div className="UpdateVacation">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#updateVacationModal" + props.vacation.vacationId}>Update</button>
            <form onSubmit={handleSubmit(updateVacation)}>
                <div className="modal fade" id={"updateVacationModal" + props.vacation.vacationId} aria-labelledby={"updateVacationLabel" + props.vacation.vacationId} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={"updateVacationLabel" + props.vacation.vacationId}>Update vacation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Destination:</label>
                                    <input className="form-control" type="text" name="destination" defaultValue={props.vacation.destination} {...register("destination", {
                                        required: { value: true, message: "Missing Destination." },
                                        minLength: { value: 2, message: "Destination is too short." },
                                        maxLength: { value: 100, message: "Destination must contain at most 100 characters." }
                                    })} />
                                    {formState.errors.destination?.message.length > 0 && <div className="alert alert-warning">{formState.errors.destination?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vacation Start At:</label>
                                    <input className="form-control" type="datetime-local" name="dateFrom" defaultValue={parseDatabaseDate(props.vacation.dateFrom)} {...register('dateFrom', {
                                        required: { value: true, message: "Missing Vacation Start Date." }
                                    })} />
                                    {formState.errors.dateFrom?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateFrom?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vacation End At:</label>
                                    <input className="form-control" type="datetime-local" name="dateUntil" defaultValue={parseDatabaseDate(props.vacation.dateUntil)} {...register('dateUntil', {
                                        required: { value: true, message: "Missing Vacation End Date." }
                                    })} />
                                    {formState.errors.dateUntil?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateUntil?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price:</label>
                                    <input className="form-control" type="number" name="price" defaultValue={props.vacation.price} {...register('price', {
                                        required: { value: true, message: "Missing price." },
                                        min: { value: 250, message: "Price Must be higher than 250." }
                                    })} />
                                    {formState.errors.price?.message.length > 0 && <div className="alert alert-warning">{formState.errors.price?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description:</label>
                                    <input className="form-control" type="text" name="description" defaultValue={props.vacation.description} {...register('description', {
                                        required: { value: true, message: "Missing Description." },
                                        minLength: { value: 2, message: "Description is too short." },
                                        maxLength: { value: 150, message: "Description must contain at most 150 characters." }
                                    })} />
                                    {formState.errors.description?.message.length > 0 && <div className="alert alert-warning">{formState.errors.description?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image:</label>
                                    <img className="card-img-top" src={globals.vacationsUrl + "images/" + props.vacation.image} alt="Vacation Card" />
                                    <input className="form-control fileInput" type="file" name="imageName" accept="imageName/*" {...register('imageName', {
                                        required: { value: false, message: "Missing image." }
                                    })} />
                                    {formState.errors.imageName?.message.length > 0 && <div className="alert alert-warning">{formState.errors.imageName?.message}</div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateVacation;

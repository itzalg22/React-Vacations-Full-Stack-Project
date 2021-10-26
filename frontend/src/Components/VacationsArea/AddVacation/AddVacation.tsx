import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    async function addVacation(vacation: VacationModel) {
        try {
            const response = await jwtAxios.post<VacationModel>(globals.vacationsUrl, VacationModel.convertToFormData(vacation));
            const addedVacation = response.data;
            notify.success("Vacation Has been added. Vacation : " + addedVacation.destination)
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(addVacation)}>
                <div className="modal fade" id="addVacationModal" aria-labelledby="addVacationLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addVacationLabel">Add vacation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Destination:</label>
                                    <input className="form-control" type="text" name="destination" autoFocus {...register('destination', {
                                        required: { value: true, message: "Missing Destination." },
                                        minLength: { value: 2, message: "Destination is too short." },
                                        maxLength: { value: 100, message: "Destination must contain at most 100 characters." }
                                    })} />
                                    {formState.errors.destination?.message.length > 0 && <div className="alert alert-warning">{formState.errors.destination?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vacation Start At:</label>
                                    <input className="form-control" type="datetime-local" name="dateFrom" autoFocus {...register('dateFrom', {
                                        required: { value: true, message: "Missing Vacation Start Date." }
                                    })} />
                                    {formState.errors.dateFrom?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateFrom?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vacation End At:</label>
                                    <input className="form-control" type="datetime-local" name="dateUntil" autoFocus {...register('dateUntil', {
                                        required: { value: true, message: "Missing Vacation End Date." }
                                    })} />
                                    {formState.errors.dateUntil?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateUntil?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price:</label>
                                    <input className="form-control" type="number" name="price" autoFocus {...register('price', {
                                        required: { value: true, message: "Missing price." },
                                        min: { value: 250, message: "Price Must be higher than 250." }
                                    })} />
                                    {formState.errors.price?.message.length > 0 && <div className="alert alert-warning">{formState.errors.price?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description:</label>
                                    <input className="form-control" type="text" name="description" autoFocus {...register('description', {
                                        required: { value: true, message: "Missing Destination." },
                                        minLength: { value: 2, message: "Destination is too short." },
                                        maxLength: { value: 150, message: "Description must contain at most 150 characters." }
                                    })} />
                                    {formState.errors.description?.message.length > 0 && <div className="alert alert-warning">{formState.errors.description?.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image:</label>
                                    <input className="form-control fileInput" type="file" name="imageName" accept="imageName/*" {...register('imageName', {
                                        required: { value: true, message: "Missing image." }
                                    })} />
                                    {formState.errors.imageName?.message.length > 0 && <div className="alert alert-warning">{formState.errors.imageName?.message}</div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddVacation;

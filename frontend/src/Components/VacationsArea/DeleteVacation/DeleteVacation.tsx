import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import VacationModel from "../../../Models/VacationModel";
import "./DeleteVacation.css";

interface DeleteVacationProps {
    vacation: VacationModel;
}

function DeleteVacation(props: DeleteVacationProps): JSX.Element {
    async function deleteVacation() {
        try {
            const id = props.vacation.vacationId;
            await jwtAxios.delete<VacationModel>(globals.vacationsUrl + id);
            notify.success("Vacation Has Been Deleted!\n Id : " + id);
        }
        catch (err) {
            notify.error("Error: " + err)
        }
    }
    return (
        <div className="DeleteVacation">
            <button onClick={deleteVacation} type="submit" className="btn btn-primary">Delete</button>
        </div>
    );
}

export default DeleteVacation;

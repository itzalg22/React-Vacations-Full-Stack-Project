import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { AuthState } from "../../../Redux/AuthState";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import DeleteVacation from "../DeleteVacation/DeleteVacation";
import FollowVacation from "../FollowVacation/FollowVacation";
import UpdateVacation from "../UpdateVacation/UpdateVacation";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function parseSocketIODate(realDate: string) { 
    if (!realDate.includes("T")) return realDate;
    const parts = realDate.split('T');
    const date = parts[0];
    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const time = parts[1];
    return `${day}/${month}/${year} - ${time}`;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const state = new AuthState();
    const isAdmin = state.user !== null ? state.user.isAdmin : 0;
    const [followCount, setFollowCount] = useState(0);
    useEffect(() => {
        async function getFollowersCount() {
            try {
                const response = await jwtAxios.get(globals.followersUrl + props.vacation.vacationId);
                setFollowCount(response.data.length);
            } catch (e) {
                notify.error(e);
            }
        }
        getFollowersCount();
    }, [props]);

    return (
        <div className="VacationCard">
            <div className="card">
                <img className="card-img-top" src={globals.vacationsUrl + "images/" + props.vacation.image} alt="Vacation Card" />
                <div className="card-body">
                    <h5 className="card-title">{props.vacation.destination}</h5>
                    <div className="vacationPrice">{props.vacation.price.toLocaleString()}.00 $</div>
                    <p className="card-text">{props.vacation.description}</p>
                    <i className='fab'>{followCount} &#xf39e;</i>
                </div>
                <div className="card-footer text-muted">
                    Starts At {parseSocketIODate(props.vacation.dateFrom)}
                    <br />
                    Ends At {parseSocketIODate(props.vacation.dateUntil)}
                </div>
                {isAdmin ?
                    <>
                        <div className="card-footer">
                            <DeleteVacation vacation={props.vacation} key={"Delete" + props.vacation.vacationId}></DeleteVacation>
                            <UpdateVacation vacation={props.vacation} key={"Update" + props.vacation.vacationId}></UpdateVacation>
                        </div>
                    </>
                    : <FollowVacation vacation={props.vacation} key={"Delete" + props.vacation.vacationId}></FollowVacation>}
            </div>
        </div>
    );
}

export default VacationCard;

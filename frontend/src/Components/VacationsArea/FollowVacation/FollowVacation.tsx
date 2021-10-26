import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import "./FollowVacation.css";

interface FollowVacationProps {
    vacation: VacationModel
}

function FollowVacation(props: FollowVacationProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState(false);

    async function follow() {
        try {
            const request = {
                userId: store.getState().authState.user.userId,
                vacationId: props.vacation.vacationId
            };
            await jwtAxios.post(globals.followersUrl, request);
            setIsFollowing(true);
            notify.success("You followed " + props.vacation.destination)
        } catch (e) {
            notify.error(e);
        }
    }

    async function unFollow() {
        try {
            const request = {
                userId: store.getState().authState.user.userId,
                vacationId: props.vacation.vacationId
            };
            await jwtAxios.post(globals.followersUrl + "unFollow", request);
            setIsFollowing(false);
            notify.success("You Unfollowed " + props.vacation.destination)
        } catch (e) {
            notify.error(e);
        }
    }

    useEffect(() => {
        async function isUserFollowing() {
            try {
                const request = {
                    userId: store.getState().authState.user.userId,
                    vacationId: props.vacation.vacationId
                };
                const response = await jwtAxios.post(globals.followersUrl + "isUserFollowing", request);
                if (response.data.length > 0) setIsFollowing(true);
            } catch (e) {
                notify.error(e);
            }
        }
        isUserFollowing();
    }, [props]);

    return (
        <div className="FollowVacation">
            { isFollowing ? <button className="btn btn-danger" onClick={unFollow}>Unfollow</button> : <button className="btn btn-primary" onClick={follow}>Follow</button>}
        </div>
    );
}

export default FollowVacation;

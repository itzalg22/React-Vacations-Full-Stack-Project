import { Component } from "react";
import VacationModel from "../../../Models/VacationModel";
import jwtAxios from "../../../Services/JwtAxios";
import AddVacation from "../AddVacation/AddVacation";
import VacationCard from "../VacationCard/VacationCard";
import store from "../../../Redux/Store";
import "./VacationList.css";
import notify from "../../../Services/Notify";
import { Unsubscribe } from "redux";
import { vacationsDownloadedAction } from "../../../Redux/VacationState";
import { AuthState } from "../../../Redux/AuthState";
import globals from "../../../Services/Globals";

interface VacationListState {
    vacations: VacationModel[];
}

class VacationList extends Component<{}, VacationListState> {
    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            vacations: store.getState().vacationsState.vacations
        };
    }

    public async componentDidMount() {
        try {
            if (store.getState().authState.user === null) return window.location.href = "/login";
            this.unsubscribeFromStore = store.subscribe(() => {
                this.setState({ vacations: store.getState().vacationsState.vacations });
            })
            if (this.state.vacations.length === 0) {
                const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl + store.getState().authState.user.userId);
                this.setState({ vacations: response.data });
                store.dispatch(vacationsDownloadedAction(response.data));
            }
        }
        catch (err) {
            notify.error(err);
            if (err.response?.data === "Your login session has expired.") {
                store.getState().authState.user = null;
                window.location.href = "/login";
            }
        }
    }

    public render(): JSX.Element {
        const state = new AuthState();
        const isAdmin = state.user !== null ? state.user.isAdmin : 0;
        return (
            <div className="VacationList">
                {isAdmin ?
                    <>
                        <AddVacation></AddVacation>
                    </>
                    : ''}
                <div className="row">
                    {this.state.vacations.map(v => <VacationCard vacation={v} key={"cardKey" + v.vacationId}></VacationCard>)}
                </div>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromStore()
    }
}

export default VacationList;

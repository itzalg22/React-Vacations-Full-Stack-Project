import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel"
import { vacationAddedAction, vacationDeletedAction, vacationUpdatedAction } from "../Redux/VacationState";
import store from "../Redux/Store";

class SocketManager {

    private socket: Socket;

    public connect(): void {

        // Connect to socket.io:
        this.socket = io(process.env.NODE_ENV === "production" ? "https://itzhal-vacationproject-react.herokuapp.com" : "http://localhost:3001");

        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationModel) => {
            store.dispatch(vacationAddedAction(addedVacation));
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationModel) => {
            store.dispatch(vacationUpdatedAction(updatedVacation));
        });

        this.socket.on("msg-from-server-vacation-deleted", (id: number) => {
            store.dispatch(vacationDeletedAction(id));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

export default SocketManager;

export const socketManagerInstance = new SocketManager();
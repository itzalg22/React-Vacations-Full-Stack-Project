import { useEffect } from "react";
import { useHistory } from "react-router";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        store.dispatch(userLoggedOutAction());
        notify.success("Logged out successfully.");
        history.push("/login")
        socketManagerInstance.disconnect();
    }, [history]);
    return null;
}

export default Logout;

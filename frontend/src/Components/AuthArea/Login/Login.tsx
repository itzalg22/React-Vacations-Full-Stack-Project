import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { userLoggedInAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notify";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import "./Login.css";

function Login(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedInAction(response.data));
            notify.success("Logged-in successfully");
            history.push("/");
            socketManagerInstance.connect();
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login form-group">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="mb-3">
                    <label className="form-label">UserName:</label>
                    <input className="form-control" type="text" autoFocus {...register("username", {
                        required: { value: true, message: "Missing username." },
                        minLength: { value: 4, message: "Username too short." }
                    })} />
                    <span>{formState.errors.username?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" {...register("password", {
                        required: { value: true, message: "Missing password." },
                        minLength: { value: 4, message: "password too short." }
                    })} />
                    <span>{formState.errors.password?.message}</span>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Log in</button>
                </div>
            </form>

        </div>
    );
}

export default Login;

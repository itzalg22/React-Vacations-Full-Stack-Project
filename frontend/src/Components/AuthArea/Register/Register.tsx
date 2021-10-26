import axios from "axios";
import Parser from 'html-react-parser';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import UserModel from "../../../Models/UserModel";
import { userRegisteredAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import cookies from "../../../Services/cookies";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notify";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import "./Register.css";

function Register(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const [captcha, setCaptcha] = useState('')

    useEffect(() => {
        axios.get(globals.captchaUrl).then(result => {
            const hashedCaptcha = result.data.hashedCaptcha;
            const captchaImage = result.data.captchaImage;
            cookies.setCookie('hashedCaptcha', hashedCaptcha);
            setCaptcha(captchaImage);
        }).catch(err => {
            notify.error(err);
        });
    }, []);


    async function submit(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.registerUrl, { ...user, hashedCaptcha: cookies.getCookie('hashedCaptcha')});
            store.dispatch(userRegisteredAction(response.data));
            notify.success("Registered successfully");
            history.push("/");
            socketManagerInstance.connect();
        }
        catch (err) {
            notify.error(err)
        }
    }
    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input className="form-control" type="text" autoFocus {...register("firstName", {
                        required: { value: true, message: "Missing first name." },
                        minLength: { value: 2, message: "First name too short." }
                    })} />
                    <span>{formState.errors.firstName?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input className="form-control" type="text" {...register("lastName", {
                        required: { value: true, message: "Missing last name." },
                        minLength: { value: 2, message: "Last name too short." }
                    })} />
                    <span>{formState.errors.lastName?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name:</label>
                    <input className="form-control" type="text" {...register("username", {
                        required: { value: true, message: "Missing user name." },
                        minLength: { value: 4, message: "User name too short." }
                    })} />
                    <span>{formState.errors.username?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" {...register("password", {
                        required: { value: true, message: "Missing password." },
                        minLength: { value: 4, message: "Password too short." }
                    })} />
                    <span>{formState.errors.password?.message}</span>
                </div>
                <div className="mb-3">
                    <label>Captcha:</label>
                    <div id="captchaDiv">{Parser(captcha)}</div>
                    <input type="text" {...register("captchaText", {
                        required: { value: true, message: "Missing captcha." },
                        minLength: { value: 3, message: "Captcha too short." }
                    })} />
                    <span>{formState.errors.captchaText?.message}</span>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;

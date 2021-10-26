import { Component } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import "./AuthMenu.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import { AuthState } from "../../../Redux/AuthState";

interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {
    private unsubscribe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { user: store.getState().authState.user };
    }

    public componentDidMount(): void {
        this.unsubscribe = store.subscribe(() => this.setState({ user: store.getState().authState.user }));
        if(this.state.user !== null) socketManagerInstance.connect();
    }

    public render(): JSX.Element {
        const state = new AuthState();
        const isAdmin = state.user !== null ? state.user.isAdmin : 0;
        return (
            <div className="AuthMenu">
                {
                    this.state.user &&
                    <>
                        <span>Hello {this.state.user.firstName + " " + this.state.user.lastName}</span>
                        <span> | </span>
                        <NavLink to="/logout" exact className="btn btn-danger">Log out</NavLink>
                        <span>  </span>
                    </>
                }
                {isAdmin ? <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addVacationModal">Add Vacation</button> : ''}
                {
                    !this.state.user &&
                    <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login" exact className="btn btn-success">Log in</NavLink>
                        <span> | </span>
                        <NavLink to="/register" exact className="btn btn-primary">Register</NavLink>
                    </>
                }
                <hr/>
            </div>
        );
    }
    public componentWillUnmount(): void {
        this.unsubscribe();
    }
}

export default AuthMenu;

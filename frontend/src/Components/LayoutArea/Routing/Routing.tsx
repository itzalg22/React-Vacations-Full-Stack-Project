import { Route, Switch } from "react-router";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/" component={VacationList} exact></Route>
                <Route path="/login" component={Login} exact></Route>
                <Route path="/register" component={Register} exact></Route>
                <Route path="/logout" component={Logout} exact></Route>
            </Switch>

        </div>
    );
}

export default Routing;

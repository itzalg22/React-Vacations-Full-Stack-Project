import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Welcome To The Best Vacation Deals Website</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;

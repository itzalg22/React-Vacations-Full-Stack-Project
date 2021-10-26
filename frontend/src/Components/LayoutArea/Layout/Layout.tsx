import { BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <BrowserRouter>
            <header> <Header></Header> </header>
            <main><Routing></Routing> </main>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
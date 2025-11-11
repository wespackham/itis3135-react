import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
        <h1>Wes Packham's Warm Panda | ITIS3135</h1>
            <nav>
                <Link to={"/Home"}>Home</Link>
                <Link to={"/introduction"}>Introduction</Link>
                <Link to={"/contract"}>Contract</Link>
            </nav>
    </header> )
}

export default Header;
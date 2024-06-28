import { Link } from "react-router-dom";

function Navbar (){
    return(
    <nav className="bg-blue-400 p-4">
            <Link to = "/">
                Home
            </Link>
    </nav>
    )
}

export default Navbar;
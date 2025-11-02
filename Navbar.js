import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if(input.trim()) {
        navigate(`/search?query=${encodeURIComponent(input)}`);
        setInput("");
        }  
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };
    return ( 
        <>
        <header className="navbar container">
            <h1>CinePulse</h1>
            <div className="search">
                <input type="text" value={input}  placeholder="Search Movie" onChange={(e)=>{
                    setInput(e.target.value)
                }} onKeyDown={handleKeyDown} />
                <button onClick={handleSearch}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </header>
        </>
     );
}
 
export default Navbar;
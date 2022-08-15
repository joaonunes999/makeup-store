import './Header.css'
import { useState } from "react"
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";

function Header() {

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <div className="header">

            <div className='navbar'>

                <nav className="navigation">
                    <img className="logo" src={logo} alt="logo"></img>
                    <a href="/" className="brand-name">
                        Makeup Store
                    </a>
                    <button
                        className="hamburger"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <img src={menu} alt="menu"></img>
                    </button>
                    <div
                        className={
                            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                        }
                    >
                        <ul>
                            <li>
                                <a href="/#">Home</a>
                            </li>
                            <li>
                                <a href="/#">About</a>
                            </li>
                            <li>
                                <a href="/#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
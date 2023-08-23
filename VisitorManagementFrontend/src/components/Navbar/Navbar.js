import './navbar.scss';
import Logo from "../../images/logo.png"
import React, { useState } from 'react'
import { TbLogout } from 'react-icons/tb';
import { FaWarehouse } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { useEffect } from 'react';

function Navbar({ openSidebar }) {
    const [card, setCard] = useState(false)

    useEffect(() => {
        const warehouse = localStorage.getItem('warehouseId')
        if (warehouse == 'CORP') {
            document.getElementById('toogleGuard').style.display = "block"
        } else {
            document.getElementById('toogleGuard').style.display = "none"
        }
    }, [])

    const profileCard = () => {
        setCard(!card)
    }

    const handlelogout = () => {
        localStorage.clear();
        window.location.href = '/'
    }
    return (
        <>
            <nav className="navbar navcontainer navbar-expand-lg navbar-light text-white  " id="nav">
                <a className="navbar-brand text-white navlogo mb-2" href="#" ><img src={Logo} /></a>
                <button className="navbar-toggler" type="button" data-target="#nav1" data-toggle="collapse" onClick={openSidebar}>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="d-flex justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="ul" className="navbar-nav navlinks ms-auto mb-2 mb-lg-0 ">
                        <li id="li" className="nav-item navlink" >
                            <a className="nav-link" href="Dashboard">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li id="li" className="nav-item navlink ">
                            <a className="nav-link" href="VisitorLogBook">Visitor Entry</a>
                        </li>
                        <li id="li" className="nav-item navlink ">
                            <a className="nav-link" href="Vehicle">Vehicle Entry</a>
                        </li>
                        <li id="li" className="nav-item dropdown navlink">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                LogBook
                            </a>
                            <div id="navdrop" className="dropdown-menu ml-5 " aria-labelledby="navbarDropdown">
                                <a className="dropdown-item text-dark" href="/GeneratorLogBook"><span id="i" >Generator LogBook</span></a>
                                <a className="dropdown-item text-dark" href="/DieselLog"><span id="i">Diesel LogBook</span></a>
                                <a className="dropdown-item text-dark" href="Warehouse"><span id="i">Open/Close Warehouse LogBook</span></a>
                                <a className="dropdown-item text-dark" href="vehiclelogs"><span id="i">Vehicle LogBook</span></a>
                            </div>
                        </li>
                        <li id="li" className="nav-item dropdown navlink">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Guard
                            </a>
                            <div id="navdrop" className="dropdown-menu ml-5 " aria-labelledby="navbarDropdown">
                                <a id="toogleGuard" style={{ display: "none" }} className="dropdown-item text-dark" href="/TotalGuards"><span id="i" >Show Guards</span></a>
                                <a className="dropdown-item text-dark" href="/guardslogs"><span id="i">Guard Login</span></a>
                                <a className="dropdown-item text-dark" href="/guardslogout"><span id="i"> Guard Logout</span></a>
                            </div>
                        </li>
                        <li>
                            <ul className="profilediv">
                                <li className="warehouseplace" onClick={profileCard}>
                                    <span className='staricon'>
                                        <FaWarehouse style={{ fontSize: "25px" }} />
                                    </span> {localStorage.getItem("Warehouse")}
                                    <AiFillCaretDown style={{ margin: "0 4px 4px 0" }} /><br />
                                    {card &&
                                        (<div className="card" style={{ width: "8rem" }}>
                                            <div className="card-body text-danger" onClick={handlelogout}>
                                                Logout <TbLogout style={{ margin: "0 3px 2px 0", fontSize: "19px" }} />
                                            </div>
                                        </div>)
                                    }
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )
}

export default Navbar;
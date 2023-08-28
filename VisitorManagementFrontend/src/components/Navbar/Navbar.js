import './navbar.scss';
import Logo from "../../images/logo.png"
import React, { useState } from 'react'
import { TbLogout } from 'react-icons/tb';
import { FaWarehouse } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

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
            <nav className="navbar navcontainer navbar-expand-lg navbar-light text-white " id="nav">
                <a className="navbar-brand text-white navlogo mb-2" href="#" ><img src={Logo} /></a>
                <button className="navbar-toggler" type="button" data-target="#nav1" data-toggle="collapse" onClick={openSidebar}>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="d-flex justify-content-end collapse navbar-collapse " id="navbarSupportedContent ">
                    <ul id="ul" className="navbar-nav navlinks mb-2 ">
                        <li id="li" className="nav-item navlink" >
                            <Link className="nav-link" to="/Dashboard">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li id="li" className="nav-item navlink ">
                            <Link className="nav-link" to="/VisitorLogBook">Visitor Entry</Link>
                        </li>
                        <li id="li" className="nav-item navlink ">
                            <Link className="nav-link" to="Vehicle">Vehicle Entry</Link>
                        </li>
                        <li id="li" className="nav-item dropdown navlink">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                LogBook
                            </a>
                            <div id="navdrop" className="dropdown-menu ml-5 " aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item text-dark" to="/GeneratorLogBook"><span id="i" >Generator LogBook</span></Link>
                                <Link className="dropdown-item text-dark" to="/DieselLog"><span id="i">Diesel LogBook</span></Link>
                                <Link className="dropdown-item text-dark" to="/Warehouse"><span id="i">Open/Close Warehouse LogBook</span></Link>
                                <Link className="dropdown-item text-dark" to="/vehiclelogs"><span id="i">Vehicle LogBook</span></Link>
                            </div>
                        </li>
                        <li id="li" className="nav-item dropdown navlink">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Guard
                            </a>
                            <div id="navdrop" className="dropdown-menu ml-5 " aria-labelledby="navbarDropdown">
                                <Link id="toogleGuard" style={{ display: "none" }} className="dropdown-item text-dark" to="/TotalGuards"><span id="i" >Show Guards</span></Link>
                                <Link className="dropdown-item text-dark" to="/guardslogs"><span id="i">Guard Login</span></Link>
                                <Link className="dropdown-item text-dark" to="/guardslogout"><span id="i"> Guard Logout</span></Link>
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
                                        (<div className="card" style={{ width: "11rem" }}>
                                            <Link to='/QrCodePage' className="card-body text-danger py-2" style={{ borderBottom: '1px solid #333' }}>
                                                Generate QrCode
                                            </Link>
                                            <div className="card-body text-danger py-2" onClick={handlelogout}>
                                                Logout <TbLogout style={{ margin: "0 3px 2px 0", fontSize: "19px" }} />
                                            </div>
                                        </div>)
                                    }
                                </li>
                            </ul>
                        </li>
                        {/* <li id="li" className="nav-item dropdown show border border-danger">
                            <Link className="dropdown-toggle warehouseplace text-white " role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className='staricon'>
                                    <FaWarehouse style={{ fontSize: "25px" }} />
                                </span> {localStorage.getItem("Warehouse")}
                            </Link>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#"> Generate QrCode</a>
                                <a className="dropdown-item text-danger" href="#" onClick={handlelogout}>Logout <TbLogout style={{ margin: "0 3px 2px 0", fontSize: "19px" }} /></a>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </nav>


        </>
    )
}

export default Navbar;
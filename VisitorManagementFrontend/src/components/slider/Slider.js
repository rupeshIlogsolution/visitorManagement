import './slider.scss';
import React, { useState, useEffect } from 'react';
import Icon from '../../images/logo.png';
import Desiel from '../../images/deisel.png';
import Generator from '../../images/generator.png';
import Warehouselogo from '../../images/warehouse.png';
import Logbook from '../../images/logbook.png';
import Truck from '../../images/truck.svg';
import { ImHome, ImEnter } from 'react-icons/im';
import { FaTruck, FaBook } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';

function Slider({ slider, openSidebar }) {
    const [show, setShow] = useState(false)
    const [showguards, setShowguards] = useState(false)

    useEffect(() => {
        const warehouse = localStorage.getItem('warehouseId')
        if (warehouse == 'CORP') {
            document.getElementById('toogleGuard').style.display = "block"
        } else {
            document.getElementById('toogleGuard').style.display = "none"
        }
    }, [])

    const togglediv = () => {
        setShow(!show);
        setShowguards(false);
    }
    const toggleguarddiv = () => {
        setShowguards(!showguards);
        setShow(false);
    }
    const handlelogout = () => {
        localStorage.clear();
        window.location.href = '/'
    }
    return (
        <>
            <div className={slider ? "slidercontaineropen" : "slidercontainer"} style={{ position: "fixed", width: "270px" }}>
                <div className="closebox">
                    <span onClick={openSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill="white"><path d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z" /></svg></span>
                    <div className="userdetail">
                        <p className="name"> {localStorage.getItem("userName")}</p>
                        <p className="warehouse">{localStorage.getItem("Warehouse")}</p>
                    </div>
                    <div className="imgdiv">
                        <img src={Icon} alt="Icon" />
                    </div>
                </div>
                <div className="bottomdiv">
                    <ul className="listitems">
                        <li className="listitem">
                            <a href='Dashboard'><ImHome style={{ margin: '0 10px 6px 2px' }} />Home</a>
                        </li>
                        <li className="listitem">
                            <a href="VisitorLogBook" ><ImEnter style={{ margin: '0 9px 6px 0' }} />Visitor Entry</a>
                        </li>
                        <li className="listitem">
                            <a href="Vehicle"><FaTruck style={{ margin: '0 8px 6px 2px' }} />Vehicle Entry</a>
                        </li>
                        <li className="listitem outerlist" onClick={togglediv}>
                            <a><FaBook style={{ margin: '0 9px 6px 2px' }} />LogBook<AiFillCaretDown style={{ margin: '0 10px 0 4px' }} /></a>
                            {show &&
                                <ul className="innerlistes pt-0" >
                                    <a href="/GeneratorLogBook">
                                        <li className="innerliste mt-0">
                                            Generator LogBook
                                        </li>
                                    </a>
                                    <a href="/DieselLog">
                                        <li className="innerliste" style={{ width: "100%" }}>
                                            Desiel LogBook
                                        </li>
                                    </a>
                                    <a href="Warehouse">
                                        <li className="innerliste">
                                            Warehouse LogBook
                                        </li>
                                    </a>
                                    <a href="vehiclelogs">
                                        <li className="innerliste">
                                            Vehicle LogBook
                                        </li>
                                    </a>
                                </ul>
                            }
                        </li>

                        {/* Guard */}

                        <li className="listitem outerlist" style={show ? { marginTop: '120px' } : null} onClick={toggleguarddiv}>
                            <a><FaBook style={{ margin: '0 9px 6px 2px' }} />Guard<AiFillCaretDown style={{ margin: '0 10px 0 4px' }} /></a>
                            {showguards &&
                                <ul className="innerlistes pt-0">
                                    <a id="toogleGuard" style={{ display: "none" }} href="/TotalGuards"><li className="innerliste">
                                        Show Guards</li></a>
                                    <a href="/guardslogs"> <li className="innerliste" style={{ width: "100%" }}>
                                        Guard Login</li></a>
                                    <a href="guardslogout"><li className="innerliste">
                                        Guard Logout</li></a>
                                </ul>
                            }
                        </li>
                    </ul>
                    <ul className="bottomlists">
                        <li className="bottomlist arrow" onClick={handlelogout} > Logout <TbLogout style={{ margin: "2px 6px 2px 4px", fontSize: "21px" }} /></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Slider;
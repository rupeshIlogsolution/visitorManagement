import './login.scss'
import React, { useState } from 'react'
import Icon from '../../images/awllogo.png'
import { UserLogin } from '../../api/index'
import { FaUser } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { GoEye, GoEyeClosed } from 'react-icons/go';

function Login() {
    const [showerror, setShowerror] = useState(false);
    const [showpass, setShowpass] = useState(false);

    const toggleicon = () => {
        setShowpass(!showpass);
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const result = await UserLogin(username, password)
        if (result.result === username.toUpperCase()) {
            localStorage.setItem('userId', result.result)
            localStorage.setItem('userName', result.result2)
            localStorage.setItem('Warehouse', result.result3)
            localStorage.setItem('warehouseId', result.result4.trim())
            window.location.href = '/Dashboard';
        }
        else {
            setShowerror(true);
        }

    }
    return (
        <>
            <div className="logincontainer">
                <div className="container h-100">
                    <div className="d-flex justify-content-center h-100">
                        <h1>Visitor Management</h1>
                        <div className="user_card">
                            <div className="d-flex justify-content-center">
                                <div className="brand_logo_container">
                                    <img src={Icon} className="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center form_container">
                                <form>
                                    <h4 className='mb-4 text-center' style={{ color: "white" }}>LOG IN
                                        {/* <RiLoginCircleFill style={{margin:"0 0 4px 5px"}}/> */}
                                    </h4>
                                    <div className="input-group mb-3" style={{ borderBottom: "3px solid white" }}>
                                        <FaUser style={{ color: "white", margin: "15px 6px 0 0", fontSize: "20px" }} />
                                        <input type="text" className='input' autoComplete="off" id="username" placeholder="Username" onChange={() => { setShowerror(false) }} />
                                    </div>
                                    <div className="input-group mb-2" style={{ borderBottom: "3px solid white" }}>
                                        {
                                            showpass ?
                                                <GoEye onClick={toggleicon} style={{ color: "white", margin: "15px 6px 0 0", fontSize: "20px" }} />
                                                : <GoEyeClosed onClick={toggleicon} style={{ color: "white", margin: "15px 6px 0 0", fontSize: "20px" }} />}
                                        <input type={showpass ? "text" : "password"} className='input' id="password" placeholder="Password" onChange={() => { setShowerror(false) }} />
                                        <div className="input-group-append" >

                                        </div>
                                    </div>
                                    {
                                        showerror ?
                                            <><p style={{ color: "red" }}>Please! enter valid username and Password </p></> : null
                                    }
                                    <div className="d-flex justify-content-center mt-4 my-4 login_container">
                                        <button type="submit" onClick={handleClick} className="btn btn-secondary btn-block mt-3">Login</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
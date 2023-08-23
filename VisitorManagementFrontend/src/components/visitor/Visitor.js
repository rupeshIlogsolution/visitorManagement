import React, { useEffect, useState } from 'react';
import './Visitor.css'
import Home from '../Home';
import { VisiterEntry, Allemployee, Sms, EmployeeAlerts } from '../../api/index'
import { ImEnter } from 'react-icons/im';


function Visitor() {
    const [selectdata, setSelectdata] = useState([]);
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [number, setNumber] = useState()
    const [meeting_with, setMeetingWith] = useState('');

    useEffect(() => {
        async function fetchMyAPI() {
            var myDate = new Date();
            var day = myDate.getDate();
            var month = myDate.getMonth() + 1;
            var year = myDate.getFullYear();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            var startDate = year + "-" + month + "-" + day;
            document.getElementById('entrydate').value = startDate
            console.log(localStorage.getItem("warehouseId"))
            const result = await Allemployee(localStorage.getItem("warehouseId"));
            setSelectdata(result)
        }
        fetchMyAPI()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true
        const visitor_name = document.getElementById('visitor_name').value;
        const company_name = document.getElementById('company_name').value;
        const email_id = document.getElementById('email_id').value;
        const no_of_visitor = document.getElementById('no_of_visitor').value;
        const contact_no = document.getElementById('contact_no').value;
        const remark = document.getElementById('remark').value;

        // const sms = await Sms(number,visitor_name,company_name)

        if (!visitor_name || !company_name || !no_of_visitor || !contact_no) {
            setMandatoryfield(true)
        }
        else {
            const result = await VisiterEntry(localStorage.getItem('userName'), localStorage.getItem('warehouseId'), visitor_name, company_name, email_id, no_of_visitor, meeting_with, contact_no, remark)
            if (result) {
                alert("Entry Done Successfully")
                window.location.href = '/Dashboard';
            }
        }
    }

    const handleChange = async (e) => {
        const name = e.target.value;
        setMeetingWith(name)
        const details = await EmployeeAlerts(localStorage.getItem('warehouseId'), name)
        const number = details.PERSMOBILE

        if (number.length === 10) {
            setNumber(number)
        } else {
            const str = number.toString()
            const concatinate = str.slice(str.length - 10)
            setNumber(concatinate)
        }
    }
    const handleDisableErrorMsg = () => {
        setMandatoryfield(false)
        document.getElementById('submitBtn').disabled = false
    }

    return (
        <>
            <div className="generatorlogcontainer">
                <Home />
                <div className="col-md-6 " style={{ margin: "100px auto" }} id="main-visitor">
                    <div className="card" >
                        <header className="card-header" >
                            <h4 className="card-title mt-1 text-light">Visitor Entry<ImEnter style={{ marginLeft: "4px" }} /></h4>
                        </header>
                        <article className="card-body">
                            <form autoComplete='off'>
                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='entrydate'>Entry Date </label>
                                        <input type="date" id="entrydate" className="form-control" style={{ width: "103%" }} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Visitor Name <span className='text-danger'>*</span></label>
                                        <input type="Text" className="form-control" id='visitor_name' onChange={handleDisableErrorMsg} style={{ width: "103%" }} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='company_name'>Company Name <span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control" id="company_name" onChange={handleDisableErrorMsg} style={{ width: "103%" }} />
                                    </div>
                                    <div className="form-group col-md-6" id='select'>
                                        <label htmlFor='meeting_with'>Purpose</label>
                                        <select className="form-control" id='meeting_with' onChange={handleChange} style={{ marginLeft: "-10px", width: "103%", marginTop: "-6px" }}>
                                            <option defaultValue hidden>Choose ...</option>
                                            <option value='Vendor' >Vendor</option>
                                            <option value='Customer' >Customer</option>
                                            <option value='Interview' >Interview</option>
                                            <option value='Delivery' >Delivery</option>
                                            <option value='Other' >Other</option>
                                        </select>
                                        <br />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor='no_of_visitor'>No of Visitors <span className='text-danger'>*</span></label>
                                        <input type="number" className="form-control" onChange={handleDisableErrorMsg} id='no_of_visitor' />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='contact_no'>Contact No <span className='text-danger'>*</span></label>
                                        <input type="tel" className="form-control" onChange={handleDisableErrorMsg} id='contact_no'
                                            maxLength={10} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='email_id'>Email Id:</label>
                                        <input className="form-control" type="email" id='email_id' style={{ width: "103%" }} />
                                    </div>

                                    <div className="form-group col-md-6" id='select'>
                                        <label htmlFor='meeting_with'>To Meet</label>
                                        <select className="form-control" id='meeting_with' onChange={handleChange} style={{ marginLeft: "-10px", width: "103%", marginTop: "-6px" }}>
                                            <option value='' hidden>Choose ...</option>
                                            {selectdata.map((ele) => (
                                                <option key={ele.UserID} value={ele.UserID}>{ele.Name}</option>
                                            ))}
                                        </select>
                                        <br />
                                    </div>

                                </div>
                                <div className="form-group" style={{ marginTop: "-30px" }}>
                                    <label htmlFor='remark'>Remarks</label>
                                    <textarea className="form-control" type="text" id='remark' />
                                </div>
                                {
                                    mandatoryfield && <p className='text-danger'>Please! fill the Mandatory field...</p>
                                }
                                <div className="form-group">
                                    <button type="submit" id="submitBtn" onClick={handleClick} className="btn btn-primary mr-2">Submit</button>
                                    <button type="reset" className="btn btn-secondary ">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Visitor

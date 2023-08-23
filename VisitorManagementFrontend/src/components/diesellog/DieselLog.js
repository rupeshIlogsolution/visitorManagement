import './diesellog.scss'
import React, { useState } from 'react'
import Home from '../Home';
import { DieselEntry } from '../../api/index'
import { MdLibraryBooks } from 'react-icons/md';

const DieselLog = () => {
    const [mandatoryfield, setMandatoryfield] = useState(false);

    const handleDisableErrorMsg = () => {
        setMandatoryfield(false)
        document.getElementById('submitBtn').disabled = false
    }
    const handleClick = async (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        const DATE = document.getElementById('date').value;
        const invoice_no = document.getElementById('invoice_no').value;
        const party_name = document.getElementById('party_name').value;
        const qtyin_liter = document.getElementById('qtyin_liter').value;
        const rate_per_liter = document.getElementById('rate_per_liter').value;
        const person_name = document.getElementById('person_name').value;
        const out_time = document.getElementById('out_time').value;
        const in_time = document.getElementById('in_time').value;
        const TotalAmount = document.getElementById('TotalAmount').value;

        if (!DATE || !invoice_no || !party_name || !qtyin_liter || !rate_per_liter || !person_name || !out_time || !in_time || !TotalAmount) {
            setMandatoryfield(true)
        }
        else {
            const result = await DieselEntry(localStorage.getItem('userName'), localStorage.getItem('warehouseId'), DATE, invoice_no, party_name, qtyin_liter, rate_per_liter, person_name, out_time, in_time, TotalAmount)
            if (result) {
                alert("Saved Successfully")
                window.location.href = '/Dashboard';
            }
        }
    }
    return (
        <>
            <div className="diesellogcontainer">
                <Home />
                <div>
                    <div className="col-md-6" style={{ margin: "100px auto" }}>
                        <div className="card">
                            <header className="card-header">
                                <h4 className="card-title mt-2 text-light">Diesel Log Entry<MdLibraryBooks style={{ margin: "0 0 5px 4px" }} /></h4>
                            </header>
                            <article className="card-body">
                                <form>
                                    <div className='row' style={{ marginTop: "-10px" }}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='date'>Date </label>
                                            <input type="Date" className="form-control" id="date" onChange={handleDisableErrorMsg} />
                                        </div>
                                        <div className="form-group col-md-6" >
                                            <label htmlFor='invoice_no'>Invoice no.</label>
                                            <input type="text" className="form-control" id="invoice_no" onChange={handleDisableErrorMsg} />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='party_name'>Party Name</label>
                                        <input type="text" className="form-control" placeholder="" id="party_name" onChange={handleDisableErrorMsg} />
                                    </div>

                                    <div className="form-row" style={{ marginTop: "-10px" }}>
                                        <div className="col form-group">
                                            <label htmlFor='qtyin_liter'>Qty in Liter</label>
                                            <input className="form-control" type="number" id="qtyin_liter" onChange={handleDisableErrorMsg} />
                                        </div>
                                        <div className="col form-group">
                                            <label htmlFor='rate_per_liter'>Rate per Liter</label>
                                            <input className="form-control" type="number" id="rate_per_liter" onChange={handleDisableErrorMsg} />
                                        </div>
                                    </div>
                                    <div className='row' style={{ marginTop: "-10px" }}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='TotalAmount'>Total Amount</label>
                                            <input className="form-control" type="number" id="TotalAmount" onChange={handleDisableErrorMsg} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='person_name'>Person Name</label>
                                            <input className="form-control" type="text" id="person_name" onChange={handleDisableErrorMsg} />
                                        </div>
                                    </div>

                                    <div className="form-row" style={{ marginTop: "-10px" }}>
                                        <div className="col form-group">
                                            <label htmlFor='out_time'>Out Time</label>
                                            <input className="form-control" type="time" id="out_time" onChange={handleDisableErrorMsg} />
                                        </div>
                                        <div className="col form-group">
                                            <label htmlFor='in_time'>In Time</label>
                                            <input className="form-control" type="time" id="in_time" onChange={handleDisableErrorMsg} />
                                        </div>
                                    </div>
                                    {
                                        mandatoryfield && <p className='text-danger'>All fields are Mandatory</p>
                                    }
                                    <div className="form-group">
                                        <button type="submit" onClick={handleClick} id="submitBtn" className="btn btn-primary mr-2">Submit</button>
                                        <input type="reset" style={{ background: "gray", marginTop: "2px" }} className="btn btn-secondary mt-1 " value='Reset' />                                                                           </div> {/* form-group// */}
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DieselLog;
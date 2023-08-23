import React, { useState } from 'react';
import Home from '../Home';
import { VehicleEntry } from '../../api/index';
import { FaTruck } from 'react-icons/fa';
import Footer from '../footer/Footer';

function Vehicle() {
    const [contactNumver, setContactNumber] = useState('')
    const [mandatoryfield, setMandatoryfield] = useState({
        partyName: false,
        vehicleNumber: false,
        vechicleType: false,
        driverName: false,
        contactNo: false
    });

    const vechicleTypeOption = ["14 Ft", "17 Ft", "18/19 Ft", "20 Ft", "20 Ft CNTR", "20 Ft Trailer", "22 Ft", "24 Ft", "28 Ft", "32 Ft", "32 Ft MA", "Ca40 Ft CNTRr", "40 Ft HQ", "40 Ft Trailer", "45 Ft CNTR", "55 Ft", "909", "Biker", "By Hand", "By Train", "Champion", "Courier", "ECCO", "Mahindra Pickup", "Minimum", "Omni", "TATA 407", "TATA 608", "TATA ACE", "TAXI"]
    const handleChangeEntryType = (e) => {
        if (e.target.value === 'Dispatch') {
            document.getElementById('inwardTimeDiv').style.display = 'none'
            document.getElementById('outwardTimeDiv').style.display = 'block'
        }
        else if (e.target.value === 'Receipt') {
            document.getElementById('outwardTimeDiv').style.display = 'none'
            document.getElementById('inwardTimeDiv').style.display = 'block'
        }
    }
    const handleDisableError = (fieldType) => {
        setMandatoryfield({ ...mandatoryfield, [fieldType]: false })
        document.getElementById('submitBtn').disabled = false
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // document.getElementById('submitBtn').disabled = true
        const EntryType = document.getElementById('entry_type').value;
        let inward_time = document.getElementById('inward_time').value;
        let outward_Time = document.getElementById('outward_time').value;
        const Document_no = document.getElementById('Document_no').value;
        const PartyName = document.getElementById('party_name').value;
        const Vehicle_no = document.getElementById('vehicle_no').value;
        const vehicle_type = document.getElementById('vehicle_type').value;
        const driver_name = document.getElementById('driver_name').value;
        const contact_no = document.getElementById('contact_no').value;
        const remark = document.getElementById('remark').value;

        if (!PartyName || !Vehicle_no || !vehicle_type || !driver_name || !contact_no) {
            if (!PartyName) { setMandatoryfield({ ...mandatoryfield, partyName: true }) }
            else if (!Vehicle_no) { setMandatoryfield({ ...mandatoryfield, vehicleNumber: true }) }
            else if (!vehicle_type) { setMandatoryfield({ ...mandatoryfield, vechicleType: true }) }
            else if (!driver_name) { setMandatoryfield({ ...mandatoryfield, driverName: true }) }
            else if (!contact_no) { setMandatoryfield({ ...mandatoryfield, contactNo: true }) }
        }
        else {
            if (EntryType === 'Dispatch') { inward_time = '' }
            else { outward_Time = '' }

            const result = await VehicleEntry(Document_no, Vehicle_no, vehicle_type, driver_name, contact_no, remark, localStorage.getItem('warehouseId'), PartyName, localStorage.getItem('userName'), EntryType, inward_time, outward_Time)
            if (result) {
                alert("Entry Done Successfully")
                window.location.href = '/Dashboard';
            }
        }
    }
    return (
        <>
            <div className="generatorlogcontainer">
                <Home />
                <div>
                    <div className="col-md-6" style={{ margin: "100px auto" }}>
                        <div className="card">
                            <header className="card-header">
                                <h4 className="card-title mt-1 text-light">Vehicle Entry<FaTruck style={{ marginLeft: "6px" }} /></h4>
                            </header>
                            <article className="card-body">
                                <form autoComplete='off'>
                                    <div className='row' style={{ marginTop: "-10px" }} >
                                        <div className="form-group col-md-6">
                                            <label htmlFor='entry_type'>Entry Type <span className="text-danger">*</span></label>
                                            <select className="form-control" id='entry_type' onChange={handleChangeEntryType}
                                                style={{ background: "none", border: "none", borderBottom: "3px solid rgb(84, 84, 85)", width: "103%", marginTop: "-6px" }}>
                                                <option value="Receipt">Receipt</option>
                                                <option value="Dispatch">Dispatch</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6" id='inwardTimeDiv'>
                                            <label htmlFor='inward_time'>Receipt Time</label>
                                            <input type="time" className="form-control" id="inward_time" style={{ marginLeft: "-10px", width: "103%" }} />
                                        </div>
                                        <div className="form-group col-md-6" id='outwardTimeDiv' style={{ display: 'none' }}>
                                            <label htmlFor='outward_time'>Dispatch Time</label>
                                            <input type="time" className="form-control" id="outward_time" style={{ marginLeft: "-10px", width: "103%" }} />
                                        </div>
                                    </div>
                                    <div className='row' style={{ marginTop: "-10px" }} >
                                        <div className="form-group col" >
                                            <label htmlFor='Document_no'>Document Number </label>
                                            <input type="text" className="form-control" id="Document_no" style={{ marginLeft: "-10px", width: "103%" }} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='party_name'>Party Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="party_name" onChange={() => handleDisableError('partyName')} />
                                            {mandatoryfield.partyName && <p className='text-danger'>Please! Enter Party Name</p>}
                                        </div>
                                    </div>

                                    <div className="form-row" style={{ marginTop: "-10px" }}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='vehicle_no'>Vehicle Number <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id='vehicle_no' onChange={() => handleDisableError('vehicleNumber')} />
                                            {mandatoryfield.vehicleNumber && <p className='text-danger'>Please! Enter Vehicle Number</p>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor='vehicle_type'>Vehicle Type <span className="text-danger">*</span></label>
                                            <select className="form-control" id='vehicle_type' onChange={() => handleDisableError('vechicleType')}
                                                style={{ background: "none", border: "none", borderBottom: "3px solid rgb(84, 84, 85)", marginTop: "-6px" }}   >
                                                <option hidden value="">Select ...</option>
                                                {
                                                    vechicleTypeOption.map((truckType, index) => (
                                                        <option key={index} value={truckType}>{truckType}</option>
                                                    ))
                                                }
                                                {/* <option value="14 Ft">14 Ft</option>
                                                <option value="17 Ft">17 Ft</option>
                                                <option value="18/19 Ft">18/19 Ft</option>
                                                <option value="20 Ft">20 Ft</option>
                                                <option value="20 Ft CNTR">20 Ft CNTR</option>
                                                <option value="20 Ft Trailer">20 Ft Trailer</option>
                                                <option value="22 Ft">22 Ft</option>
                                                <option value="24 Ft">24 Ft</option>
                                                <option value="28 Ft">28 Ft</option>
                                                <option value="32 Ft">32 Ft</option>
                                                <option value="32 Ft MA">32 Ft MA</option>
                                                <option value="Ca40 Ft CNTRr">40 Ft CNTR</option>
                                                <option value="40 Ft HQ">40 Ft HQ</option>
                                                <option value="40 Ft Trailer">40 Ft Trailer</option>
                                                <option value="45 Ft CNTR">45 Ft CNTR</option>
                                                <option value="55 Ft">55 Ft</option>
                                                <option value="909">909</option>
                                                <option value="Biker">Biker</option>
                                                <option value="By Hand">By Hand</option>
                                                <option value="By Train">By Train</option>
                                                <option value="Champion">Champion</option>
                                                <option value="Courier">Courier</option>
                                                <option value="ECCO">ECCO</option>
                                                <option value="Mahindra Pickup">Mahindra Pickup</option>
                                                <option value="Minimum">Minimum</option>
                                                <option value="Omni">Omni</option>
                                                <option value="TATA 407">TATA 407</option>
                                                <option value="TATA 608">TATA 608</option>
                                                <option value="TATA ACE">TATA ACE</option>
                                                <option value="TAXI">TAXI</option> */}
                                            </select>
                                            {mandatoryfield.vechicleType && <p className='text-danger'>Please! Enter Vehicle Type</p>}
                                            <br />
                                        </div>
                                    </div>


                                    <div className="form-row" style={{ marginTop: "-30px" }}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='driver_name'>Driver Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id='driver_name' onChange={() => handleDisableError('driverName')} />
                                            {mandatoryfield.driverName && <p className='text-danger'>Please! Enter Driver Name</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor='contact_no'>Contact No <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" id='contact_no' value={contactNumver} onChange={(e) => {
                                                handleDisableError('contactNo')
                                                if (e.target.value.length > 10) return false
                                                setContactNumber(e.target.value)
                                            }} />
                                            {mandatoryfield.contactNo && <p className='text-danger'>Please! Select Enter Contact No</p>}
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='remark'>Remarks</label>
                                        <textarea className="form-control" type="text" id='remark' />
                                    </div>

                                    <div className="form-group">
                                        <button type="button" id="submitBtn" onClick={handleClick} className="btn btn-primary mr-2">Submit</button>
                                        <button type="reset" className="btn btn-secondary ">Reset</button>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Vehicle

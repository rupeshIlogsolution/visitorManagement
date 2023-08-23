import React, { useEffect, useState } from 'react'
import Home from '../Home';
import { DedicatedVehicle, DedicatedVehicleStatus } from '../../api/index';
import { FaTruck } from 'react-icons/fa';


function VehicleLogs() {
    const [Vehicle, setVehicle] = useState([]);
    const [data, setData] = useState({
        status: '',
        route: ''
    })

    useEffect(() => {
        async function fetchMyAPI() {
            const result = await DedicatedVehicle(localStorage.getItem('warehouseId'))
            setVehicle(result)
        }
        fetchMyAPI()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = `${data.route}`
    }

    const handleChange = async (e) => {
        e.preventDefault()
        let vehicletype = document.getElementById('select-vehicle')
        const result = await DedicatedVehicleStatus(localStorage.getItem('warehouseId'), vehicletype.value)

        document.getElementById('status-div').style.display = 'block';
        let vehicletext = vehicletype.options[vehicletype.selectedIndex].text;
        localStorage.setItem('vehicleType', vehicletext)
        localStorage.setItem('vehicleNum', vehicletype.value)
        console.log(result)
        result.STATUS === undefined ||  result.STATUS==='In' || result.STATUS==='leave' ? setData({ ...data, status: 'In Warehouse', route: 'vehicleOut' }) : setData({ ...data, status: 'Out from Warehouse', route: 'vehicleIn' });
    }

    return (
        <>
            <div className="warehousecontainer ">
                <Home />
                <div className='position-absolute col-md-6' style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <div className="card ">
                        <header className="card-header">
                            <h4 className="card-title mt-2 text-light">Vehicle LogBook<FaTruck className='mx-2' /></h4>
                        </header>
                        <article className="card-body">
                            <form autoComplete='off'>
                                <div className="form-group" id='select'>
                                    <h2>Select Vehicle</h2>
                                    <select className="form-control" id='select-vehicle' onChange={handleChange}>
                                        <option value='' hidden>Choose ...</option>
                                        {
                                            Vehicle.map((ele) => (
                                                <option key={ele.ID} value={ele.VehNo}>{ele.VehType} , {ele.VehNo}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div id='status-div' style={{ display: 'none' }}>
                                    <div className="form-group" id='select '>
                                        <h3>Status :- <span className='text-danger'>{data.status}</span></h3>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end">
                                        <button type="submit" onClick={handleClick} id="submitBtn" className="btn btn-primary mr-2">Update</button>
                                        <button type="reset" className="btn btn-secondary  " value='Reset' >Reset</button>
                                    </div>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VehicleLogs

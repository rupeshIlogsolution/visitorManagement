import React, { useEffect, useState } from 'react';
// import NavPage from '../../Navbar/NavBar';
// import Homefooter from '../../footer/footer';
import { insertguard, ActiveLocation, TotalVendor } from '../../../api/index'
import Home from '../../Home'
import Select from 'react-select';



const InsertGuard = () => {
    const colourStyles = {
        control: styles => ({ ...styles, width: '100%', backgroundColor: 'none', border: "none", borderBottom: "3px solid rgb(92,91,92)" }),
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: 'rgb(39,39,52)',
                color: '#FFF',
                cursor: 'default',
            };
        },
    }

    const [location, setLocation] = useState([])
    const [number, setNumber] = useState()
    const [shift, setShift] = useState()
    const [vendorlist, setVendorlist] = useState([])
    const [vendor, setVendor] = useState()

    useEffect(async () => {
        const result = await ActiveLocation()
        setLocation(result)


        const Vendor = await TotalVendor()
        setVendorlist(Vendor)

        var myDate = new Date();
        var day = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        document.getElementById('guardjoindate').value = year + "-" + month + "-" + day;

    }, [])

    const handleChange = (e) => {
        if (e.target.value.length > 10) return false
        setNumber(e.target.value)
    }

    const handleChangestatus = (e) => {
        let data = e.target.value
        setShift(data)
    }
    let options = vendorlist.map((ele) => {
        return { value: ele.Tid, label: ele.Tname };
    })
    const handleCustvendval = (e) => {
        setVendor(e)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const Location = document.getElementById('location').value
        let LocationName = document.getElementById('location')
        LocationName = LocationName.options[LocationName.selectedIndex].text;

        const Guardname = document.getElementById('guardname').value
        const Guardid = 'Guard' + Location + Math.floor(1000 + Math.random() * 9000)
        const Phoneno = document.getElementById('phoneno').value
        const vendorid = vendor.value
        const vendorname = vendor.label
        const Guardjoiningdate = document.getElementById('guardjoindate').value
        const dateofbirth = document.getElementById('dateofbirth').value

        const result = await insertguard(Location, Guardname, Guardid, Phoneno, vendorid, vendorname, Guardjoiningdate, LocationName, dateofbirth, shift)
        if (result == 'Added') {
            alert('Guard Added Successfully')
            window.location.href = '/TotalGuards'
        } else {
            alert('Invalid Entry')
        }
    }

    return (
        <>
            {/* <NavPage /> */}
            <div className="Total_Glogs">
                <Home />

                <div className="row d-flex justify-content-center align-items-center mt-5 pt-5" style={{ width: "100%" }}>
                    <div className="col col-md-6">

                        <div className="card mt-5 ">
                            <header className="card-header" >
                                <h4 className="card-title mt-1 text-light">Add Guard</h4>
                            </header>
                            <div className='card-body'>
                                <form>

                                    <div className=' row ' style={{ marginBottom: "6px" }} >

                                        <div className="form-group col-md-6" style={{ marginBottom: "-1px" }}>
                                            <label htmlFor="Invoice_Amount">Vendor Name <span style={{ color: "red" }}>*</span></label>
                                            {/* <input className="form-control" type="text" id="vendid"/> */}
                                            <Select
                                                id="vendid"
                                                className="mb-3"
                                                options={options}
                                                isMulti={false}

                                                styles={colourStyles}
                                                onChange={handleCustvendval}
                                            />
                                        </div>
                                        <div className="form-group col-md-6" style={{ marginBottom: "-1px" }} >
                                            <label htmlFor="Invoice_Amount">Location <span style={{ color: "red" }}>*</span></label>
                                            <select style={{ border: "none", borderBottom: "3px solid #5c5b5c", background: "none", borderRadius: "5px" }} className="form-select w-100 p-2" id="location">
                                                <option selected value="" hidden>Select Location</option>
                                                {
                                                    location.map(items => (
                                                        <option value={items.WHid} >{items.WHname}</option>

                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-1">

                                        <div className='row' style={{ marginBottom: "0px" }}>

                                            <div className="form-group col-md-6" style={{ marginBottom: "0px" }}>
                                                <label htmlFor="Invoice_Amount">Guard Name <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="text" id="guardname" />
                                            </div>
                                            <div className="form-group col-md-6" style={{ marginBottom: "0px" }}>
                                                <label htmlFor="Invoice_Amount">Phone No <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="number" id="phoneno" onChange={handleChange} value={number} />
                                            </div>
                                        </div>



                                        <div className='row mt-1'>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="Invoice_Amount">Date Of Birth <span style={{ color: "red", }}>*</span></label>
                                                <input className="form-control" type="date" id="dateofbirth" />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="Invoice_Amount">Guard Joining Date <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="date" id="guardjoindate" />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex" onChange={handleChangestatus} >

                                            <label
                                                htmlFor="user_name"
                                                className="col-md-4 col-form-label font-weight-normal d-flex"
                                            >
                                                Select Shift <span style={{ color: "red" }}>*</span>
                                            </label>

                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className="form-check-input" type="radio"
                                                    name="taxpreference"
                                                    value="Day"
                                                />Day
                                            </label>

                                            <label className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="taxpreference"
                                                    value="Night"
                                                />Night

                                            </label>
                                        </div>




                                        <div className='my-3'>
                                            <button type='reset' id="link_supp" className="btn btn-dark" value='reset'>Reset </button>
                                            <button style={{ marginLeft: '20px' }} className="btn btn-secondary" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = '/TotalGuards'
                                            }}>
                                                Cancel
                                            </button>
                                            <button id="add_btn" type="submit" style={{ marginLeft: '20px' }} className="btn btn-primary" onClick={handleClick}>Save</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            {/* <Homefooter /> */}
        </>
    )
}

export default InsertGuard
// ff
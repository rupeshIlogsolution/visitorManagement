import React, { useEffect, useState } from 'react';
// import NavPage from '../../Navbar/NavBar';
// import Homefooter from '../../footer/footer';
import { updateGuardDetails,SelectedGuards } from '../../../api/index'
import Home from '../../Home'
import Select from 'react-select';



const EditGuard = () => {
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

    const [GuardData,setGuardData] = useState({})

    useEffect(async () => {
    

        const guardlist = await SelectedGuards(sessionStorage.getItem('getGuard'))
        console.log(guardlist)
        setGuardData(guardlist[0])
        setNumber(guardlist[0].Phoneno)
        if(guardlist[0].Shift == 'Day'){
            document.getElementById('Day').checked = true;
            setShift(guardlist[0].Shift)
        }else{
            document.getElementById('Night').checked = true;
            setShift(guardlist[0].Shift)
        }


      



    }, [])

    const handleChange = (e) => {
        if (e.target.value.length > 10) return false
        setNumber(e.target.value)
    }

    const handleChangestatus = (e) => {
        let data = e.target.value
        setShift(data)
        console.log(data)
    }
    let options = vendorlist.map((ele) => {
        return { value: ele.Tid, label: ele.Tname };
    })
   

    const handleClick = async (e) => {
        e.preventDefault();


        const Guardname = document.getElementById('guardname').value
        const Phoneno = document.getElementById('phoneno').value
       
        const Guardjoiningdate = document.getElementById('guardjoindate').value
        const dateofbirth = document.getElementById('dateofbirth').value
        // console.log( vendorname)

        console.log( Guardname, Phoneno, Guardjoiningdate, dateofbirth, shift)

        const result = await updateGuardDetails(sessionStorage.getItem('getGuard'),Guardname,Phoneno,Guardjoiningdate,dateofbirth,shift)
        console.log(result)
        if (result == 'Updated') {
            alert('Guard Updated')
            sessionStorage.removeItem('getGuard');

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
                                <h4 className="card-title mt-1 text-light">Edit Guard</h4>
                            </header>
                            <div className='card-body'>
                                <form>

                                    <div className=' row ' style={{ marginBottom: "6px" }} >

                                        <div className="form-group col-md-6" style={{ marginBottom: "-1px" }}>
                                            <label htmlFor="Invoice_Amount">Vendor Name <span style={{ color: "red" }}>*</span></label>
                                            <input className="form-control" disabled type="text" id="vendname" value={GuardData.Vendorname}/>
                   
                                        </div>
                                        <div className="form-group col-md-6" style={{ marginBottom: "-1px" }} >
                                            <label htmlFor="Invoice_Amount">Location <span style={{ color: "red" }}>*</span></label>
                                            <input className="form-control" disabled type="text" id="vendname" value={GuardData.locationname}/>

                                            {/* <select style={{ border: "none", borderBottom: "3px solid #5c5b5c", background: "none", borderRadius: "5px" }} className="form-select w-100 p-2" id="location">
                                                <option selected value="" hidden>Select Location</option>
                                                {
                                                    location.map(items => (
                                                        <option value={items.WHid} >{items.WHname}</option>

                                                    ))
                                                }
                                            </select> */}
                                        </div>
                                    </div>

                                    <div className="mb-1">

                                        <div className='row' style={{ marginBottom: "0px" }}>

                                            <div className="form-group col-md-6" style={{ marginBottom: "0px" }}>
                                                <label htmlFor="Invoice_Amount">Guard Name <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="text" id="guardname" defaultValue={GuardData.Guardname} />
                                            </div>
                                            <div className="form-group col-md-6" style={{ marginBottom: "0px" }}>
                                                <label htmlFor="Invoice_Amount">Phone No <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="number" id="phoneno" onChange={handleChange} defaultValue={number} />
                                            </div>
                                        </div>



                                        <div className='row mt-1'>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="Invoice_Amount">Date Of Birth <span style={{ color: "red", }}>*</span></label>
                                                <input className="form-control" type="date" id="dateofbirth" defaultValue={GuardData.dateofbirth}/>
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="Invoice_Amount">Guard Joining Date <span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="date" id="guardjoindate" defaultValue={GuardData.Joindate} />
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
                                                <input className="form-check-input" type="radio" id="Day" name="taxpreference" value="Day" />Day
                                            </label>

                                            <label className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" id="Night" name="taxpreference" value="Night"
                                                />Night

                                            </label>
                                        </div>




                                        <div className='my-3'>
                                            {/* <button type='reset' id="link_supp" className="btn btn-dark" value='reset'>Reset </button> */}
                                            <button style={{ marginLeft: '20px' }} className="btn btn-secondary" onClick={(e) => {
                                                e.preventDefault()
                                                sessionStorage.removeItem('getGuard');

                                                window.location.href = '/TotalGuards'
                                            }}>
                                                Cancel
                                            </button>
                                            <button id="add_btn" type="submit" style={{ marginLeft: '20px' }} className="btn btn-primary" onClick={handleClick}>Update</button>
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

export default EditGuard

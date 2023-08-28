import React, { useEffect, useState } from 'react';
import '../visitor/Visitor.css'
import { VisiterEntry, Allemployee, Sms, EmployeeAlerts, UploadData } from '../../api/index'
import { ImEnter } from 'react-icons/im';

function PublicVisitor({ match }) {
    const [selectdata, setSelectdata] = useState([]);
    const [mandatoryfield, setMandatoryfield] = useState({
        visitorName: false,
        companyName: false,
        noOfVisitor: false,
        contactNo: false,
        idProofImg: false,
        visitorPhoto: false,
    });
    const [number, setNumber] = useState()
    const [meeting_with, setMeetingWith] = useState('');
    const [idPhotoUrl, setVisitorIdPhotoUrl] = useState('')
    const [visitorPhotoUrl, setVisitorPhotoUrl] = useState('')
    const [visitorIdImage, setVisitorIdImage] = useState()
    const [visitorImage, setVisitorImage] = useState()

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

            const result = await Allemployee(match.params.urlKey);
            setSelectdata(result)
        }
        fetchMyAPI()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true
        const visitor_entry_date = document.getElementById('entrydate').value;
        const visitor_name = document.getElementById('visitor_name').value;
        const company_name = document.getElementById('company_name').value;
        const purpose = document.getElementById('purpose').value;
        const no_of_visitor = document.getElementById('no_of_visitor').value;
        const contact_no = document.getElementById('contact_no').value;
        const email_id = document.getElementById('email_id').value;
        const remark = document.getElementById('remark').value;
        const user_name = localStorage.getItem('userName')
        const wh_id = localStorage.getItem('warehouseId')

        // const sms = await Sms(number,visitor_name,company_name)

        if (!visitor_name || !company_name || !no_of_visitor || !contact_no || !idPhotoUrl || !visitorPhotoUrl) {
            if (!visitor_name) {
                setMandatoryfield({ ...mandatoryfield, visitorName: true })
            }
            else if (!company_name) {
                setMandatoryfield({ ...mandatoryfield, companyName: true })
            }
            else if (!no_of_visitor) {
                setMandatoryfield({ ...mandatoryfield, noOfVisitor: true })
            }
            else if (!contact_no) {
                setMandatoryfield({ ...mandatoryfield, contactNo: true })
            }
            else if (!idPhotoUrl) {
                setMandatoryfield({ ...mandatoryfield, idProofImg: true })
            }
            else if (!visitorPhotoUrl) {
                setMandatoryfield({ ...mandatoryfield, visitorPhoto: true })
            }
        }
        else {
            const result = await VisiterEntry(user_name, wh_id, visitor_name, company_name, email_id, no_of_visitor, meeting_with, contact_no, remark, visitor_entry_date, purpose, idPhotoUrl, visitorPhotoUrl)
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

    const handleDisableErrorMsg = (fieldsType) => {
        setMandatoryfield({...mandatoryfield,[fieldsType]:false})
        document.getElementById('submitBtn').disabled = false
    }
    // Upload Visitor Id Proof -------
    const handleSendFile = async (e) => {
        if (visitorIdImage.size) {
           handleDisableErrorMsg('idProofImg')
            document.getElementById('article').style.display = "none"
            document.getElementById('loading').style.display = "flex"
            e.preventDefault()

            const data = new FormData();
            data.append("images", visitorIdImage)
            const UploadLink = await UploadData(data)
            setVisitorIdPhotoUrl(UploadLink)

            if (UploadLink) {
                document.getElementById('loading').style.display = "none"
                document.getElementById('article').style.display = "block"
            }
        }
        else {
            alert('Select Image')
        }
    }
    // Upload Visitor Photo -------
    const handleVisitorSendFile = async (e) => {
        if (visitorImage.size) {
            handleDisableErrorMsg('visitorPhoto')
            document.getElementById('article').style.display = "none"
            document.getElementById('loading').style.display = "flex"
            e.preventDefault()

            const data = new FormData();
            data.append("images", visitorImage)
            const UploadLink = await UploadData(data)
            setVisitorPhotoUrl(UploadLink)

            if (UploadLink) {
                document.getElementById('loading').style.display = "none"
                document.getElementById('article').style.display = "block"
            }
        }
        else {
            alert('Select Image')
        }
    }


    return (
        <>
            <div className="generatorlogcontainer ">
                {/* <Home /> */}
                <div className="col-md-6" style={{ margin: "0px auto" }} id="main-visitor">
                    <div className="card" >
                        <header className="card-header" >
                            <h4 className="card-title mt-1 text-light">Visitor Entry<ImEnter style={{ marginLeft: "4px" }} /></h4>
                        </header>
                        <h1 style={{ display: "none", justifyContent: "center", alignItems: "center" }} id="loading">Please wait a second...</h1>
                        <article className="card-body" id="article">
                            <form autoComplete='off'>
                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='entrydate'>Entry Date </label>
                                        <input type="date" id="entrydate" className="form-control" style={{ width: "103%" }} disabled />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Visitor Name <span className='text-danger'>*</span></label>
                                        <input type="Text" className="form-control" id='visitor_name' onChange={()=>handleDisableErrorMsg('visitorName')} style={{ width: "103%" }} />
                                        {mandatoryfield.visitorName && <p className='text-danger'>Please! Enter Name...</p>}
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className="form-group col-md-6 mb-0">
                                        <label htmlFor='company_name'>Company Name <span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control" id="company_name" onChange={()=>handleDisableErrorMsg('companyName')} style={{ width: "103%" }} />
                                        {mandatoryfield.companyName && <p className='text-danger'>Please! Enter Company Name...</p>}
                                    </div>
                                    <div className="form-group col-md-6 mb-0" id='select'>
                                        <label htmlFor='purpose'>Purpose</label>
                                        <select className="form-control" id='purpose' onChange={handleChange} style={{ marginLeft: "-10px", width: "103%", marginTop: "-6px" }}>
                                            <option defaultValue hidden>Select...</option>
                                            <option value='Vendor' >Vendor</option>
                                            <option value='Customer' >Customer</option>
                                            <option value='Interview' >Interview</option>
                                            <option value='Delivery' >Delivery</option>
                                            <option value='Other' >Other</option>
                                        </select>
                                        <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor='no_of_visitor'>No of Visitors <span className='text-danger'>*</span></label>
                                        <input type="number" className="form-control" onChange={()=>handleDisableErrorMsg('noOfVisitor')} id='no_of_visitor' />
                                        {mandatoryfield.noOfVisitor && <p className='text-danger'>Please! Enter No of visitor...</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='contact_no'>Contact No <span className='text-danger'>*</span></label>
                                        <input type="number" className="form-control" onChange={()=>handleDisableErrorMsg('contactNo')} id='contact_no'
                                            maxLength={10} />
                                        {mandatoryfield.contactNo && <p className='text-danger'>Please! Enter Contact no...</p>}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="form-group col-md-6 ">
                                        <label htmlFor='email_id'>Email Id:</label>
                                        <input className="form-control" type="email" id='email_id' style={{ width: "103%" }} />
                                    </div>

                                    <div className="form-group col-md-6" id='select'>
                                        <label htmlFor='meeting_with'>To Meet</label>
                                        <select className="form-control" id='meeting_with' onChange={handleChange} style={{ marginLeft: "-10px", width: "103%", marginTop: "-6px" }}>
                                            <option value='' hidden>Select...</option>
                                            {selectdata.map((ele) => (
                                                <option key={ele.UserID} value={ele.UserID}>{ele.Name}</option>
                                            ))}
                                        </select>
                                        <br />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor='visitor_id'>Upload Visitor Id Proof <span className='text-danger'>*</span></label>
                                        <button className="form-control btn btn-success col-md-6" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#exampleModal">Upload Image</button>
                                        {mandatoryfield.idProofImg && <p className='text-danger'>Upload Id...</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='visitor_photo'>Upload Visitor Photo <span className='text-danger'>*</span></label>
                                        <button className="form-control btn btn-success col-md-7" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#visitorPhotoModel">Upload Image</button>
                                        {mandatoryfield.visitorPhoto && <p className='text-danger'>Upload Visitor Photo...</p>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks</label>
                                    <textarea className="form-control" type="text" id='remark' />
                                </div>

                                <div className="form-group ">
                                    <button type="submit" id="submitBtn" onClick={handleClick} className="btn btn-primary mr-2">Submit</button>
                                    <button type="reset" className="btn btn-secondary ">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
                {/* Upload Image Model */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Upload Visitor id Proof</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <label className="col-sm-4 col-form-label"> Open Image  </label>
                                    <input type="file" className="" accept=".jpg, .jpeg, .png" onChange={event => { setVisitorIdImage(event.target.files[0]) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id="upload" onClick={handleSendFile} data-dismiss="modal" className="btn btn-primary">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Upload Image Model */}
                <div className="modal fade" id="visitorPhotoModel" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Upload Visitor Mange</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <label className="col-sm-4 col-form-label"> Open Image  </label>
                                    <input type="file" className="" accept=".jpg, .jpeg, .png" onChange={event => { setVisitorImage(event.target.files[0]) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id="upload" onClick={handleVisitorSendFile} data-dismiss="modal" className="btn btn-primary">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <Footer/> */}
        </>
    )
}

export default PublicVisitor

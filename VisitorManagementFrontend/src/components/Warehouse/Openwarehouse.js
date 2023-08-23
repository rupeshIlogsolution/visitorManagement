import React, { useEffect, useState } from 'react'
import { Warehouseopen, warehouseLastclose,UploadData } from '../../api/index'
import { MdLibraryBooks } from 'react-icons/md';
import Footer from '../footer/Footer';


function Openwarehouse() {
    const [last_date, setLastDate] = useState('');
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [file, setFile] = useState('')
    const [uploadimage,setUploadImage] = useState()
    // const [loading, setLoading] = useState(false);




    useEffect(() => {
        const data = async () => {
            const result = await warehouseLastclose(localStorage.getItem('warehouseId'))
            const date = new Date(result)
            let format_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

            if(result.length === undefined) {
            setLastDate("YYY-MM-DD")
            }else{
                setLastDate(format_date)
            }
        }
        data()
    }, [])

    const handlesave = async (e) => {
        e.preventDefault();
        const entry_by = localStorage.getItem('userId');
        const wharehouse = localStorage.getItem('Warehouse');
        const date = document.getElementById('date').value;
        const opening_time = document.getElementById('Openingtime').value;
        const opened_by = document.getElementById('Openby').value;
        const awl_person_open = document.getElementById('awlpersonopen').value;

        if (!date || !opening_time || !opened_by || !awl_person_open) {
            setMandatoryfield(true)

        }
        else {
            console.log(uploadimage)

            if(uploadimage){
                document.getElementById('submitBtn').disabled = true;

                // alert('You have Upload Image !!')
                    const result = await Warehouseopen(entry_by, wharehouse, date, opening_time, opened_by, awl_person_open,localStorage.getItem('warehouseId'),uploadimage)
            if (result) {
                alert("Warehouse is Opened")
                window.location.href = '/Dashboard';
            }
            }
            else{
                alert('You have not Upload Image')
            }
        
        }

    }

    const handleSendFile = async (e) => {
        // setLoading(true)
        if(file.size){

        document.getElementById('article').style.display="none"

        document.getElementById('loading').style.display="flex"
        e.preventDefault()

        console.log('Upload',file)
        const data = new FormData();
        data.append("images", file)
        const UploadLink = await UploadData(data)
        console.log(UploadLink)
        setUploadImage(UploadLink)
        if(UploadLink){
            document.getElementById('loading').style.display="none"
            document.getElementById('article').style.display="block"

        }
    }
    else{
        alert('Select Image')
    }

      }
    return (
        <>
            <div className="openwarehousecontainer">
                <div>
                    <div className="col-md-6" style={{ margin: "100px auto" }}>
                        <h2 className="card-title mt-2 " style={{ marginLeft: "10%" }}><span style={{ color: "white",textShadow:"2px 1px 4px black" }}> Warehouse is Closed on {last_date}</span></h2>
                        <div className="card">
                            <header className="card-header">
                                <h4 className="card-title mt-2 text-light">Enter Warehouse Opening Entry <MdLibraryBooks style={{margin:"0 0 4px 4px"}}/></h4>
                            </header>
                            {/* {loading?( */}
                                
                  <h1 style={{display:"none",justifyContent:"center",alignItems:"center" }} id="loading">Please wait a second...</h1>

      {/* ):( */}
                            <article className="card-body" id="article">
                                <form>
                                    <div className="form-group">
                                        <label>Date </label>
                                        <input type="Date" className="form-control" placeholder="" id='date' />
                                    </div>
                                    <div className="form-group">
                                        <label>Opening Time</label>
                                        <input type="time" className="form-control" id="Openingtime" />
                                    </div>
                                    <div className="form-group">
                                        <label>Open by</label>
                                        <input type="text" className="form-control" id="Openby" />
                                    </div>
                                    <div className="form-group">
                                        <label>AWL Person Present</label>
                                        <input className="form-control" type="text" id="awlpersonopen" />
                                    </div>
                                    {
                                        mandatoryfield
                                            ? <p style={{ color: "red" }}>Please! fill the field OR Upload Image...</p> : null
                                    }
                                    <div className="form-group">
                                        <button type="submit" id="submitBtn" className="btn btn-primary mr-2" onClick={handlesave}>Submit</button>
                                        <input type="reset" style={{background:"gray",marginTop:"2px"}} className="btn btn-secondary " value='Reset' />
                                        <button className="btn btn-success ml-2" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#exampleModal">Upload Image</button>
                                    </div>
                                </form>
                            </article>
      {/* )} */}
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload Image</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <label className="col-sm-4 col-form-label">
                    Open Image
                  </label>
                  <input type="file" className="" placeholder="" onChange={event => {
                    const documents = event.target.files[0];
                    setFile(documents)

                 
                    

                  }}/>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="upload"  onClick={handleSendFile} data-dismiss="modal" className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Openwarehouse

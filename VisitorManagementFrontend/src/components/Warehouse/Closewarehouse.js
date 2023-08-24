import React, { useState } from 'react'
import { Warehouseclose, UploadData } from '../../api'
import { MdLibraryBooks } from 'react-icons/md';
import Footer from '../footer/Footer';



function Closewarehouse(prop) {
  const [mandatoryfield, setMandatoryfield] = useState(false);
  const [file, setFile] = useState('')
  const [uploadimage, setUploadImage] = useState()
  // const [loading, setLoading] = useState(false);



  const date = new Date(prop.date)
  let format_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

  const handleClick = async (e) => {
    e.preventDefault()
    const Closingtime = document.getElementById('Closingtime').value
    const Closeby = document.getElementById('Closeby').value
    const awlperson = document.getElementById('awlperson').value

    if (!Closingtime || !Closeby || !awlperson) {
      setMandatoryfield(true)

    }
    else {
      console.log(uploadimage)

      if (uploadimage) {
        // alert('You have Upload Image !!')
        document.getElementById('submitBtn').disabled = true;

        const result = await Warehouseclose(prop.date, Closingtime, Closeby, awlperson, localStorage.getItem('warehouseId'), uploadimage)
        if (result) {

          alert("Warehouse is Closed")
          window.location.href = '/Dashboard';
        }
      }
      else {
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
    const data = new FormData();
    data.append("images", file)
    const UploadLink = await UploadData(data)
    console.log(UploadLink)
    setUploadImage(UploadLink)
    if(UploadLink){
      document.getElementById('loading').style.display="none"
      document.getElementById('article').style.display="block"    
    }
  }else{
    alert('Select Image')

  }
  }


  return (
    <>
      <div className="diesellogcontainer">
        <div>

          {/* <div className="row justify-content-center mt-5" style={{border:"2px solid red",width:"100%"}}> */}
          <div className="col-md-6" style={{ margin: "100px auto" }}>
            <h2 className="card-title mt-2 text-light " style={{ marginLeft: "10%" }}><span style={{ color: "white",textShadow:"2px 1px 4px black" }}> Warehouse is Opened on {format_date} </span></h2>

            <div className="card">
              <header className="card-header">
                <h4 className="card-title mt-2 text-light">Enter Warehouse Closing Entry<MdLibraryBooks style={{margin:"0 0 4px 4px"}}/></h4>
              </header>

              {/* {loading?( */}
                  <h1 style={{display:"none",justifyContent:"center",alignItems:"center" }} id="loading">Please wait a second...</h1>

      {/* // ):( */}
      <article className="card-body" id="article">
                        <form>

                  <div className="form-group">
                    <label>Date </label>
                    <input type="Date" className="form-control" disabled style={{ cursor: "not-allowed" }} value={prop.date} />
                  </div>


                  <div className="form-group">
                    <label>Closing Time</label>
                    <input type="time" className="form-control" id="Closingtime" />
                  </div>

                  <div className="form-group">
                    <label>Close by</label>
                    <input type="text" className="form-control" id="Closeby" />
                  </div>

                  <div className="form-group">
                    <label>AWL Person Present</label>
                    <input className="form-control" type="text" id="awlperson"/>
                  </div>

                  {
                    mandatoryfield
                      ? <p style={{ color: "red" }}>Please! fill the field Or Upload Image... </p> : null
                  }

                  <div className="form-group">
                    <button type="submit" id="submitBtn" onClick={handleClick} className="btn btn-primary mr-2">Submit</button>
                    <input style={{background:"gray",marginTop:"2px"}} type="reset" className="btn btn-secondary " value='Reset' />
                    <button className="btn btn-success ml-2" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#exampleModal">Upload Image</button>
                  </div>
                </form>
              </article>
      {/* )} */}
            </div>
          </div></div>
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
                    Close Image
                  </label>
                  <input type="file" className="" placeholder="" onChange={event => {
                    const document = event.target.files[0];
                    setFile(document)
                  }}  />

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={handleSendFile} data-dismiss="modal" className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
          
        </div>

      </div>
      {/* <Footer/> */}
    </>
  )
}

export default Closewarehouse

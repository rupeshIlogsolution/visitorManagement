import React, { useState } from 'react'
import Home from '../Home';
import { GeneratorEntry } from '../../api/index'
import { MdLibraryBooks } from 'react-icons/md';

function GeneratorLog() {
    const [mandatoryfield, setMandatoryfield] = useState(false);

    const handleDisableErrorMsg = () => {
        setMandatoryfield(false)
        document.getElementById('submitBtn').disabled = false
    }
    const handleClick = async (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        const date = document.getElementById('date').value;
        const starttime = document.getElementById('starttime').value;
        const startreading = document.getElementById('startreading').value;
        const endtime = document.getElementById('endtime').value;
        const endreading = document.getElementById('endreading').value;

        if (!date || !starttime || !startreading || !endtime || !endreading) {
            setMandatoryfield(true);
        }
        else {
            const result = await GeneratorEntry(localStorage.getItem('userName'), localStorage.getItem('warehouseId'), date, starttime, startreading, endtime, endreading)
            if (result) {
                alert("Saved Successfully")
                window.location.href = '/Dashboard';
            }
        }
    }

    return (
        <>
            <div className="generatorlogcontainer">
                <Home />

                <div>
                    <div className="col-md-6" style={{ margin: "100px auto" }} >
                        <div className="card" >
                            <header className="card-header" >
                                <h4 className="card-title mt-1 text-light">Generator Log Book Entry <MdLibraryBooks style={{ margin: "0 0 5px 0" }} /></h4>
                            </header>

                            <article className="card-body">
                                <form>

                                    <div className="form-group" style={{ marginTop: "-12px" }}>
                                        <label htmlFor='date'>Date </label>
                                        <input type="Date" className="form-control" id='date' onChange={handleDisableErrorMsg} />
                                    </div>
                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='starttime'>Start Time</label>
                                        <input type="time" className="form-control" placeholder="Start Time" id="starttime" onChange={handleDisableErrorMsg} />
                                    </div>

                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='startreading'>Start Reading</label>
                                        <input type="number" className="form-control" placeholder="Reading" id="startreading" onChange={handleDisableErrorMsg} />
                                    </div>
                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='endtime'>End Time</label>
                                        <input className="form-control" type="time" id='endtime' onChange={handleDisableErrorMsg} />
                                    </div>
                                    <div className="form-group" style={{ marginTop: "-10px" }}>
                                        <label htmlFor='endreading'>End Reading</label>
                                        <input className="form-control" type="number" placeholder="Reading" id='endreading' onChange={handleDisableErrorMsg} />
                                    </div>
                                    {mandatoryfield && <p className='text-center'>All field are mandatory</p>}
                                    <div className="form-group">
                                        <button type="button" onClick={handleClick} id="submitBtn" className="btn btn-primary mr-2">Submit</button>
                                        <input type="reset" style={{ background: "gray", marginTop: "2px" }} className="btn btn-secondary" value='Reset' />
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>

                </div></div>
        </>
    )
}

export default GeneratorLog;
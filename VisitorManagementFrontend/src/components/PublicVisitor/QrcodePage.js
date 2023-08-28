import React, { useEffect, useState } from 'react';
import '../visitor/Visitor.css'
import { GenerateQR } from '../../api/index'
import Home from '../Home';

function QrCodePage() {
    const [data, setData] = useState('')

    useEffect(() => {
        fetchMyAPI()
    }, [])

    async function fetchMyAPI() {
        const qr = await GenerateQR(localStorage.getItem('warehouseId'));
        setData(qr)
    }

    return (
        <>
            <div className="dashboardcont">

                <Home />
                <div className="position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} id="main-visitor">
                    <div style={{ height: '320px', width: '320px' }}>
                        <img src={data} alt='QR Code' style={{ height: '100%', width: '100%' }} />
                    </div>
                    <a href={data} Download={`Qr code-${localStorage.getItem('Warehouse')}`} className='btn btn-success w-50 float-right mt-1'>Download QrCode</a>
                </div>
            </div>

        </>
    )
}

export default QrCodePage
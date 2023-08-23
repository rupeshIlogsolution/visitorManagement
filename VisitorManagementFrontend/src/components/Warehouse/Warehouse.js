import React, { useEffect, useState } from 'react'
import Home from '../Home';
import Openwarehouse from './Openwarehouse';
import Closewarehouse from './Closewarehouse';
import { Warehousecheckopen } from '../../api/index';


function Warehouse() {
    const [warehouse, setWarehouse] = useState(false);
    const [date ,setDate] =useState();

    useEffect(() => {
        async function fetchMyAPI() {
            const result = await Warehousecheckopen(localStorage.getItem('warehouseId'))
            if (result) {
                setWarehouse(true)
                console.log(result.date)
                setDate(result.date)
            }
        }
        fetchMyAPI()
    }, [])

    return (
        <>
            <div className="warehousecontainer">
                <Home />
                {
                    warehouse ? <Closewarehouse date={date} /> : <Openwarehouse />
                }
            </div>
        </>
    )
}

export default Warehouse

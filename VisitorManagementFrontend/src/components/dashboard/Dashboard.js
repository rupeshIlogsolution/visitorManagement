import './dashboard.scss';
import Home from '../Home';
import { DashboardWarehouseStatus, DashboardVisitorStatus, DashboardVehicleInStatus, DashboardVehicleOutStatus, DashboardDieselLitreMonth, DashboardDieselAmountMonth, DashboardGeneratorInstanceMonth, DashboardGeneratorTotalUnitMonth } from '../../api/index'
import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';



const Dashboard = () => {
    const [warehouseStatus, setWarehouseStatus] = useState()
    const [visitorToday, setVisitorToday] = useState()
    const [visitorMonth, setVisitorMonth] = useState()
    const [vehicleInToday, setVehicleInToday] = useState()
    const [vehicleInMonth, setVehicleInMonth] = useState()
    const [vehicleOutToday, setVehicleOutToday] = useState()
    const [vehicleOutMonth, setVehicleOutMonth] = useState()
    const [dieselLitremonth, setDieselLitreMonth] = useState()
    const [dieselAmountmonth, setDieselAmountMonth] = useState()
    const [average, setAverage] = useState()
    const [generatorinstance, setGeneratorInstance] = useState()
    const [generatortotalunit, setGeneratorTotalUnit] = useState()



    useEffect(async () => {
        var myDate = new Date();
        var day = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var Today = year + "-" + month + "-" + day;
        const startDate = year + "-" + month + "-" + 1
        var lastdate = year + "-" + month + "-" + myDate.getDate(0)

        const GeneratorTotalUnitMonth = await DashboardGeneratorTotalUnitMonth(startDate, lastdate, localStorage.getItem('warehouseId'))
        setGeneratorTotalUnit(GeneratorTotalUnitMonth.Totalunit)

        const DieselLitre = await DashboardDieselLitreMonth(startDate, lastdate, localStorage.getItem('warehouseId'))
        setDieselLitreMonth(DieselLitre.Totalliters)

        const DieselAmount = await DashboardDieselAmountMonth(startDate, lastdate, localStorage.getItem('warehouseId'))
        setDieselAmountMonth(DieselAmount.TOTALAMNT)
        if (DieselAmount.TOTALAMNT === 0) {
            setAverage(0)
        } else {
            setAverage(DieselLitre.Totalliters / DieselAmount.TOTALAMNT)
        }

        const GeneratorInstance = await DashboardGeneratorInstanceMonth(startDate, lastdate, localStorage.getItem('warehouseId'))
        setGeneratorInstance(GeneratorInstance.Instance)

        const VehicleInstatusToday = await DashboardVehicleInStatus(Today, Today, localStorage.getItem('warehouseId'))
        setVehicleInToday(VehicleInstatusToday.Noofvehicle)

        const VehicleInstatusMonth = await DashboardVehicleInStatus(startDate, lastdate, localStorage.getItem('warehouseId'))
        setVehicleInMonth(VehicleInstatusMonth.Noofvehicle)

        const VehicleOutstatusToday = await DashboardVehicleOutStatus(Today, Today, localStorage.getItem('warehouseId'))
        setVehicleOutToday(VehicleOutstatusToday.Noofvehicle)

        const VehicleOutstatusMonth = await DashboardVehicleOutStatus(startDate, lastdate, localStorage.getItem('warehouseId'))
        setVehicleOutMonth(VehicleOutstatusMonth.Noofvehicle)

        const VisiltorToday = await DashboardVisitorStatus(Today, Today, localStorage.getItem('warehouseId'))
        setVisitorToday(VisiltorToday.Noofvisitor)


        const VisiltorMonth = await DashboardVisitorStatus(startDate, lastdate, localStorage.getItem('warehouseId'))
        setVisitorMonth(VisiltorMonth.Noofvisitor)

        const warehouselogs = await DashboardWarehouseStatus(Today, localStorage.getItem('warehouseId'))
        if (warehouselogs.msg_flag == "open") {
            setWarehouseStatus(' Warehouse Opened on ' + warehouselogs.Date + ' at ' + warehouselogs.openingat + 'AM')
        } else {
            setWarehouseStatus('Warehouse Closed on ' + warehouselogs.Date + ' at ' + warehouselogs.closegat + 'PM')
        }

    }, [])
    return (
        <>
            <div className="dashboardcont">

                <Home />
                <h1>Welcome to AWL India</h1>
                {/* <div
                    style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
                >
                    <div className="row mt-5 d-flex justify-content-center align-items-center" >
                        <div className="col-sm-3 mt-3 text-center p-1">
                            <div className="card "
                                style={{ height: "140px" }}
                            >
                                <div className="card-body d-flex justify-content-center p-4">
                                    <h5 className="card-title">{warehouseStatus}</h5> &nbsp;
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 mt-3 p-2" >
                            <div className="card" style={{ height: "140px" }}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Total Visitors (today) <span style={{ color: "red" }}>{visitorToday}</span></h5>
                                    <h5 className="card-title">Total Visitors (this month) <span style={{ color: "red" }}>{visitorMonth}</span></h5>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 mt-3 p-1">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Vehicles Entered (today) <span style={{ color: "red" }}>{vehicleInToday}</span></h5>
                                    <h5 className="card-title"> Vehicles Entered (this month) <span style={{ color: "red" }}>{vehicleInMonth}</span></h5>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 mt-3 p-1">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title"> Vehicles Moved Out (today) <span style={{ color: "red" }}>{vehicleOutToday}</span></h5>
                                    <h5 className="card-title">Vehicles Moved Out (this month) <span style={{ color: "red" }}>{vehicleOutMonth}</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5 mt-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Total Instance (this month) <span style={{ color: "red" }}>{generatorinstance}</span></h5>
                                    <h5 className="card-title">Total Running Hours (this month) <span style={{ color: "red" }}>{vehicleOutMonth}</span></h5>
                                    <h5 className="card-title">Total Units (this month) <span style={{ color: "red" }}>{generatortotalunit}</span></h5>
                                    <h5 className="card-title">Average Consumption <span style={{ color: "red" }}>{vehicleOutMonth}</span></h5>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5 mt-3 " >
                            <div className="card" style={{ height: "186px" }}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Total Litres Procured (this month) <span style={{ color: "red" }}>{dieselLitremonth}</span></h5>
                                    <h5 className="card-title">Total Amount <span style={{ color: "red" }}>{dieselAmountmonth}</span></h5>
                                    <h5 className="card-title">Average <span style={{ color: "red" }}>{average}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

            <Footer />
        </>
    )
}

export default Dashboard;
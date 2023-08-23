const sql = require('mssql')
const sqlConfig = require('../config.js')

const VehicleEntry = async (req, res) => {
    const docNo = req.body.docNo;
    const vehNo = req.body.vehNo;
    const vehType = req.body.vehType;
    const driverName = req.body.driverName;
    const contactNo = req.body.contactNo;
    const remarks = req.body.remarks;
    const wh = req.body.wh;
    const cust = req.body.cust;
    const entry_by = req.body.entry_by;
    const tpt_mode = req.body.tpt_mode;
    const inward_time = req.body.inward_time;
    const outward_Time = req.body.outward_Time;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into NEWAWLDB.dbo.tbl_vehicle_details(docNo,vehNo,vehType,driverName,
            contactNo,remarks,wh,cust,entry_by,entry_on,tpt_mode,MSGFLAG,VehInTime,VehOutTime) 
            values('${docNo}','${vehNo}','${vehType}','${driverName}','${contactNo}','${remarks}','${wh}','${cust}','${entry_by}',getdate(),'${tpt_mode}','','${inward_time}','${outward_Time}');`)
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { VehicleEntry }
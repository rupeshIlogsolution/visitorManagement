const sql = require('mssql')
const sqlConfig = require('../config.js')

const DedicatedVehicle = async (req, res) => {
    const wh = req.body.wh;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_DedicatedVehMaster where WH = '${wh}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const DedicatedVehicleStatus = async (req, res) => {
    const wh = req.body.wh;
    const VEH_NO = req.body.VEH_NO
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select Top 1 * from Tbl_dedicated_vehLog where WH = '${wh}' and VEH_NO = '${VEH_NO}' order by ID desc `)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const DedicatedVehicleOutStatus = async (req, res) => {
    const wh = req.body.wh;
    const VEH_NO = req.body.VEH_NO
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),TRANS_DATE,106) as date,convert(varchar, STARTTIME, 24) as time from Tbl_dedicated_vehLog where WH = '${wh}' and VEH_NO = '${VEH_NO}' and  STATUS='Out'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const InsertDedicatedVEhicle = async (req, res) => {
    const wh = req.body.wh;
    const VEH_NO = req.body.VEH_NO
    const TransDate = req.body.TransDate;
    const StartTime = req.body.StartTime;
    const StartReading = req.body.StartReading;
    const StartEntryBy = req.body.StartEntryBy;
    const remarks = req.body.remarks;
    const TouchPoint = req.body.TouchPoint;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into Tbl_dedicated_vehLog (WH,VEH_NO ,TRANS_DATE ,STARTTIME ,START_READING ,STARTENTRYON ,
            STARTENTRYBY ,REMARKS ,STATUS ,TOUCH_POINT )
            values ('${wh}','${VEH_NO}','${TransDate}','${StartTime}','${StartReading}',getDate(),'${StartEntryBy}','${remarks}','Out',${TouchPoint});`)
        res.send("inserted")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const UpdateDedicatedVEhicle = async (req, res) => {
    const wh = req.body.wh;
    const VEH_NO = req.body.VEH_NO
    const Returntime = req.body.Returntime;
    const Returnreading = req.body.Returnreading;
    const Returnentryby = req.body.Returnentryby;
    const remarks = req.body.remarks;
    const CompleteTouchPoint = req.body.CompleteTouchPoint;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update Tbl_dedicated_vehLog set RETURNTIME ='${Returntime}',RETURN_READING ='${Returnreading}',
         RETURNENTRYBY= '${Returnentryby}',RETURNENTRYON =GETDATE(),REMARKS='${remarks}',STATUS='In',COMPLETED_TOUCH_POINT='${CompleteTouchPoint}' where  WH ='${wh}' and VEH_NO ='${VEH_NO}' and STATUS ='Out'`)
        res.send("updated")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { DedicatedVehicle, DedicatedVehicleStatus, InsertDedicatedVEhicle, UpdateDedicatedVEhicle, DedicatedVehicleOutStatus }
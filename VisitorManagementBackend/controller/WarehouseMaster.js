const sql = require('mssql')
const sqlConfig = require('../config.js')

const Warehousecheckopen = async (req, res) => {
    const Warehouse = req.body.Warehouse;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT convert(varchar(15),date,121) as date from tbl_warehouselogs where warehouse_id='${Warehouse}' and msg_flag='open';`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const Warehouseopen = async (req, res) => {
    const entry_by = req.body.entry_by;
    const wharehouse = req.body.wharehouse;
    const date = req.body.date;
    const opening_time = req.body.opening_time;
    const opened_by = req.body.opened_by;
    const awl_person_open = req.body.awl_person_open;
    const remarks = req.body.remarks ? req.body.remarks : '';
    const warehouse_id = req.body.warehouse_id;
    const uploadimage = req.body.uploadimage;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_warehouselogs (entry_by,entry_date,
            warehouse,date,opening_time ,opened_by ,awl_person_open ,remarks ,msg_flag,warehouse_id,open_wh_image,close_wh_image,msgflag)
            values('${entry_by}',getDate(),'${wharehouse}','${date}','${opening_time}',
            '${opened_by}','${awl_person_open}','${remarks}','open','${warehouse_id}','${uploadimage}','','')`)
        res.send("success")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const Warehouseclose = async (req, res) => {
    const date = req.body.date
    const closing_time = req.body.closing_time;
    const closed_by = req.body.closed_by;
    const awl_person_close = req.body.awl_person_close;
    const wharehouse = req.body.wharehouse;
    const uploadimage = req.body.uploadimage;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_warehouselogs set closing_time='${closing_time}',
        closed_by='${closed_by}',awl_person_close='${awl_person_close}',msg_flag='close',close_wh_image='${uploadimage}' 
        WHERE warehouse_id='${wharehouse}' and msg_flag='open' and date='${date}'`)

        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const WarehouseLastclose = async (req, res) => {
    const Warehouse = req.body.Warehouse;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select top 1 * from tbl_warehouselogs where warehouse_id='${Warehouse}' order by sno desc `)
        res.send(result.recordset[0].date)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { Warehousecheckopen, Warehouseopen, Warehouseclose, WarehouseLastclose }

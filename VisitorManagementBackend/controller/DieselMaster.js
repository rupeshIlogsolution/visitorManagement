const sql = require('mssql')
const sqlConfig = require('../config.js')

const DieselEntry = async (req, res) => {
    const entry_by = req.body.entry_by;
    const warehouse = req.body.warehouse;
    const DATE = req.body.DATE;
    const invoice_no = req.body.invoice_no;
    const party_name = req.body.party_name;
    const qtyin_liter = req.body.qtyin_liter;
    const rate_per_liter = req.body.rate_per_liter;
    const person_name = req.body.person_name;
    const out_time = req.body.out_time;
    const in_time = req.body.in_time;
    const TotalAmount = req.body.TotalAmount;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_diesellogs (entry_by ,entry_date ,warehouse,date,invoice_no,
            party_name,qtyin_liter,rate_per_liter,person_name,out_time,in_time,msgflag,invvalue)
            values('${entry_by}',getDate(),'${warehouse}','${DATE}','${invoice_no}','${party_name}',${qtyin_liter},${rate_per_liter},'${person_name}','${out_time}','${in_time}','1',${TotalAmount})`)
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { DieselEntry }
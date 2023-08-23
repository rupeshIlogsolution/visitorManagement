const sql = require('mssql')
const sqlConfig = require('../config.js')

const GeneratorEntry = async (req, res) => {
    const entry_by = req.body.entry_by;
    const warehouse = req.body.warehouse;
    const DATE = req.body.DATE;
    const StartTime = req.body.StartTime;
    const StartReading = req.body.StartReading;
    const EndTime = req.body.EndTime;
    const EndReading = req.body.EndReading
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`
        insert into tbl_generatorlogs (entry_by,entry_date,warehouse,date,start_time,start_reading,
        end_time,end_reading,msg_flag) values('${entry_by}',getDate(),'${warehouse}','${DATE}','${StartTime}',${StartReading},'${EndTime}',${EndReading},'1')`)
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { GeneratorEntry }
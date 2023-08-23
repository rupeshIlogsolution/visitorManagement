const sqlConfig = require('../../config');
const sql = require("mssql")

async function InsertGuardLogin(req, res) {
    const Location = req.body.Location;
    const Guardname = req.body.Guardname;
    const date = req.body.date;
    const time = req.body.time;
    const status = req.body.status;
    const guardid = req.body.guardid;
    const userid = req.body.userid;
    const locationname = req.body.locationname;

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`insert into NEWAWLDB.dbo.tbl_guardlogs (Guardid,Logindate,LoginTime,EntryBy,whid,Entrydate,Status,guardname,locationname) 
     values('${guardid}','${date}','${time}','${userid}','${Location}',getdate(),'${status}','${Guardname}','${locationname}')`)

        const updateStatus = await pool.query(`update NEWAWLDB.dbo.tbl_guardmaster set Guard_status='${status}' where Guardid = '${guardid}'`)
        await pool.close()
        res.send('Added')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function UpdateGuard(req, res) {
    const Location = req.body.Location;
    const Guardname = req.body.Guardname;
    const date = req.body.date;
    const time = req.body.time;
    const status = req.body.status;
    const guardid = req.body.guardid;
    const userid = req.body.userid;

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`update  NEWAWLDB.dbo.tbl_guardlogs set Logoutdate='${date}',Logouttime = '${time}',Status='${status}' where Guardid='${guardid}'`)

        const updateStatus = await pool.query(`update NEWAWLDB.dbo.tbl_guardmaster set Guard_status='${status}' where Guardid = '${guardid}'`)
        await pool.close()
        res.send('Updated')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function GetguardmasterLogin(req, res) {
    const warehouse_id = req.body.warehouse_id;

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select *, convert(varchar(15),Logindate,23) as date from tbl_guardlogs where Status ='Login' and whid ='${warehouse_id}' `)
        await pool.close()
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

// async function

module.exports = { InsertGuardLogin, GetguardmasterLogin, UpdateGuard }
const sqlConfig = require('../../config');
const sql = require("mssql")

async function InsertGuard(req, res) {
    const Location = req.body.location;
    const Guardname = req.body.Guardname;
    const Guardid = req.body.Guardid;
    const Phoneno = req.body.Phoneno;
    const vendorid = req.body.vendorid;
    const vendorname = req.body.vendorname;
    const Guardjoiningdate = req.body.Guardjoiningdate;
    const LocationName = req.body.LocationName;
    const DateOfBirth = req.body.DateOfBirth;
    const Shift = req.body.Shift;

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`insert into NEWAWLDB.dbo.tbl_guardmaster (Location,Guardname,Guardid,Phoneno,vendorid,vendorname,Status,Guardjoiningdate,entrydate,entryby,Guard_status,locationname,DateOfBirth,Shift) 
      values('${Location}','${Guardname}','${Guardid}',${Phoneno},'${vendorid}','${vendorname}','Active','${Guardjoiningdate}',getdate(),'amn01','newjoin','${LocationName}','${DateOfBirth}','${Shift}')`)
        await pool.close()
        res.send('Added')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function TotalGuards(req, res) {

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select * from NEWAWLDB.dbo.tbl_guardmaster order by Location `)
        await pool.close()
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}
async function SelectedGuards(req, res) {
    const sno = req.body.sno;

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select *,convert(varchar(15),Guardjoiningdate,121) as Joindate,convert(varchar(15),DateOfBirth,121) as dateofbirth from NEWAWLDB.dbo.tbl_guardmaster where ID = '${sno}'`)
        await pool.close()
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function DeactiveGuards(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`update NEWAWLDB.dbo.tbl_guardmaster set Status='${status}'where ID = ${sno}`)
        await pool.close()
        res.send('done')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function ActiveLocation(req, res) {
    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select WHid,WHname  from tbl_whmaster where whactive=1 order by WHname`)
        await pool.close()
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function Updateguardmaster(req, res) {
    const status = req.body.status;
    const guardId = req.body.guardId;
    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`update tbl_whmaster set Guard_status='${status}' where Guardid='${guardId}'`)
        await pool.close()
        res.send('Updated')
    }
    catch (err) {
        res.status(500).send(err);
    }
}

async function GetguardmasterLogout(req, res) {
    const warehouse_id = req.body.warehouse_id;
    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select * from tbl_guardmaster where Status = 'Active'  and (Guard_status ='Logout'  or Guard_status ='newjoin' ) and  Location ='${warehouse_id}'`)
        await pool.close()
        res.send(result.recordset)

    }
    catch (err) {
        res.status(500).send(err)
    }
}
async function GetguardmasterLogin(req, res) {

    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select *,convert(varchar(15),Guardjoiningdate,23) as Logindate from tbl_guardmaster where Status = 'Active' and  Guard_status ='Login'`)
        await pool.close()
        res.send(result.recordset)

    }
    catch (err) {
        res.status(500).send(err)
    }
}

const updateGuardDetails = async (req, res) => {
    const sno = req.body.sno;
    const Guardname = req.body.Guardname;
    const Phoneno = req.body.Phoneno;
    const Guardjoiningdate = req.body.Guardjoiningdate;
    const DateOfBirth = req.body.DateOfBirth;
    const Shift = req.body.Shift;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_guardmaster set Guardname='${Guardname}',Phoneno='${Phoneno}'
        ,Guardjoiningdate ='${Guardjoiningdate}',DateOfBirth='${DateOfBirth}',Shift='${Shift}' where ID = ${sno}`)
        res.status(200).send("Updated")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { InsertGuard, TotalGuards, DeactiveGuards, ActiveLocation, Updateguardmaster, GetguardmasterLogout, GetguardmasterLogin, SelectedGuards, updateGuardDetails }
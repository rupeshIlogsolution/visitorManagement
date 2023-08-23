const sqlConfig = require('../../config');
const sql = require("mssql")

async function TotalGuardsHistory (req,res){
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`select tbl_guardlogs.*,tbl_guardmaster.Shift ,convert(varchar(15),logindate,105)  as LoginDate,convert(varchar,LoginTime,8)  as timeLogin,convert(varchar(15),Logoutdate,105)  as LogOutDate,convert(varchar,Logouttime,8)  as timeLoginout  from NEWAWLDB.dbo.tbl_guardlogs
        join tbl_guardmaster on tbl_guardmaster.Guardid = tbl_guardlogs.Guardid 
        where  convert(date,logindate) between  '${startDate}' and '${endDate}'`)
        await pool.close() 
        res.send(result.recordset)
    }
    catch (err){
        res.status(500).send(err)
    }
}

module.exports={TotalGuardsHistory}
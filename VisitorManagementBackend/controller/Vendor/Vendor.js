const sqlConfig = require('../../config');
const sql = require("mssql")

async function TotalVendor (req,res){

    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.query(`SELECT  Tid,Tname  from tbl_transporter tt WHERE Tactive =1`)
        await pool.close() 
        res.send(result.recordset)
    }
    catch (err){
        res.status(500).send(err)
    }
}

module.exports={TotalVendor}
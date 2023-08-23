const sql = require('mssql')
const sqlConfig2 = require('../config2')

const Allemployee = async (req, res) => {
    const Warehouse = req.body.Warehouse;
    try {
        const pool = new sql.ConnectionPool(sqlConfig2);
        await pool.connect();
        const result = await pool.query(`select UserID,um.[Name],[RGID],[OfficeEmail],[PERSMOBILE],[DSGID],BRCCODE 
       from COSEC.dbo.Mx_UserMst um with (nolock) left join COSEC.dbo.Mx_BranchMst br with (nolock) on um.BRCID=br.BRCID 
       where  isnull(userid ,'')<>'' and  BRCCODE='${Warehouse}' and 
       UserIDEnbl=1 and (DSGID not in(24,22,21,20,19,11,25,28,29,31,32,33) or (CTGID=3)) order by Name`)
        await pool.close()
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const EmployeeAlerts = async (req, res) => {
    const Warehouse = req.body.Warehouse;
    const UserID = req.body.UserID;

    try {
        const pool = new sql.ConnectionPool(sqlConfig2);
        await pool.connect();
        const result = await pool.query(`select UserID,um.[Name],[RGID],[OfficeEmail],[PERSMOBILE],[DSGID],BRCCODE 
       from COSEC.dbo.Mx_UserMst um with (nolock) left join COSEC.dbo.Mx_BranchMst br with (nolock) on um.BRCID=br.BRCID 
       where  isnull(userid ,'')<>'' and  BRCCODE='${Warehouse}' and 
       UserIDEnbl=1 and (DSGID not in(24,22,21,20,19,11,25,28,29,31,32,33) or (CTGID=3)) and UserID='${UserID}'`)
        await pool.close()
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports = { Allemployee, EmployeeAlerts }
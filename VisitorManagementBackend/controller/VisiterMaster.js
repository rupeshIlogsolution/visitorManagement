const sql = require('mssql')
const sqlConfig = require('../config.js')

const VisiterEntry = async (req, res) => {
    const entry_by = req.body.entry_by;
    const wharehouse = req.body.wharehouse;
    const visitor_name = req.body.visitor_name;
    const company_name = req.body.company_name;
    const email_id = req.body.email_id;
    const no_of_visitor = req.body.no_of_visitor;
    const meeting_with = req.body.meeting_with;
    const contact_no = req.body.contact_no;
    const remark = req.body.remark;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_visitor_entry (entry_no,visitor_name,company_name,email_id,no_of_visitor,meeting_with,
            contact_no,remark,warehouse,entry_by,entry_date,msgflag)
            values ('','${visitor_name}','${company_name}','${email_id}',${no_of_visitor},'${meeting_with}',${contact_no},'${remark}','${wharehouse}','${entry_by}',getDate(),
            '1');`)
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}


// const Allemployee = async (req, res) => {
//      const Warehouse = req.body.Warehouse;
//     try{
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`select uName from User_Rights WHERE uWH='${Warehouse}'`)
//         res.send(result.recordset)
//     }
//     catch(err){
//         res.status(500).send(err)
//         }
// }

module.exports = { VisiterEntry }
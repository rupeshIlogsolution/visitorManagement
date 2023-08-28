const sql = require('mssql')
const sqlConfig = require('../config.js')
const jwt = require("jsonwebtoken")

const UserLogin = async (req, res) => {
    const uid_id = req.body.uid_id;
    const uid_pass = req.body.uid_pass;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from Visitor_login where  uid_id='${uid_id}' and uid_pass='${uid_pass}'`)
        const token = jwt.sign({ uid_id, uid_pass }, '08be12b1193279994c8278770b3e6776d9ddc2c7d013f6d60713309ae6e3d12377739ba6db6852434ac905e85ccdf215b1229186f96692fdb2b1d68cd572d429')
        
        res.status(200).send({
            status: "Success",
            //       token: token,
            result: result.recordset[0].uid_id,
            result2: result.recordset[0].uname,
            result3: result.recordset[0].wh,
            result4: result.recordset[0].whid,
            // expiresIn: 5 * 24 * 60 * 60
        })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { UserLogin }

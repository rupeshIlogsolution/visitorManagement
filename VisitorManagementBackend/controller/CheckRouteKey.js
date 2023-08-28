const QRCode = require('qrcode')


// const CheckRouteKey = (req, res) => {
//     const uuid = req.body.uuid;
//     console.log(uuid)
//     if (uuid === uuidKey) {
//         res.status(200).json({ message: "Verify" })
//     }
//     else {
//         res.status(404).json({ message: "not found" })
//     }
// }

const GenerateQR = async (req, res) => {
    const whid= req.body.whid;
    try {
        const qrcode = await QRCode.toDataURL(`https://visitormanagement.awlinternational.com/visitorentry/${whid}`)
        res.status(200).send(qrcode)
    }
    catch {
        res.status(500).json({ message: 'Server Not response' })
    }
}

// const GenerateUuid = async (req, res) => {
//     try {
//         uuidKey = await uuid();
//         console.log(uuidKey)
//     }
//     catch {
//         res.status(500).json({ message: "Server Not response" })
//     }
// }

module.exports = { GenerateQR }
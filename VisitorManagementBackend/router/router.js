const express = require('express');
const router = express.Router();

const GeneratorController = require('../controller/GeneratorMaster')
const DieselController = require('../controller/DieselMaster')
const VisiterController = require('../controller/VisiterMaster')
const LoginController = require('../controller/LoginMaster')
const WarehouseController = require('../controller/WarehouseMaster')
const EmployeeController = require('../controller/Employdetails')
const VehicleController = require('../controller/VehicleEntry')
const FileUpload = require('../controller/FileUpload')
const Multer = require('../Middleware/multer')
const GuardMasterController = require('../controller/Guards/guardmaster')
const GuardsLogsController = require('../controller/Guards/GuardsLogs')
const VendorController = require('../controller/Vendor/Vendor')
const GuardHistoryController = require('../controller/Guards/GuardHistory')
const VehicleMasterController = require('../controller/VehicleMaster')


router.post('/generatorentry', GeneratorController.GeneratorEntry)
router.post('/dieselentry', DieselController.DieselEntry)
router.post('/visiterentry', VisiterController.VisiterEntry)
router.post('/loginuser', LoginController.UserLogin)
router.post('/warehousecheckopen', WarehouseController.Warehousecheckopen)
router.post('/warehouseopen', WarehouseController.Warehouseopen)
router.post('/warehouseclose', WarehouseController.Warehouseclose)
router.post('/warehouseLastclose', WarehouseController.WarehouseLastclose)


router.post('/employeeDetails', EmployeeController.EmployeeAlerts)
router.post('/allemployee', EmployeeController.Allemployee)
router.post('/vehicleentry', VehicleController.VehicleEntry)

router.post('/FileUpload', Multer, FileUpload)

router.post('/insertguard', GuardMasterController.InsertGuard)
router.post('/SelectedGuards', GuardMasterController.SelectedGuards)
router.post('/updateGuardDetails', GuardMasterController.updateGuardDetails)


router.post('/totalguard', GuardMasterController.TotalGuards)
router.post('/deactiveguards', GuardMasterController.DeactiveGuards)
router.post('/activelocation', GuardMasterController.ActiveLocation)
router.post('/getguardmasterlogout', GuardMasterController.GetguardmasterLogout)

router.post('/insertGuardLogin', GuardsLogsController.InsertGuardLogin)
router.post('/getguardmasterlogin', GuardsLogsController.GetguardmasterLogin)
router.post('/updateguard', GuardsLogsController.UpdateGuard)

router.post('/TotalVendor', VendorController.TotalVendor)

router.post('/totalguardshistory', GuardHistoryController.TotalGuardsHistory)
router.post('/dedicatedvehicle', VehicleMasterController.DedicatedVehicle)
router.post('/dedicatedvehiclestatus', VehicleMasterController.DedicatedVehicleStatus)
router.post('/insertdedicatedVEhicle', VehicleMasterController.InsertDedicatedVEhicle)
router.post('/dedicatedvehicleoutstatus', VehicleMasterController.DedicatedVehicleOutStatus)
router.post('/updatededicatedVEhicle', VehicleMasterController.UpdateDedicatedVEhicle)








module.exports = router

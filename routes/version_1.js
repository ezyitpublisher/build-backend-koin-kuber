"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version_1 = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
const router = express_1.default.Router(); // Initialize the Express router
// @controllers
const taskControllers_1 = require("../controllers/v1/taskControllers"); // Import the controller for handling task-related requests
const paymentWithdrawControllers_1 = require("../controllers/v1/paymentWithdrawControllers"); // Import the controller for storing shipping addresses
const whatsappTxtControllers_1 = require("../controllers/v1/whatsappTxtControllers"); // Import the controller for handling WhatsApp text-related requests
const termsConditionsControllers_1 = require("../controllers/v1/termsConditionsControllers"); // Import the controller for handling terms and conditions-related requests
// Ensure the directory exists for banners and WhatsApp uploads
let bannUploadDir = path_1.default.join(__dirname, '../public/uploads/banners'); // Set the directory path for banner uploads
let wpUploadDir = path_1.default.join(__dirname, '../public/uploads/whatsapp'); // Set the directory path for WhatsApp uploads
// // Create directories if they don't exist
// if (!fs.existsSync(bannUploadDir)) {
//   fs.mkdirSync(bannUploadDir, { recursive: true }); // Create the banner upload directory if it doesn't exist
// } else if (!fs.existsSync(wpUploadDir)) {
//   fs.mkdirSync(wpUploadDir, { recursive: true }); // Create the WhatsApp upload directory if it doesn't exist
// }
// Configure storage options for multer (file upload handling)
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination directory based on the file field name
        if (file.fieldname == 'banner') {
            cb(null, bannUploadDir);
        }
        else if (file.fieldname == 'imageandvideo') {
            cb(null, wpUploadDir);
        }
    },
    filename: function (req, file, cb) {
        // Generate a unique filename with a timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let mimetype = file.mimetype.split('/');
        // Set the file name based on the field name and its MIME type
        if (file.fieldname == 'banner') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mimetype[1]);
        }
        else if (file.fieldname == 'imageandvideo') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mimetype[1]);
        }
    }
});
// Initialize multer with the specified storage configuration
const upload = (0, multer_1.default)({ storage: storage });
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" }); // Render the home page with a title
});
// Task routes
router.get("/get-task", taskControllers_1.getTask); // Route to get tasks
// WhatsApp Text routes
router.get("/get-whatsapp-text", whatsappTxtControllers_1.getWhatsappTxt); // Route to get WhatsApp texts
// Terms and Conditions routes
router.get("/terms-and-conditions", termsConditionsControllers_1.getTermsAndConditions); // Route to get terms and conditions
// User routes
router.post("/add-user", paymentWithdrawControllers_1.storePaymentWithdraw); // Route to add a shipping address
// Winner Users routes
router.get("/winner-users", paymentWithdrawControllers_1.winnerUsers); // Route to add a shipping address
let version_1 = router; // Assign the router to the variable version_1
exports.version_1 = version_1;
//# sourceMappingURL=version_1.js.map
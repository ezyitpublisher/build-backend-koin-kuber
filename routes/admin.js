"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
const router = express_1.default.Router();
// @middleware
const authentication_1 = require("../middleware/authentication"); // Middleware for admin authentication
// @controllers
const authController_1 = require("../controllers/admin/authController"); // Controllers for authentication
const taskControllers_1 = require("../controllers/admin/taskControllers"); // Controllers for managing tasks
const paymentWithdrawControllers_1 = require("../controllers/admin/paymentWithdrawControllers"); // Controllers for managing shipping addresses
const whatsappTxtControllers_1 = require("../controllers/admin/whatsappTxtControllers"); // Controllers for managing WhatsApp text
const termsConditionsControllers_1 = require("../controllers/admin/termsConditionsControllers"); // Controllers for managing terms and conditions
// Ensure the directory exists for banners, WhatsApp, phones, and notifications uploads
let wpUploadDir = path_1.default.join(__dirname, '../public/uploads/whatsapp');
let notificationUploadDir = path_1.default.join(__dirname, '../public/uploads/notifications');
// Create directories if they don't exist
if (!fs_1.default.existsSync(wpUploadDir)) {
    fs_1.default.mkdirSync(wpUploadDir, { recursive: true });
}
else if (!fs_1.default.existsSync(notificationUploadDir)) {
    fs_1.default.mkdirSync(notificationUploadDir, { recursive: true });
}
// Configure storage options for multer (file upload handling)
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination directory based on the file field name
        if (file.fieldname == 'imageandvideo') {
            cb(null, wpUploadDir);
        }
        else if (file.fieldname == 'notify_img') {
            cb(null, notificationUploadDir);
        }
    },
    filename: function (req, file, cb) {
        // Generate a unique filename with a timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let mimetype = file.mimetype.split('/');
        // Set the file name based on the field name and its MIME type
        if (file.fieldname == 'imageandvideo') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mimetype[1]);
        }
        else if (file.fieldname == 'notify_img') {
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
// Auth routes
router.post("/sign-up", authController_1.signUp); // Route for signing up an admin
router.post("/sign-in", authController_1.signIn); // Route for signing in an admin
router.post("/change-password", authentication_1.AdminAuth, authController_1.changePassword); // Route for changing admin password, protected by AdminAuth
// Get Admin Info
router.get("/get-admin", authentication_1.AdminAuth, authController_1.admininfo); // Route for getting admin info, protected by AdminAuth
router.get("/get-dashboard", authentication_1.AdminAuth, authController_1.dashboardInfo); // Route for Getting .
// Task routes
router.get("/get-task", authentication_1.AdminAuth, taskControllers_1.getTask); // Route to get tasks, protected by AdminAuth
router.post("/add-task", authentication_1.AdminAuth, taskControllers_1.addEditTask); // Route to add a task, protected by AdminAuth
router.post("/edit-task", authentication_1.AdminAuth, taskControllers_1.addEditTask); // Route to edit a task, protected by AdminAuth
router.post("/status-task", authentication_1.AdminAuth, taskControllers_1.addEditTask); // Route to change task status, protected by AdminAuth
router.get("/delete-task", authentication_1.AdminAuth, taskControllers_1.deleteTask); // Route to delete a task, protected by AdminAuth
// WhatsApp Text routes
router.get("/get-whatsapp-text", authentication_1.AdminAuth, whatsappTxtControllers_1.getWhatsappTxt); // Route to get WhatsApp texts, protected by AdminAuth
router.post("/add-whatsapp-text", authentication_1.AdminAuth, upload.single('imageandvideo'), whatsappTxtControllers_1.addEditWhatsappTxt); // Route to add WhatsApp text with single file upload, protected by AdminAuth
router.post("/edit-whatsapp-text", authentication_1.AdminAuth, upload.single('imageandvideo'), whatsappTxtControllers_1.addEditWhatsappTxt); // Route to edit WhatsApp text with single file upload, protected by AdminAuth
router.post("/status-whatsapp-text", authentication_1.AdminAuth, whatsappTxtControllers_1.addEditWhatsappTxt); // Route to change WhatsApp text status, protected by AdminAuth
router.get("/delete-whatsapp-text", authentication_1.AdminAuth, whatsappTxtControllers_1.deleteWhatsappTxt); // Route to delete WhatsApp text, protected by AdminAuth
// Shipping Address routes
router.get("/users", authentication_1.AdminAuth, paymentWithdrawControllers_1.getPaymentWithdraw); // Route to get shipping addresses, protected by AdminAuth
router.post("/winner-user", authentication_1.AdminAuth, paymentWithdrawControllers_1.winnersAnnouncement);
router.get("/export-users", authentication_1.AdminAuth, paymentWithdrawControllers_1.exportPaymentWithdraw); // Route to export shipping addresses, protected by AdminAuth
// Terms & Conditions routes
router.get("/terms-and-conditions", authentication_1.AdminAuth, termsConditionsControllers_1.getTermsAndConditions); // Route to get terms and conditions, protected by AdminAuth
router.post("/add-terms-and-conditions", authentication_1.AdminAuth, termsConditionsControllers_1.addEditTermsConditions); // Route to add or edit terms and conditions, protected by AdminAuth
// Notification routes
// router.get("/notification", AdminAuth, getNotifications); // Route to get notifications, protected by AdminAuth
// router.post("/send-notification", AdminAuth, upload.single('notify_img'), sendNotification); // Route to send notification with single file upload, protected by AdminAuth
// router.get("/delete-notification", AdminAuth, deleteNotification); // Route to delete a notification, protected by AdminAuth
let adminRouter = router; // Assign router to adminRouter variable
exports.adminRouter = adminRouter;
//# sourceMappingURL=admin.js.map
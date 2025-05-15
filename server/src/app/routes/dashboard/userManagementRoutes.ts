import express from "express";
import { verifyAdminToken } from "../../utils/utils";
import { getAllUsers, updateUserStatus, updateUserRole, deleteUser } from "../../controllers/dashboard/userManagement";

const userManagementRoutes = express.Router();

userManagementRoutes.get("/all-users", verifyAdminToken, getAllUsers);
userManagementRoutes.patch("/update-user-status/:userId", verifyAdminToken, updateUserStatus);
userManagementRoutes.patch("/update-user-role/:userId", verifyAdminToken, updateUserRole);
userManagementRoutes.delete("/delete-user/:userId", verifyAdminToken, deleteUser);

export default userManagementRoutes;

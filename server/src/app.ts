import express, { Application,NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./app/routes/user";
import videoRoutes from "./app/routes/video";
import authRoutes from "./app/routes/auth";
import cors from "cors";
import { response } from "./app/utils/utils";
import cookieParser from "cookie-parser";
import userDashboardRoutes from "./app/routes/dashboard/userDashboardRoutes";
import adminDashboardRoutes from "./app/routes/dashboard/adminDashboardRoutes";
import userManagementRoutes from "./app/routes/dashboard/userManagementRoutes";
import reportRoutes from "./app/routes/report";
dotenv.config();

const app:Application = express();


const corsConfig = {
  origin: [`${process.env.CLIENT_URL}`,"http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the API",
    });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dashboard/user", userDashboardRoutes);
app.use("/api/v1/dashboard/admin", adminDashboardRoutes);
app.use("/api/v1/dashboard/admin/users", userManagementRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    response(res, 500, false, `${err.message}` || "Something went wrong");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  response(res, 500, false, `${err.message}` || "Something went wrong");
});

export default app;

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import sequelize from "./configs/database.config";
import cookieParser from "cookie-parser";
import rootRoute from "./routes/index.route";
import {PORT} from "./configs/constants.config";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).send({
        message: "Something went wrong"
    });
});

// Initialize Sequelize
sequelize
    .authenticate()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Unable to connect to the database', err));

// Define your routes and middleware here
app.use("/api/v1", rootRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

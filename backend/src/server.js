import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import logger from "./middlewares/logger.js";
import jsonValidator from "./middlewares/jsonValidator.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(jsonValidator);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "EduNode - School Management System",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/students", studentRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`EduNode API running on http://localhost:${PORT}`);
});

import express from "express";
import Postrouter from "../api/routes/post.js";
import Authrouter from "../api/routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", Authrouter);
app.use("/api/posts", Postrouter);

app.listen(8800, () => {
  console.log("connected");
});

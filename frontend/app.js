import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { postRequest } from "./helpers/utils.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  session({
    secret: "secret-key-flask-nodejs",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || "8000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
// Middleware to parse form body (urlencoded)
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("Health is good");
});

app.get("/form", (req, res) => {
  const { name, age, error, success } = req.session.formData || {
    name: "",
    age: "",
    error: {},
  };

  // Clear after using
  req.session.formData = null;
  res.render("form", { name, age, error, success });
});

app.post("/submit", async (req, res) => {
  const { name, age } = req.body;
  let error = {};

  if (!name || name.trim() === "") {
    error["name"] = "Please enter name";
  }

  if (!age || age <= 0) {
    error["age"] = "Please enter valid age";
  }

  if (Object.keys(error).length > 0) {
    req.session.formData = { name, age, error };
    return res.redirect("/form");
  }
  const data = await postRequest(BACKEND_URL + "/api/submit", {
    name: name,
    age: age,
  });
  if (data.message == "success") {
    const success = "New User Created successfully";
    req.session.formData = { success };
    return res.redirect("/form");
  }
  error["error"] = data.error || "Unexpected error";
  req.session.formData = { name, age, error };
  return res.redirect("/form");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${FRONTEND_URL}/health`);
});

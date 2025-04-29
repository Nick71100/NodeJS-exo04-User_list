import express from "express";
import path from "path";
import session from "express-session";
import router from "./router/index.routes.js";

const app = express();

let currentUser = null;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = currentUser;
  next();
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;

  if (userName === user.userName && password === user.password) {
    currentUser = { userName };
    res.redirect("/");
  } else {
    res.render("sign-in", { error: "!! Identifiants invalides !!" });
  }
});

app.get("/logout", (req, res) => {
  currentUser = null;
  res.redirect("/");
});

app.use(router);

export default app;

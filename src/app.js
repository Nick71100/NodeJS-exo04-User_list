import express from "express";
import path from "path";
import session from "express-session";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views", "pages"));

app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = currentUser;
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/sign-in", (req, res) => {
  res.render("sign-in", { error: null });
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

export default app;

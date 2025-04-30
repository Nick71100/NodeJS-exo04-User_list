import express from "express";
import path from "path";
import router from "./router/index.routes.js";
import jsonfile from "jsonfile";

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

app.post("/sign-in", (req, res) => {
  const { name, password } = req.body;
  const file = path.join(process.cwd(), "src", "data", "users.json");

  jsonfile.readFile(file, (err, users) => {
    if (err) {
      return res.status(500).send("Erreur serveur");
    }
    const user = users.find((u) => u.name === name && u.password === password);

    if (user) {
      currentUser = { name };
      res.redirect("/");
    } else {
      res.render("login", { error: "Identifiants invalides." });
    }
  });
});

app.get("/logout", (req, res) => {
  currentUser = null;
  res.redirect("/");
});

app.use(router);

export default app;

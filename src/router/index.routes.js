import { Router } from "express";
import path from "path";
import jsonfile from "jsonfile";

const router = Router();
const file = path.join(process.cwd(), "src", "data", "users.json");

router.get("/", (req, res) => {
  const file = path.join(process.cwd(), "./src/data/users.json");
  const users = jsonfile.readFileSync(file);
  res.render("layout/template", { file: "home", users });
});

router.get("/authentication/dashboard", (req, res) => {
  res.render("layout/template", { file: "dashboard" });
});

router.get("/authentication/sign-in", (req, res) => {
  res.render("layout/template", { file: "sign-in", error: null });
});

router.get("/authentication/sign-out", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/authentication/sign-in");
});

router.get("/authentication/sign-up", (req, res) => {
  res.render("layout/template", { file: "sign-up" });
});

router.post("/authentication/sign-in", (req, res) => {
  const { name, password } = req.body;
  const users = jsonfile.readFileSync(file);
  const user = users.find(
    (user) => user.name === name && user.password === password
  );

  if (user) {
    req.session.user = {
      name: user.name,
    };
    res.redirect("/");
  } else {
    res.status(401).render("layout/template", {
      file: "sign-in",
      error: "Identifiants invalides !",
    });
  }
});

router.post("/authentication/sign-up", (req, res) => {
  const { name, password, age, poste } = req.body;
  const users = jsonfile.readFileSync(file);

  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    const params = new URLSearchParams({ error: "Nom déjà utilisé" });
    res.redirect("/authentication/sign-up?" + params.toString());
    return;
  }

  const newUser = {
    id: users.length + 1,
    name: name,
    password,
    age: age,
    poste: poste,
  };

  users.push(newUser);
  jsonfile.writeFileSync(file, users, { spaces: 4, EOL: "\r\n" });

  res.redirect("/authentication/sign-in");
});

router.get("/*splat", (req, res) => {
  res.send("<h1>not found</h1>");
});

export default router;

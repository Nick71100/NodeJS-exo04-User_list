import { Router } from "express";
import path from "path";
import jsonfile from "jsonfile";

const router = Router();

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

router.post("/authentication/sign-in", (req, res) => {
  const { name, password } = req.body;
  const file = path.join(process.cwd(), "src", "data", "users.json");
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

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

router.get("/*splat", (req, res) => {
  res.send("<h1>not found</h1>");
});

export default router;

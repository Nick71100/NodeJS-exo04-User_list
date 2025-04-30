import { Router } from "express";
import path from "path";
import jsonfile from "jsonfile";

const router = Router();

router.get("/", (req, res) => {
  const file = path.join(process.cwd(), "./src/data/users.json");
  const users = jsonfile.readFileSync(file);
  res.render("layout/template", { file: "home", users });
});

router.get("/dashboard", (req, res) => {
  res.render("layout/template", { file: "dashboard" });
});

router.get("/sign-in", (req, res) => {
  res.render("layout/template", { file: "sign-in" });
});

router.get("/logout", (req, res) => {
  currentUser = null;
  res.redirect("/");
});

router.get("/*splat", (req, res) => {
  res.send("<h1>not found</h1>");
});

router.post("/sign-in", (req, res) => {
  const file = path.join(process.cwd(), "./src/data/users.json");
  const user = jsonfile.readFileSync(file);
  const { userName, password } = req.body;

  if (userName === user.name && password === user.password) {
    currentUser = { userName };
    res.redirect("/");
  } else {
    res.render(
      "layout/template",
      { file: "sign-in" },
      { error: "!! Identifiants invalides !!" }
    );
  }
});

export default router;

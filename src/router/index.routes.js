import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("layout/template", { file: "home" });
});

router.get("/authentication/sign-in", (req, res) => {
  res.render("layout/template", { file: "sign-in" });
});

router.get("/authentication/sign-out", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/authentication/sign-in");
});

router.get("/*splat", (req, res) => {
  res.send("<h1>not found</h1>");
});

export default router;

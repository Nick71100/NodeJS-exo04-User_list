import express from "express";
import path from "path";
import session from "express-session";
import router from "./router/index.routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  res.locals.error = req.query.error || null;
  next();
});

app.use(router);

export default app;

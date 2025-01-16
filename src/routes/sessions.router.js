import { Router } from "express";
import passport from "passport";
import { authorization, passportCall, generateJWToken } from "../utils.js";
import {
  githubLogin,
  loginUser,
  logoutUser,
  registerUser,
  renderProfile,
  renderModificarPass,
  mailDeModificarPass,
  renderCambioDePass,
  cambioDePass,
  changeToPremium,
  renderChangeToPremium,
} from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/fail-register",
  }),
  registerUser
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "api/sessions/fail-login",
  }),
  loginUser
);

router.post("/logout", logoutUser);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  githubLogin
);

router.get("/fail-register", (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ error: "Failed to process login!" });
});

router.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

router.get("/modificarpass", renderModificarPass);

router.post("/modificarpass", mailDeModificarPass);

router.get("/cambiodepass", passportCall("jwt"), renderCambioDePass)

router.post("/cambiodepass", passportCall("jwt"), cambioDePass)

router.get("/profile", passportCall("jwt"), renderProfile);

router.get("/changetopremium", renderChangeToPremium)

router.put("/changetopremium", changeToPremium)

router.get("/github/login", (req, res) => {
  res.render("githubLogin");
});

router.get("/github/error", (req, res) => {
  res.render("error", { error: "No se pudo autenticar usando GitHub!" });
});

export default router;

import { Router } from "express";
import { deleteInactiveUsers, getAllUsers } from "../controllers/sessions.controller.js";
import { authorization, passportCall } from "../utils.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/premium/:uid",  (req, res) => {
  res.render("isItPremium")
})

router.get("/:uid", (req, res) => {
  res.render("isItPremium")
})

router.get("/",passportCall("jwt"), authorization("admin"), getAllUsers)

router.delete("/inactive",passportCall("jwt"), authorization("admin"), deleteInactiveUsers)

router.delete("/:uid", )

export default router;

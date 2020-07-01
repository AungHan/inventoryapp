const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.route("/").get((req, res) => {
    res.render("landing");
});

router.route("/register").get((req, res) => {
    res.render("register");
});

router.route("/register").post((req,res) => {
   User.register(new User({
       username: req.body.username,
       email: req.body.email
       }),
       req.body.password,
       (err, user) => {
        if(err){
            console.log("Error while saving new user");
            req.flash("error", err.message);
            res.redirect("/register");
        }
        // passport.authenticate("local")(req, res, () => {
        //     console.log("new user registered with passport..");
        //     console.log(user);
        //     res.redirect("/factorystocks");
        // });
           passport.authenticate("local",
               {
                   successRedirect: '/factorystocks',
                   failureRedirect: '/login'
               });
       }
   );
});

router.route("/login").get((req, res) => {
   res.render("login");
});

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/factorystocks",
        failureRedirect: "/login",
        failureFlash: true
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/");
});

module.exports = router;

const loginCheck = (req, res, next) => {
  if(req.session.passport || req.path === "/") {
    next();
  } 
  else {
    res.redirect("https://pi-pets.glitch.me");
  }
}

module.exports = loginCheck;
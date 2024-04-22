module.exports.renderAdminLoginPage = (req,res) =>{
    res.render("login_page.ejs");
}


module.exports.adminLogin = (req,res) =>{
    let {username,password} = req.body;
   
            if(password=='admin' && username == 'admin'){
                res.render("home.ejs");

            }
            else{
                res.send("Wrong Password");
            }
}
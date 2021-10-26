class Globals {
    public serverURL = process.env.NODE_ENV === "production" ? "https://itzhal-vacationproject-react.herokuapp.com" : "http://localhost:3001";
    public vacationsUrl = this.serverURL + "/api/vacations/";
    public loginUrl = this.serverURL + "/api/auth/login/";
    public followersUrl = this.serverURL + "/api/follow/";
    public registerUrl = this.serverURL + "/api/auth/register/";
    public captchaUrl = this.serverURL + "/api/auth/captcha/";
}

const globals = new Globals();

export default globals;

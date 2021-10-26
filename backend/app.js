global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const vacationsController = require("./controllers-layer/vacations-controller");
const authController = require("./controllers-layer/auth-controller");
const followersController = require("./controllers-layer/followers-controller");
const socketHelper = require("./helpers/socket-helper");
const expressRateLimit = require("express-rate-limit");
const server = express();

server.use(cors());
server.use("/api/", expressRateLimit({
    windowMs: 500, // 1 second
    max: 50, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?" // custom message to return back
}));

server.use(express.json());
server.use(fileUpload())
server.use("/api/auth", authController)
server.use("/api/vacations", vacationsController);
server.use("/api/follow", followersController);

server.use("*", (request, response) => {
    response.status(404).send("(404) Route Not Found!");
});

server.use(express.static(path.join(__dirname,"./frontend")))
server.use("*",(request,response)=>{
    response.sendFile(path.join(__dirname,"./frontend/index.html"))
})
const port = process.env.PORT || 3001;

const expressListener = server.listen(port, console.log("Server Started"));
socketHelper.init(expressListener);

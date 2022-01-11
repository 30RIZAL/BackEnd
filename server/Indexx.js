// 1. pastikan selalu import dotenv di line pertama
import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const expressSession = require('express-session')
const middleware = require('./helpers/middleware')

//for access models to db
import models, { sequelize } from "./models/IndexModel";
import routes from './routes/IndexRoute'



// declare port
const port = process.env.PORT || 1337;
const sessionSecret = process.env.SESSION_SECRET || 'admin'
const adminPassword = process.env.ADMIN_PASSWORD || 'rahasia'

passport.use(
    new Strategy(function (username, password, cb) {
        const isAdmin = (username === 'admin') && (password === adminPassword)
        if (isAdmin) cb(null, { username: 'admin' })
        cb(null, false)
    })
);

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((user, cb) => cb(null, user))



const app = express();
// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());



app.use(
    expressSession({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local'), (req, res) =>
    res.json({ success: true })
)


// load models dan simpan di req.context
app.use(async (req, res, next) => {
    req.context = { models };
    next();
});

/* app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
}); */

// call routes
app.use(process.env.URL_DOMAIN, routes.authRoute);

app.use(process.env.URL_API + "/category", routes.categoryRoute);
app.use(process.env.URL_API + "/product", routes.productRoute);
app.use(process.env.URL_API + "/users", routes.userRoute);

app.use(middleware.handleError);
app.use(middleware.notFound);
app.use(middleware.cors);

// set to false agar tidak di drop tables yang ada didatabase
const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    });

});

function ensureAdmin(req, res, next) {
    const isAdmin = req.user && req.user.username === 'admin'
    if (isAdmin) return next()
    res.status(401).json({ error: 'Unauthorized' })
}



export default app;
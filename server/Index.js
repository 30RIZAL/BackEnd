// 1. pastikan selalu import dotenv di line pertama
import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import process.env from './process.env/process.env-heroku'



//for access models to db
import models, { sequelize } from './models/IndexModels';
import routes from './routes/IndexRoute'
// import authJWT from "./helpers/authJWT";


// declare port
const port = process.env.PORT || 1337;

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

// load models dan simpan di req.context
app.use(async (req, res, next) => {
    req.context = { models };
    next();
});

/*  app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
});  */


//auth.setMiddleware(app);


// call routes
// app.post(process.env.URL_DOMAIN+"/login",authJWT.authenticate,authJWT.login)

// app.get(process.env.URL_DOMAIN+"/me",authJWT.ensureAdmin,(req,res)=>{
//     res.json("coo");
// })


app.use(process.env.URL_API + "/type", routes.MenuTypeRoute);
app.use(process.env.URL_API + "/category", routes.RestoCategoryRoute);
app.use(process.env.URL_API + "/user", routes.UsersRoute);
app.use(process.env.URL_API + "/shop", routes.RestoShopRoute);
app.use(process.env.URL_API + "/menu", routes.RestoMenuRoute);
app.use(process.env.URL_API + "/addres", routes.AddressRoute);
app.use(process.env.URL_API + "/cart", routes.AddToCart);
app.use(process.env.URL_DOMAIN + "/auth", routes.AuthJwtRoute);
app.use(process.env.URL_API + "/clit", routes.ClitRoute);
app.use(process.env.URL_API + "/order", routes.OrderRoute);


//use middleware to handle error from others modules


// set to false agar tidak di drop tables yang ada didatabase
const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    });

})



export default app;
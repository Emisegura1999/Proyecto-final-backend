const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const { swaggerOptions } = require("./middleware/swaggerMiddleware.js");
const { logger } = require("./middleware/loggerMiddleware.js");
const auth = require("./middleware/authmiddleware.js");

require("../database.js");
const initializePassport = require("./config/passport.config.js");
const configObject = require("./config/env.config.js");

const SocketManager = require("./sockets/socketmanager.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");


const app = express();
const PORT = configObject.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(passport.initialize());
app.use(auth);


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

initializePassport();

const specs = swaggerJSDoc(swaggerOptions);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const httpServer = app.listen(PORT, () => {
  logger.info(`Server connected http://localhost:${PORT}`);
});

new SocketManager(httpServer);

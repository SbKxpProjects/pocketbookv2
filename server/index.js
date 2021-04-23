const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const db = require("./db");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });

const PORT = process.env.PORT || 3000;
const app = express();
const socetIO = require("socket.io");

module.exports = app;

if (process.env.NODE_ENV === "test") {
  after("close the session store", () => sessionStore.stopExpiringSessions());
}

if (process.env.NODE_ENV !== "production") require("../secrets");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const createApp = () => {
  app.use(morgan("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "Hello World",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use("/auth", require("./auth"));
  app.use("/api", require("./api"));

  app.use(express.static(path.join(_dirname, "..", "assets")));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const error = new Error("Not found");
      err.status = 404;
      next(error);
    } else {
      next();
    }
  });

  app.use("*", (req, rest) => {
    res.send("Welcome to PocketBook");
  });

  app.use((error, req, res, next) => {
    console.error(error);
    console.error(error.stack);
    res
      .status(err.status || 500)
      .send(error.message || "Internal server error.");
  });
};

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );

  const io = socketIO(server);
  require("./socket")(io);
};

const syncDb = () => db.sync();

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}

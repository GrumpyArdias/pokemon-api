import dotenv from "dotenv";
import { mongoConnect } from "./config/mongoConnection";
import express from "express";
import Pokemon from "./pokemon/pokemonRoutes";
import Moves from "./moves/moveRoutes";
import Combat from "./combat/combatRoutes";
import SignIn from "./auth/signIn/signInRoutes";
import cors from "cors";
import cookieSession from "cookie-session";

const app = express();
const port = 3000;

mongoConnect();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || ""],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use("/api/user/signup", SignIn);
app.use("/api/pokemon", Pokemon);
app.use("/api/moves", Moves);
app.use("/api/combat", Combat);

app.get("/api/test", (_req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

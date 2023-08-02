import { mongoConnect } from "./utils/mongoConnection";
import express from "express";
import Pokemon from "./pokemon/pokemonRoutes";
import Moves from "./moves/moveRoutes";
import Combats from "./combat/combatRoutes";
const app = express();

const port = 3000;
mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pokemon", Pokemon);
app.use("/api/moves", Moves);
app.use("/api/combats", Combats);

app.get("/api/test", (_req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

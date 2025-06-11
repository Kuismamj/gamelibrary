import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app: express.Express = express()
app.use(cors())
app.use(express.json())

// MongoDB-mallin määrittäminen
const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
})

const Game = mongoose.model("Game", gameSchema)

// Yhteys MongoDB:hen
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/videogames")
  .then(() => console.log("Yhteys MongoDB:hen onnistui"))
  .catch((err) => console.error("MongoDB-yhteysvirhe:", err))

// API-reitti pelien hakemiseen
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find()
    res.json(games)
  } catch (err) {
    res.status(500).json({ message: "Virhe pelien hakemisessa" })
  }
})

// Palvelimen käynnistäminen
app.listen(3000, () => {
  console.log("Serveri käynnissä portilla 3000")
})

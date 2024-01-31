import mongoose from "mongoose";
import express from "express";
import Users from "./model/User.js";

try {
  await mongoose.connect('mongodb+srv://arvamartin:arvamartin02@cluster0.bqytfu8.mongodb.net/casino');
  console.log('MongoDB kapcsolat sikeresen létrehozva');
} catch (error) {
  console.error('MongoDB kapcsolat hiba:', error);
}

const app = express();

app.use(express.json());

app.listen(5000, () => { console.log('App is running on port 5000') });


app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Szar van a levesben a lekérdezés során' });
  }
});

app.patch('/api/users/:id/history', async (req, res) => {
  try {
    const player = await Users.findById(req.params.id);

    let id = 0;
    const ids = player['game_history'].map(game => game.id);
    while (ids.includes(id)) {
      id++;
    }

    player['game_history'].push({...req.body, id});

    if (req.body.isWon === false) {
      player['coin_balance'] -= req.body.coins;
    } else if (req.body.isWon === true) {
      player['coin_balance'] += req.body.coins;
    }

    await player.save();
    res.status(200).json({status: 'game_history succesfully updated'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
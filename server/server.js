import mongoose from "mongoose";
import express from "express";
import Users from "./model/User.js";


try {
  await mongoose.connect('mongodb+srv://arvamartin:arvamartin02@cluster0.bqytfu8.mongodb.net/casino');
  console.log('Successfully connected to MongoDB');
} catch (error) {
  console.error('Error when connecting to MongoDB', error);
}

const app = express();

app.use(express.json());

app.listen(5000, () => { console.log('App is listening on port 5000') });


app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' , err});
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

    player['game_history'].push({ ...req.body, id });

    if (req.body.isWon === false) {
      player['coin_balance'] -= req.body.coins;
    } else if (req.body.isWon === true) {
      player['coin_balance'] += req.body.coins;
    }

    await player.save();
    res.status(200).json({ status: 'Game History succesfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/api/users', async (req, res) => {
  try {
    const { username, password, emailAdress, age } = req.body;
    const user = new Users({
      username,
      password,
      emailAdress,
      age,
      coin_balance: 1000,
      game_history: []
    });

    const savedUser = await user.save();
    res.status(200).json({ status: 'User successfully added', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
});



app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByIdAndDelete(id);
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error when deleting user' });
  }
});

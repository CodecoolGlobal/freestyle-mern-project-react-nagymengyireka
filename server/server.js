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


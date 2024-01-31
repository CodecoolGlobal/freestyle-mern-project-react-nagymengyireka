import mongoose from "mongoose";
import express from "express";
mongoose.connect('mongodb+srv://arvamartin:arvamartin02@cluster0.bqytfu8.mongodb.net/casino');

const app = express();

app.use(express.json());

app.listen(5000, () => {console.log('App is running on port 5000')});

app.patch('/api/users/history', (req, res) => {

})
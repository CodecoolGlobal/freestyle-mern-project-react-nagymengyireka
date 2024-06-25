# Casino Royal: Online Casino Game Platform

Welcome to **Casino Royal**, an online casino game platform built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and play various casino games to win or lose coins. The current available games include High-Low and Blackjack.

## Team Members

- [Árva Martin](https://github.com/arvamartin)
- [Várkövi Márk](https://github.com/markvarkovi)
- [Bódis Patrik](https://github.com/bodispatrik1995)
- [Nagymengyi Réka Lili](https://github.com/nagymengyireka)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Features](#future-features)
- [Acknowledgments](#acknowledgments)

## Overview

Casino Royal is a web application that provides an interactive casino gaming experience. Users can register and log in to play games, win or lose coins, and track their progress. The current games offered are High-Low and Blackjack, with more games to be added in the future.

## Features

1. **User Authentication**
    - Users can register and log in.

2. **Game Mechanics**
    - **High-Low**: Guess whether the next card will be higher or lower.
    - **Blackjack**: Classic card game where users aim to beat the dealer without going over 21.

3. **Coin Management**
    - Users earn coins for winning games.
    - Users lose coins for losing games.
    - Coin balance is displayed and updated in real-time.

4. **Game History and Statistics**
    - Track wins, losses, and overall coin balance.
    - View history of games played.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodecoolGlobal/freestyle-mern-project-react-nagymengyireka.git
   ```

2. **Navigate to the project directory:**

3. **Install dependencies for both client and server:**
   ```bash
   # For the server
   cd server
   npm install

   # For the client
   cd client
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `server` directory with the following contents:
   ```plaintext
   MONGO_URL=your_mongodb_connection_string
   ```

5. **Run the project:**

    - **Start the server:**
      ```bash
      cd server
      npm start
      ```

    - **Start the client:**
      ```bash
      cd client
      npm start
      ```

6. **Open the application in your web browser:**

## Usage

1. Register a new account or log in with existing credentials.
2. Choose a game (High-Low or Blackjack) and start playing. 
3. Win or lose coins based on game outcomes.

## Future Features

- Add more casino games like Roulette, Poker, and Slots.
- Implement a leaderboard to show top players.
- Add social features like chat and friend lists.
- Enhance game mechanics and graphics.
- Implement a virtual store where users can buy items with coins.
- Make game history available for users to track.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database.
- [Express](https://expressjs.com/) for the backend framework.
- [React](https://reactjs.org/) for the frontend library.
- [Node.js](https://nodejs.org/) for the runtime environment.
- [Deck of Cards API](https://www.deckofcardsapi.com/) for the cards.

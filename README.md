<a id="readme-top"></a>

[![Contributors](https://img.shields.io/badge/contributors-4-green)](https://github.com/CodecoolGlobal/casino-royal-nagymengyireka/graphs/contributors)
[![Forks](https://img.shields.io/badge/forks-0-blue)](https://github.com/CodecoolGlobal/casino-royal-nagymengyireka/forks)
[![Stargazers](https://img.shields.io/badge/stargazers-0-blue)](https://github.com/CodecoolGlobal/casino-royal-nagymengyireka/stargazers)
[![Issues](https://img.shields.io/badge/issues-0-blue)](https://github.com/CodecoolGlobal/casino-royal-nagymengyireka/issues)

# Casino Royal: Online Casino Game Platform

<p align="center">
    An online casino game platform built using the MERN stack.
  </p>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#team-members">Team Members</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About The Project

"Casino Royal" is a web application that provides an interactive casino gaming experience. Users can register and log in to play games, win or lose coins, and track their progress.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/en/starter/installing.html)
* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
* [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/package-manager)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Team Members

* [![Árva Martin](https://img.shields.io/badge/Árva%20Martin-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arvamartin)
* [![Nagymengyi Réka](https://img.shields.io/badge/Nagymengyi%20Réka-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nagymengyireka)
* [![Bódis Patrik](https://img.shields.io/badge/Bódis%20Patrik-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bodispatrik1995)
* [![Várkövi Márk](https://img.shields.io/badge/Várkövi%20Márk-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/markvarkovi)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy of this MERN stack project up and running, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

**Node.js and npm**
   - **Required**: To run and manage the frontend (React with Vite).
   - **Installation**:
     - **Windows/macOS/Linux**: Download from the official [website](https://nodejs.org/).
     - Installing Node.js will also install `npm`.

   ```sh
   node -v
   npm -v
   ```
**MongoDB**
  - You need to have MongoDB installed and running locally or have access to a remote MongoDB instance.
  - [Install MongoDB](https://docs.mongodb.com/manual/installation/) from the official documentation.


### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/CodecoolGlobal/casino-royal-nagymengyireka.git
   ```
2. Navigate to the client directory and install dependencies:
   ```sh
   cd client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```sh
   cd server
   npm install
   ```
4. Add your MongoDB connection string to the server.js file:
   ```sh
   replace YOUR_CONNECTION_STRING in line 7
   ```
5. Run the project:
    Open two terminal windows or tabs:
   - In one terminal, start the server:
     ```sh
     cd server
     nodemon server.js
     ```
   - In the other terminal, start the client:
     ```sh
     cd client
     npm start
     ```
6. Open the URL in your browser.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

This application allows users to:

1. **Choose a Profile/Register**: When the website is accessed the user is greeted with login/register page.
![mainpage](https://github.com/user-attachments/assets/f947b35c-73ae-4731-ad99-8e6b8f498f46)
![register](https://github.com/user-attachments/assets/77eca7da-1ff0-40b9-88f1-c50ee89db81c)

2. **Landing Page**: The user is redirected to the landing page after choosing a profile to play with.
![landing_page](https://github.com/user-attachments/assets/b07a412e-e3d7-43fe-b3c9-8b0e90952535)

3. **High-Low Game**: The user can choose to play the high-low game, where a card is dealt randomly and they have to make a prediction wether the second card will be higher, the same or lower in value. After the choice has been made, the user can draw the second card by clicking on the draw button. 
![highlow_game](https://github.com/user-attachments/assets/3e8bf9ad-f530-46ce-a3d8-72081f95b8c3)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Add check previous games feature.
- [ ] Implement the blackjack game logic.
- [ ] Add user authentication when logging in.
- [ ] Implement additional coin purchasing feature.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

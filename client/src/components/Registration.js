import { useState } from "react";
import './Registration.css'

function Registration({ onFinished }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [age, setAge] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    if(age>=18){
        const userData = { username, password, emailAdress, age };
        fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then(onFinished())
          .catch((error) => {
            console.log(error);
          });
    }else{
        window.alert("Oh oh! You must be at least 18 years old to use this site!")
    }
  
  }

  const handleBack = () => {
    onFinished();
  }

  return (
    <div className="regForm">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Email Adress:
          <input
            type="email"
            value={emailAdress}
            onChange={(e) => setEmailAdress(e.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>

        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit">Register</button>

      </form>
    </div>

  );
}

export default Registration;

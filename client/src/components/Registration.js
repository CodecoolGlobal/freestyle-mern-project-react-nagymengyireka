import { useState } from "react";
import './Registration.css'

function Registration({onFinished}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [age, setAge] = useState(0);


  function handleSubmit(e) {
    e.preventDefault();

    const userData = { username, password, emailAdress, age };
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .then(onFinished())
      .catch((error) => {
        console.log(error);
      });
  }

  const handleBack = () => {
    onFinished();
  }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Email Adress:
        <input
          type="text"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <button type="submit">Registration</button>
    </form>
    <button onClick={handleBack}>Back</button>
    </>
    
  );
}

export default Registration;

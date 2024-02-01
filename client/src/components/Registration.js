import { useState } from "react";
import './Registration.css'

function Registration({ onFinished }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [age, setAge] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    if(username !== "" && password !== "" && emailAdress !== "" && age>=18){
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
    }else if(username !== "" && password !== "" && emailAdress !== "" && age<18){
        window.alert("Are your parents know what you do? Go sleep little shit!")
    }
    else{
        window.alert("all fields must be filled in")
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

        <button onClick={handleBack}>Back</button>
        <button type="submit">Registration</button>

      </form>
    </div>

  );
}

export default Registration;

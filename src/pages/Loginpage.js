import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        alert('User LoggedIn')
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Wrong Username or Password');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (

    <div className="login-container">
      <form className="login-div" onSubmit={login}>
        <h1 className="login-heading">Login to your account</h1>
        <input type="text"
          placeholder="Enter Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)} />
        <input type="password"
          placeholder="Enter Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)} />
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}
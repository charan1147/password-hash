import {useState} from "react"
import axios from 'axios';
import "./ForgetPassword.css"

function ForgetPassword(){
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/request-reset', { email });
      setMessage('Reset email sent! Check your inbox.');
    } catch (err) {
      
        setMessage('Error sending reset email');
      }
    }
  
  

  return (
    <div className="container ">
      <h3>Forget Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>Email Address</label>
          <input
            type="email"
            className="forgot-password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgetPassword;









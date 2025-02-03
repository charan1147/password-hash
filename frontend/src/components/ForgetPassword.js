import { useState } from 'react';
import axios from 'axios';
import "./ForgetPassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('https://password-hash-1.onrender.com/api/request-reset', { email });
      setMessage('Reset email sent! Check your inbox.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
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
            autoComplete="email"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPassword;

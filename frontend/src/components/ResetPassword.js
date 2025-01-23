import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reenterPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/reset-password', { token, newPassword });
      setMessage('Password reset successfully');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="container ">
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>New Password</label>
          <input
            type="password"
            className="newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label>Reenter Password</label>
          <input
            type="password"
            className="newpassword"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

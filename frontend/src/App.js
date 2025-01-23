import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;

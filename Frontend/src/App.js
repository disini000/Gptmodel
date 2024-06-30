
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import SignIn from './Login/SignIn';
import RegistrationForm from './Login/RegistrationForm';
import ForggotPassword from './Login/forggotPassword';
function App() {
  return (
    
    <Router>
    <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/rigester' element={<RegistrationForm/>} />
        <Route path = '/forgotPW' element={<ForggotPassword/>} />
    </Routes>
</Router>
  );
}

export default App;

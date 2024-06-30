import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem('token', responseData.token);
        sessionStorage.setItem('userId', responseData.id);
        navigate('/Home');
      } else {
        alert('Failed to Log');
        console.error('Authentication failed');
      }
    } catch (error) {
      alert('Failed to Log');
      console.error('Error during authentication:', error.message);
    }
  };

  return (
    <div className='bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center'>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5 mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Login illustration"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">            
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={handleEmailChange}
                  value={email}
                />
    
              </div>

              <div className="form-outline mb-3">        
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                  value={password}
                />
        
                <button className='btn btn-outline-secondary my-2' type='button' onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <Link to={'/forgotPW'} className="text-white">
                  Forgot password?
                </Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <Link to={`/rigester`} className="text-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (name === 'confirmPassword') {
      setPasswordMatch(formData.password === value);
    }
  };

  useEffect(() => {
    setEmailError('');
  }, [formData.email]);

  const validateEmail = () => {
    if (!validator.isEmail(formData.email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const isValid = passwordRegex.test(formData.password);

    if (isValid) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.');
      return false;
    }
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  const validateConfirmPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const validateFullName = () => {
    if (!formData.fullName.trim()) {
      setFullNameError('Full Name is required.');
      return false;
    } else {
      setFullNameError('');
      return true;
    }
  };

  const handleSendOTP = async () => {
    if (
      !validateEmail() ||
      !validateFullName() ||
      !validatePassword() ||
      !validateConfirmPassword()
    ) {
      alert("Invalid input");
    } else {
      try {
        await axios.post('http://localhost:8080/api/v1/otp/sendOTP', { email: formData.email });
        setOtpSent(true);
        setResendCooldown(120);
      } catch (error) {
        alert('Failed to send OTP. Please try again.');
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/otp/reSendOTP', {
        email: formData.email,
      });
      setResendCooldown(120); // Reset the cooldown to 2 minutes
    } catch (error) {
      // Handle error
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/otp/verifyOTP', {
        email: formData.email,
        otp: parseInt(formData.otp, 10),
      });
      setOtpVerified(true);
    } catch (error) {
      alert('Incorrect OTP entered');
    }
  };

  const handleSubmit = async () => {
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (otpVerified) {
      if (isPasswordValid && isConfirmPasswordValid) {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
          alert("Successfully Registered.");
          if (response.status === 200) {
            alert("Successfully Registered.");
            navigate('/');
          }
        } catch (error) {
          navigate('/');
          alert('Unsuccessful registration. Email already exists.');
          console.error(error);
        }
      } else {
        alert("Please, Enter Strong Password");
      }
    } else {
      alert("Fill Out All Input fields.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  return (
    <div className='bg-dark text-light min-vh-100 d-flex flex-column  align-items-center'>
      <div className='fs-2 text-center mb-4'>Register Page...</div>
      <form className="container">
        <div className="form-row">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="inputFullName">Full Name:</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={validateFullName}
                className="form-control"
              />
              {fullNameError && <div className="text-danger">{fullNameError}</div>}
            </div>

            <div className="col-md-4 mb-4">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className="form-control"
                placeholder="example@gmail.com"
                required
                disabled={otpVerified}
              />
              <div style={{ color: 'red' }}>{emailError}</div>
            </div>

            <div className="col-md-6 mb-4">
              <label className='mb-1'>Password:</label>
              <div className='row'>
                <div className='col-lg-10'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    onBlur={validatePassword}
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    className='form-control'
                    required
                  />
                </div>
                <div className='col-lg-2'>
                  <button
                    className='btn btn-outline-secondary'
                    type='button'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>

            <div className="col-md-4 mb-4">
              <label className='mb-1'>Confirm Password:</label>
              <div className='row'>
                <div className='col-lg-10'>
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onBlur={validateConfirmPassword}
                    onChange={handleChange}
                    className='form-control'
                    required
                  />
                  {!passwordMatch && (
                    <div className="text-danger">Passwords do not match.</div>
                  )}
                </div>
                <div className='col-lg-2'>
                  <button
                    className='btn btn-outline-secondary'
                    type='button'
                    onClick={togglePasswordVisibility1}
                  >
                    {showPassword1 ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-4 mb-4">
                {otpSent && !otpVerified && (
                  <>
                    <label className='px-1'>
                      Enter OTP:
                      <input type="text" name="otp" onChange={handleChange} />
                    </label>
                    <button type="button" onClick={handleVerifyOTP} className="btn btn-warning mx-2">
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
              <div className="col-lg-6 mb-4">
                {!otpVerified && (
                  <>
                    <button
                      type="button"
                      onClick={otpSent ? handleResendOTP : handleSendOTP}
                      disabled={resendCooldown > 0}
                      className="btn btn-warning mx-2"
                    >
                      {otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                    {resendCooldown > 0 && <p>Resend cooldown: {resendCooldown} seconds</p>}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row col-10">
              {otpVerified && (
                <button type="button" onClick={handleSubmit} className="btn btn-warning m-4">
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

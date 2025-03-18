import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.password!=formData.confirmPassword){
        toast.error('Confirm Password should be same as password entered');
        return
      }
      await signup(formData);
      toast.success('Signup successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2 className="login-title">Sign Up</h2>
        <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Your name"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
        </div>
        <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
        </div>
        <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
        </div>
        <div className="form-group">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
        </div>
        <button
          type="submit"
           className="login-button"
        >
          Sign Up
        </button>
        <p className="signup-link">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

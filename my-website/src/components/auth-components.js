import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Login Component
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted:", { username, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="flex w-full max-w-6xl">
        {/* Left side */}
        <div className="hidden md:flex md:w-1/2 p-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to PressWay</h1>
            <p className="text-xl opacity-80">
              It is one of the most trusted news websites, providing the latest updates and in-depth coverage to keep you informed and connected with the world in real time.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 bg-white p-12 rounded-lg">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-purple-600 mb-8">USER LOGIN</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-checkbox text-purple-600"
                  />
                  <span className="text-sm text-gray-600">Remember</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-purple-600">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                LOGIN
              </button>
              <div className="text-center mt-4">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="text-purple-600 hover:text-purple-700">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Component
const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup attempted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
              placeholder="Email Address"
            />
          </div>
          <div>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-purple-600 hover:text-purple-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Forgot Password Component
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Forgot Password</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-purple-50 border border-purple-100"
                placeholder="Email Address"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-purple-600 hover:text-purple-700">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Password reset instructions have been sent to your email.
            </p>
            <Link to="/login" className="text-purple-600 hover:text-purple-700">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export { LoginPage, SignupPage, ForgotPasswordPage };
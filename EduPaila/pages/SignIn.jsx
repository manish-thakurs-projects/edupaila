import './SignIn.css';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../src/components/logo';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../src/redux/user/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signIn-container">
      <div className="signIn-wrapper">
        <div className="signIn-left">
          <Logo />
          <p className="signIn-description">
            Welcome to EduPaila! Unlock your learning potential with expert-curated courses and a supportive community. Learn at your own pace, anytime, anywhere. Start your journey with us today!
          </p>
        </div>
        <div className="signIn-right">
          <form className="signIn-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="YourUniqueId@edupaila.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group password-group">
              <Label value="Your password" />
              <TextInput
                type={passwordVisible ? 'text' : 'password'}
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="loading-text">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className="signIn-footer">
            <span>Don't have an account?</span>
            <Link to="/Joinus" className="signIn-link">
              Join us
            </Link>
          </div>
          {errorMessage && (
            <Alert className="signIn-alert" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

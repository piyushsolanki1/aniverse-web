import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault(); // prevents form reload
    alert('Sign In Successful!');
    navigate('/');
  };

  return (
    <div className='max-w-3xl mx-auto bg-gray-800 mt-12 rounded-2xl'>
      <div className='text-center mx-auto p-23'>
        <h2>Sign In</h2>

        <form className='flex flex-col gap-4 p-4 text-left' onSubmit={handleSignIn}>
          <h4>Enter Name</h4>
          <input
            type="text"
            required
            placeholder='Username'
            className='p-2 rounded-md text-black border-gray-500 border'
          />

          <h4>Enter Password</h4>
          <input
            type="password"
            placeholder='Password'
            required
            className='p-2 rounded-md text-black border-gray-500 border'
          />

          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700 px-4 py-2 mt-12 rounded-md text-sm font-medium text-white w-50 justify-center flex items-center'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

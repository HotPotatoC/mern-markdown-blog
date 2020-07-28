import React, {useState, useContext} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";

import * as auth from "../../services/auth";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Container from "../../components/Container";
import {UserContext} from "../../providers/UserProvider";

export function Register() {
  const {user} = useContext(UserContext);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({status: false, message: ""});

  const history = useHistory();
  const location = useLocation();

  const {from} = location.state || {from: {pathname: "/"}};

  if (user.data && user.loggedIn) {
    history.replace(from);
  }

  async function register(event) {
    event.preventDefault();

    try {
      const {status} = await auth.register({
        displayName,
        username,
        email,
        password,
      });

      if (status === 200) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError({
        status: true,
        message: error.response.data.message,
      });
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-2/4'>
            <div className='p-4 sm:p-6 bg-white shadow-sm border rounded'>
              <h1 className='font-bold text-4xl mb-8'>Sign Up</h1>
              <form className='flex flex-col space-y-5' onSubmit={register}>
                <div className='flex flex-col'>
                  <label className='text-xl'>Display Name</label>
                  <input
                    className='px-4 py-2 bg-gray-200 rounded border-2 focus:border-blue-500'
                    type='text'
                    name='displayName'
                    onChange={(event) => setDisplayName(event.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xl'>Username</label>
                  <input
                    className='px-4 py-2 bg-gray-200 rounded border-2 focus:border-blue-500'
                    type='text'
                    name='username'
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xl'>E-Mail Address</label>
                  <input
                    className='px-4 py-2 bg-gray-200 rounded border-2 focus:border-blue-500'
                    type='text'
                    name='email'
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xl'>Password</label>
                  <input
                    className='px-4 py-2 bg-gray-200 rounded border-2 focus:border-blue-500'
                    type='password'
                    name='password'
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {error.status && error.message ? (
                  <small className='mt-2 text-red-400'>{error.message}</small>
                ) : (
                  ""
                )}
                <Button
                  nativeType='submit'
                  extraClasses='text-white duration-75 bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700'
                >
                  Sign Up
                </Button>
                <Link className='text-blue-500 hover:underline' to='/login'>
                  Already have an account?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Register;

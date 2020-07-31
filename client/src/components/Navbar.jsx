import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Menu as MenuIcon, X as XIcon} from "react-feather";

import {UserContext} from "../contexts/UserContextProvider";

import * as auth from "../services/auth";

import Container from "./Container";
import Button from "./Button";

export function Navbar() {
  const {user, setUser} = useContext(UserContext);
  const [navVisibility, setNavVisibility] = useState(false);

  function logout() {
    auth.logout();

    setUser({
      token: undefined,
      data: undefined,
    });
  }

  return (
    <div className='w-full fixed top-0 py-2 bg-white shadow-sm border-b'>
      <Container>
        <div className='flex justify-between items-center'>
          <Link to='/'>
            <h1 className='p-2 font-black text-2xl text-white bg-black rounded'>
              MERN
            </h1>
          </Link>
          <div className='hidden sm:flex justify-between space-x-2'>
            {user.data && (
              <Button onClick={logout}>Logout</Button>
            )}
            {!user.data && (
              <React.Fragment>
                <Link to='/login'>
                  <Button>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button>Register</Button>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className='block sm:hidden'>
            <button
              className='focus:outline-none focus:border-none'
              onClick={() => setNavVisibility(!navVisibility)}
            >
              {navVisibility ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        <div className={`sm:hidden ${navVisibility ? "block" : "hidden"}`}>
          <div className='flex flex-col space-y-2 mt-4'>
            {user.data && (
              <Button extraClasses='w-full'>Logout</Button>
            )}
            {!user.data && (
              <React.Fragment>
                <Link to='/login'>
                  <Button extraClasses='w-full'>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button extraClasses='w-full'>Register</Button>
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;

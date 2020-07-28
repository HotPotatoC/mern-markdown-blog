import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Menu as MenuIcon, X as XIcon} from "react-feather";

import Container from "./Container";
import Button from "./Button";

export function Navbar() {
  const [navVisibility, setNavVisibility] = useState(false);

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
            <Link to='/login'>
              <Button extraClasses='bg-white duration-75 hover:bg-gray-200'>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button extraClasses='bg-white duration-75 hover:bg-gray-200'>
                Register
              </Button>
            </Link>
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
            <Link to='/login'>
              <Button extraClasses='w-full'>Login</Button>
            </Link>
            <Link to='/register'>
              <Button extraClasses='w-full'>Register</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;

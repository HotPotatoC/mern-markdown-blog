import React from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import {ArrowLeft as ArrowLeftIcon} from "react-feather";
import {Link} from "react-router-dom";

export function NotFound() {
  return (
    <Container extraClasses='pt-32'>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full md:w-3/5 text-center'>
          <h1 className='font-medium text-4xl mt-32 leading-tight'>
            The page you're looking for does not exist
          </h1>
          <div className='mt-12'>
            <Link to='/'>
              <Button
                text='white'
                background='blue-500'
                backgroundHover='blue-700'
                border='blue-500'
                borderHover='blue-700'
                extraClasses='duration-75'
              >
                <div className='flex justify-between items-center space-x-4'>
                  <ArrowLeftIcon />
                  <span>Go back home</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;

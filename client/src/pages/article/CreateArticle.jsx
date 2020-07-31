import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import Moment from "react-moment";

import {UserContext} from "../../contexts/UserContextProvider";

import request from "../../services/api";

import Markdown from "../../components/Markdown";

import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Button from "../../components/Button";

export function CreateArticle() {
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  async function submit(event) {
    event.preventDefault();

    try {
      const {status} = await request.post("/articles", {
        title,
        body,
      });

      if (status === 200) {
        history.push("/");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='w-full'>
          <h1 className='font-bold text-4xl md:text-6xl leading-tight'>
            New Article
          </h1>
        </div>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-2/5'>
            <div className='mr-6'>
              <form className='flex flex-col space-y-5' onSubmit={submit}>
                <div className='flex flex-col'>
                  <label className='text-xl'>Title</label>
                  <input
                    className='px-4 py-2 bg-white rounded border-2 focus:border-blue-500'
                    type='text'
                    name='title'
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xl'>
                    Body (in{" "}
                    <a
                      className='text-blue-500 hover:text-blue-700 hover:underline'
                      href='https://www.markdownguide.org/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Markdown
                    </a>{" "}
                    format)
                  </label>
                  <textarea
                    className='h-64 px-4 py-2 bg-white rounded border-2 focus:border-blue-500'
                    type='text'
                    name='body'
                    onChange={(event) => setBody(event.target.value)}
                  ></textarea>
                </div>
                {error ? (
                  <small className='mt-2 text-red-400'>{error}</small>
                ) : (
                  ""
                )}
                <Button
                  nativeType='submit'
                  extraClasses='text-white duration-75 bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700'
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
          <div className='w-full md:w-3/5'>
            <h1 className='mt-6 md:-mt-5 text-2xl mb-4'>Preview</h1>
            <div className='p-6 bg-white shadow rounded break-words'>
              <h1 className='font-bold text-4xl md:text-6xl leading-tight'>
                {title || (
                  <span className='font-normal text-gray-600'>Title here</span>
                )}
              </h1>
              <div className='flex justify-start space-x-4 mb-10'>
                <p>By {user.data.displayName}</p>
                <span>—</span>
                <p>
                  <Moment format='MMMM YYYY'>{new Date()}</Moment>
                </p>
              </div>
              <Markdown source={body} />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default CreateArticle;

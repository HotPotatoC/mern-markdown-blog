import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Moment from "react-moment";

import "highlight.js/styles/atom-one-dark.css";

import request from "../../services/api";

import Markdown from "../../components/Markdown";

import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import {ChevronLeft as ChevronLeftIcon} from "react-feather";

export function Article() {
  const {username, slug} = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const {data} = await request.get(`/users/${username}/articles/${slug}`);

      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [username, slug]);

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          {!loading ? (
            <React.Fragment>
              <div className='w-full md:w-2/3 mb-6'>
                <div className='flex text-gray-600'>
                  <Link to='/' className='flex justify-start space-x-4'>
                    <ChevronLeftIcon />
                    <p className='hover:underline'>Go back home</p>
                  </Link>
                </div>
              </div>
              <div className='w-full md:w-2/3 p-6 bg-white shadow rounded break-words'>
                <h1 className='font-bold text-4xl md:text-6xl leading-tight'>
                  {article.title}
                </h1>
                <div className='flex justify-start space-x-4 mb-10'>
                  <p>By {article.user?.displayName}</p>
                  <span>—</span>
                  <p>
                    <Moment format='MMMM YYYY'>{article.createdAt}</Moment>
                  </p>
                </div>
                <Markdown source={article.body} />
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Article;

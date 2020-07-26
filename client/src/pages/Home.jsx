import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {Plus as PlusIcon} from "react-feather";

import request from "../services/api";

import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import Container from "../components/common/Container";

function ArticleCard({title, slug, user, createdAt}) {
  return (
    <div className='mb-4 p-6 bg-white shadow-sm border rounded'>
      <small className='text-gray-600'>{user.displayName}</small>
      <Link to={`article/${slug}`}>
        <h1 className='font-semibold text-2xl hover:text-blue-500'>{title}</h1>
      </Link>
      <Moment format='MMMM YYYY'>{createdAt}</Moment>
    </div>
  );
}

export function Home() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const {data} = await request.get("/articles");

    setArticles(data.docs);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-3/5'>
            <div className='flex flex-row justify-between mb-4'>
              <h1 className='font-bold text-2xl'>Posts</h1>
              <Button extraClasses='bg-blue-500 border-blue-500 text-white duration-75 hover:bg-blue-700 hover:border-blue-700'>
                <div className='flex justify-between items-center space-x-4'>
                  <PlusIcon />
                  <span>Write a post</span>
                </div>
              </Button>
            </div>
            {articles.map((article) => (
              <ArticleCard
                title={article.title}
                slug={article.slug}
                user={article.user}
                createdAt={article.createdAt}
                key={article.slug}
              />
            ))}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;

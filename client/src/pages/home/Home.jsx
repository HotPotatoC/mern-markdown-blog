import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Plus as PlusIcon} from "react-feather";

import request from "../../services/api";

import ArticleCard from "./components/ArticleCard";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Container from "../../components/Container";

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
              <Link to='/new'>
                <Button
                  text='white'
                  background='blue-500'
                  backgroundHover='blue-700'
                  border='blue-500'
                  borderHover='blue-700'
                  extraClasses='duration-75'
                >
                  <div className='flex justify-between items-center space-x-4'>
                    <PlusIcon />
                    <span>Write a post</span>
                  </div>
                </Button>
              </Link>
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

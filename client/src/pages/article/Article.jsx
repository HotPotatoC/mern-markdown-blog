import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

import request from "../../services/api";

import Navbar from "../../components/common/Navbar";
import Container from "../../components/common/Container";
import Moment from "react-moment";

export function Article() {
  const {slug} = useParams();
  const [article, setArticle] = useState({});

  async function fetchArticle() {
    const {data} = await request.get(`/articles/${slug}`);

    setArticle(data);
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-2/4'>
            <h1 className='font-bold text-6xl'>{article.title}</h1>
            <div className='flex justify-start space-x-4 mb-10'>
              <p>By {article.user?.displayName}</p>
              <span>—</span>
              <p>
                <Moment format='MMMM YYYY'>{article.createdAt}</Moment>
              </p>
            </div>
            <ReactMarkdown source={article.body} />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Article;

import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Moment from "react-moment";

import "highlight.js/styles/atom-one-dark.css";

import request from "../../services/api";

import Markdown from "../../components/Markdown";

import Navbar from "../../components/common/Navbar";
import Container from "../../components/common/Container";

export function Article() {
  const {slug} = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const {data} = await request.get(`/articles/${slug}`);

      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-2/3'>
            {!loading ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Article;

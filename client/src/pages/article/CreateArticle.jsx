import React, {useState} from "react";

import Navbar from "../../components/common/Navbar";
import Container from "../../components/common/Container";

export function CreateArticle() {
  const [title, setTitle] = useState();
  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full'></div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default CreateArticle;

import React from 'react';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

const BlogPost = (): JSX.Element => {
    const params = useParams();
    return <h1>Blog Post {params.id}</h1>;
};

export default BlogPost;

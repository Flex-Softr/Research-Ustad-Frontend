
import BlogPage from '@/components/blogs/BlogPage';
import { GetAllBlog } from '@/services/blogs';
import React from 'react';

const page =async () => {

    return (
        <div>
           <BlogPage></BlogPage>
        </div>
    );
};

export default page;
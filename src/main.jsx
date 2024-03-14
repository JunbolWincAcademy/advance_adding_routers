import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NewPost } from './NewPost';
import { PostList } from './PostList';
import { Post } from './Post';
import { User } from './User';
import { Root } from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <PostList />,
      },
      {
        path: '/post/:postId', // this is a dynamic variable because the use of ':'. The post will change
        element: <Post />,
      },
      {
        path: '/user/:userId',
        element: <User />,
      },
      {
        path: '/post/new', // this is a static (it wont change) variable
        element: <NewPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

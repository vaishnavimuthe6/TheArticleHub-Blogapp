import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Rootlayout from './components/Rootlayout.jsx';
import Home from './components/common/Home.jsx';
import Signin from './components/common/Signin.jsx';
import Signout from './components/common/Signout.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import AuthorProfile from './components/author/AuthorProfile.jsx';
import PostArticle from './components/author/PostArticle.jsx';
import Articles from './components/common/Articles.jsx';
import ArticleById from './components/common/ArticleByID.jsx';
import UserAuthorContext from './contexts/UserAuthorContext.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';

const browserRouterObj = createBrowserRouter(
  [
    {
      path: '/',
      element: <Rootlayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'signin',
          element: <Signin />,
        },
        {
          path: 'signout',
          element: <Signout />,
        },
        {
          path: 'user-profile/:email',
          element: <UserProfile />,
          children: [
            {
              path: 'articles',
              element: <Articles />,
            },
            {
              path: ':articleId',
              element: <ArticleById />,
            },
            {
              path: '',
              element: <Navigate to="articles" replace />,
            },
          ],
        },
        {
          path: 'author-profile/:email',
          element: <AuthorProfile />,
          children: [
            {
              path: 'articles',
              element: <Articles />,
            },
            {
              path: ':articleId',
              element: <ArticleById />,
            },
            {
              path: 'article',
              element: <PostArticle />,
            },
            {
              path: '',
              element: <Navigate to="articles" replace />,
            },
          ],
        },
        {
          path: 'admin-profile/:email',
          element: <AdminProfile />,
          children: [
            {
              path: 'dashboard',
              element: <AdminDashboard />,
            },
            {
              path: 'articles',
              element: <Articles />,
            },
            {
              path: ':articleId',
              element: <ArticleById />,
            },
            {
              path: '',
              element: <Navigate to="articles" replace />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
      <RouterProvider
        router={browserRouterObj}
        future={{
          v7_startTransition: true,
        }}
      />
    </UserAuthorContext>
  </StrictMode>
);

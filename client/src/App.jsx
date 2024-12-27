import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import AuthorPosts from './pages/AuthorPosts';
import Authors from './pages/Authors';
import CategoryPost from './pages/CategoryPost';
import CreatePost from './pages/CreatePost';
import DashBoard from './pages/DashBoard';
import DeletePost from './pages/DeletePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';


import  UserProvider  from './context/userContext' 

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = ()  => {

  const router=createBrowserRouter([
    {
      path: '/',
      element : <UserProvider><Layout/></UserProvider>,
      errorElement: <ErrorPage/>,
      children:[
        {index: true , element: <Home/>},
        { path : "/posts/:id" , element : <PostDetail/> },
        { path : "/register" , element : <Register/> },
        { path : "/login" , element : <Login/>},
        { path : "/profile/:id", element : <UserProfile/>},
        { path : "/authors" , element : <Authors/>},
        { path : "/create" , element : <CreatePost/>},
        { path : "/posts/categories/:category" , element : <CategoryPost/>},
        { path : "/posts/users/:id" , element : <AuthorPosts/>} ,
        { path : "/myposts/:id" , element : <DashBoard/>},
        { path : "/posts/:id/edit" , element : <EditPost/>} ,
        { path : "/posts/:id/delete" , element : <DeletePost/>} ,
        { path : "/logout" , element : <Logout/> },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App
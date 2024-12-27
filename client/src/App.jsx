import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
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
import Logout from './pages/Login';
import UserProfile from './pages/UserProfile';

import { Routes,Route, createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = ()  => {

//   return (
//     <>
//       <Header/>
//       <Routes>
//       <Route path="/" element={<Home/>}/>
//         <Route path="/post/:id" element={<PostDetail/>} />
//         <Route path="/register" element={<Register/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/profile/:id" element={<UserProfile/>} />
//         <Route path="/authors" element={<Authors/>} />
//         <Route path="/create" element={<CreatePost/>} />
//         <Route path="/posts/categories/:category" element={<CategoryPost/>} />
//         <Route path="/posts/users/:id" element={<AuthorPosts/>} />
//         <Route path="/myposts/:id" element={<DashBoard/>}/>
//         <Route path="/posts/:id/edit" element={<EditPost/>} />
//         <Route path="/logout" element={<Logout/>} />
//         <Route path="*" element={<ErrorPage/>}/>
//       </Routes>
//       <Footer/> 
//     </>
//   )


  // NOT WORKING: ->
  const router=createBrowserRouter([
    {
      path: '/',
      element : <Layout/>,
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
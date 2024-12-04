import './components/static/App.css';
import ReactGA from 'react-ga4';
import { Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import Home from './pages/Home/Home'
import ReadPost from './pages/ReadPost/ReadPost'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ProtectedRoute from './pages/Dashboard/ProtectedRoute';
import { DashboardProvider } from './pages/Dashboard/components/Context_Dashboard';
import AboutMe from './pages/AboutMe/AboutMe';
import {HelmetProvider} from "react-helmet-async";
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from './components/static/themes';
import { useEffect } from 'react';
// import globals from './components/static/globals';




function App() {
  ReactGA.initialize('G-CZ2MMR7HRP');

  useEffect(() => {
    if (!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'dark')
    }
}, [])


  return (
    <HelmetProvider>
      <DashboardProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/todas-publicacoes' element={<AllPosts />}></Route>
          <Route path='/ler/:id' element={<ReadPost />}></Route>
          <Route path='/blog-login' element={<Login />}></Route>
          <Route path='/sobre-mim' element={<AboutMe/>}></Route>
          <Route path='/dashboard' element={
              <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
          <Route path='*' element={<h2>Página nao encontrada</h2>}></Route>
        </Routes>
      </DashboardProvider>
    </HelmetProvider>
  )
}




export default App

import './components/static/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import Home from './pages/Home/Home'
import ReadPost from './pages/ReadPost/ReadPost'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ProtectedRoute from './pages/Dashboard/ProtectedRoute';
import { DashboardProvider } from './pages/Dashboard/components/Context_Dashboard';
import AboutMe from './pages/AboutMe/AboutMe';
import {HelmetProvider} from "react-helmet-async";
import ReactGA from "react-ga4";
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from './components/static/themes';
import { useEffect } from 'react';
// import globals from './components/static/globals';
const SERVER_URL = import.meta.env.VITE_SERVER_URL




function App() {
  ReactGA.initialize('G-CZ2MMR7HRP');
  const pageLocation = useLocation()
  ReactGA.send({ hitType: "pageview", page: pageLocation, title: document.title });
  useEffect(() => {
    if (!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'dark')
    }

}, [])

  const Sitemap = () =>{
    
    useEffect(()=> {
      fetch(`${SERVER_URL}/sitemap`)
      .then((response) => (response.text()))
      .then((xml) => {
        const blob = new Blob([xml], {type: 'application/xml'})
        const url = URL.createObjectURL(blob)
        window.location.href = url
      }).catch((error) => console.error('Erro ao carregar o sitemap:', error));

    },[])


    return null

  }



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
          <Route path='/sitemap.xml' element={<Sitemap />}></Route>
        </Routes>
      </DashboardProvider>
    </HelmetProvider>
  )
}




export default App

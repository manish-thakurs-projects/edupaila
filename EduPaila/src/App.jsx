import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Header from './components/Header'
import Books from '../pages/Books'

export default function App() {
  return (
    <BrowserRouter >
    <Header/> 
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/books' element={<Books />} />
    </Routes>
    </BrowserRouter>
  )
}
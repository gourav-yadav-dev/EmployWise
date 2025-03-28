import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './component/Login';
// import { ListUser } from './component/ListUser'
import { ListUser } from './component/Listuser'
import {EditUser} from './component/EditUser'
function App() {


  return (
    <>
      <div className="bg-dark text-white" >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}>
            </Route>
              <Route path="listuser" element={<ListUser/>}>
              </Route>
              <Route path="edit/:id" element={<EditUser/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

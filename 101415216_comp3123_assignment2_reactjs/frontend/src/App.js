import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Components/Signup'
import Login from './Components/Login'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ListEmp from './Components/ListEmp';
import AddEmp from './Components/AddEmp'
import Detail from './Components/Detail'
import Search from './Components/Search'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/ListEmployee' element={<ListEmp />}></Route>
        <Route path='/AddEmployee' element={<AddEmp />}></Route>
        <Route path='/Detail' element={<Detail />}></Route>
        <Route path='/Search' element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

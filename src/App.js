import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SingUp from './components/SingUp';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/log' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<SingUp/>}/>
        <Route path='/' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

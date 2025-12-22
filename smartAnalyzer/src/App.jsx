import './App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx' ;
import ViolationDetails from './pages/ViolationDetails.jsx';
import ResultPage from './pages/ResultPage.jsx';
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/result/:scanId' element={<ResultPage/>}/>
      <Route path='/result/:scanId/violations/:index' element={<ViolationDetails/>}/>
     </Routes>
     </BrowserRouter>
  
    </>
  )
}

export default App

import './App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx' ;
import ViolationDetails from './pages/ViolationDetails.jsx';
import ResultPage from './pages/ResultPage.jsx';
import AiPage from './pages/AiPage.jsx'
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/result/:scanId' element={<ResultPage/>}/>
      <Route path='/result/:scanId/violations/:index' element={<ViolationDetails/>}/>
      <Route path='/result/:scanId/violations/:index/ai' element={<AiPage/>}/>
     </Routes>
     </BrowserRouter>
  
    </>
  )
}

export default App

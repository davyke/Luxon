import { useRef } from 'react'
import './App.css'
import Navbar from './Componets/Navbar'
import ConferenceScheduler from './Componets/LocalConfrence';
import LocoConferenceScheduler from './Componets/ConferenceScheduler';
import Conference from './Componets/ConferenceScheduler';



function App() {
  const ref = useRef(null);

  const options = {
    smooth: true,
  } 

  

  return (
    
    
      <div className="container">
      
      
      <Conference/>

      
        
      </div>
    
  
  )
}

export default App

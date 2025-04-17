import { useState } from 'react'
import './App.css'
import CurrencyConverter from './components/Currencyconvertor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="App">
      <CurrencyConverter/>
    </div>
    </>
  )
}

export default App

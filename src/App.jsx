import Header from './Components/Static/Header'
import Details from './Components/Static/Details'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
        <Route path="/" exact element={<Details/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

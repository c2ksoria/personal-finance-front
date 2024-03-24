import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const back_host = 31575
const app_port = import.meta.env.PORT
const app_port1 = import.meta.env.VITE_PORT
const backend_port = "viaduct.proxy.rlwy.net"
const port_back = import.meta.env.VITE_PORTAPP

console.log(back_host, app_port, app_port1,backend_port, port_back)
function App() {
  const [count, setCount] = useState(0)
 const fetchAction = async()=>{
  const requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json"
    }
}
const url = `https://${back_host}:${backend_port}/v1/getconfig`
console.log(url)

const response =  await fetch(url, requestOptions)
        .then(resp => {
            return resp.json()
        })
console.log(response)
}
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h4>{back_host}</h4>
      <div className="card">
        <button onClick={()=>fetchAction()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

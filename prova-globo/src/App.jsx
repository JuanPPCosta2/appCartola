import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {

  const [times, setTimes] = useState([])
  const [filtro, setFiltro] = useState([])
  const [input, setInput] = useState("")

  const pegarDados = async () => {
    const dados = await axios.get("https://api.cartola.globo.com/clubes")
    setTimes(Object.values(dados.data))

    setFiltro(Object.values(dados.data))

  }
  const filtrar = () => {
    const data = filtro.filter((item) => item.nome.toLowerCase().includes(input.toLowerCase()))
    setTimes(data)
}
  useEffect(() => { pegarDados() }, [])

  return (
    <>
    <header className='Header'>
      <img className= 'foto' src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png" alt="logo" />
      <input className='barra' onChange={(e) => setInput(e.target.value)}/>
       <div className='botao' onClick={() => filtrar()}>
        Buscar
      </div>
    </header>
      {times?.map((item) => (
        <Link className='div' to={`/jogadores/${item.id}`}>
          <img className = 'img'src={item.escudos["60x60"]} />
          <div className='conteiner_deidato'>
            <p className='nome'>{item.nome}</p>
            <p className='apelido'>{item.apelido}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export default App

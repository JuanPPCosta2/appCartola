import { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Jogadores() {
    const { id } = useParams()
    const [jogadores, setJogadores] = useState([])
    const [filtro, setFiltro] = useState([])
    const [input, setInput] = useState("")

    const posicao = {

        "1": {
            "nome": "Goleiro",
        },
        "2": {
            "nome": "Lateral",
        },
        "3": {
            "nome": "Zagueiro",
        },
        "4": {
            "nome": "Meia",
        },
        "5": {
            "nome": "Atacante",
        },
        "6": {
            "nome": "Técnico",
        }
    }

    const pegarDados = async () => {
        const dados = await axios.get(`http://api.cartola.globo.com/atletas/mercado/${id}`)
        const arrumado = dados.data.atletas.map((atleta) => ({
            ...atleta,
            foto: atleta.foto ? atleta.foto.replace("FORMATO", "220x220") : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues="
        }))
        setJogadores(arrumado)
        setFiltro(arrumado)
    }

    const filtrar = () => {
        const data = filtro.filter((item) => item.apelido.toLowerCase().includes(input.toLowerCase()))
        setJogadores(data)
    }

    useEffect(() => { (pegarDados()) }, [])

    return (
        <>
            <header className='Header'>
                <img className='foto' src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png" alt="logo" />
                <input className='barra' onChange={(e) => setInput(e.target.value)}/>
                <div className='botao' onClick={() => filtrar()}>
                    Buscar
                </div>
            </header>
            <div className='pai'>
                {jogadores?.map((item) => (
                    <div className='jogadores'>
                        <img className='img' src={item.foto} />
                        <p className='nome'>{item.apelido}</p>
                        <p>{posicao[item.posicao_id].nome}</p>
                    </div>
                ))}
            </div>
        </>
    )
}


export default Jogadores
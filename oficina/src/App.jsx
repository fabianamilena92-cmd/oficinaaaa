import { useState } from 'react'
import './App.css'
import Ordem from './components/Ordem'

const ordensIniciais = [
  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'Fabiana',
    dsServico: 'troca de freio',
    nuValor: 125,
    fgConcluida: true
  },
  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'Guilherme',
    dsServico: 'Troca de pneu',
    nuValor: 150,
    fgConcluida: false
  },
  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'Ana',
    dsServico: 'Manutenção',
    nuValor: 250,
    fgConcluida: false

  }
]

function App() {
  const [ordens, setOrdens] = useState(ordensIniciais)
  const [cliente, setCliente] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState('')

  function cadastrarOrdem(e) {
    e.preventDefault()

    if (!cliente.trim() || !servico.trim() || valor === '') {
      setErro('preencha todos os campos')
      return
    }

    const valorOrdem = Number(valor)

    if (!Number.isFinite(valorOrdem) || valorOrdem < 0) {
      setErro('digite um valor valido')
      return
    }

    const novaOrdem = {
      idOrdem: crypto.randomUUID(),
      dsCliente: cliente.trim(),
      dsServico: servico.trim(),
      nuValor: valorOrdem,
      fgConcluida: false
    }

    setOrdens(listaAtual => [...listaAtual, novaOrdem])

    setCliente('')
    setServico('')
    setValor('')
    setErro('')
  }

  function concluirOrdem(id) {
    setOrdens(listaAtual =>
      listaAtual.map(ordem =>
        ordem.idOrdem === id
          ? { ...ordem, fgConcluida: !ordem.fgConcluida }
          : ordem
      )
    )
  }

  function removerOrdem(id) {
    setOrdens(listaAtual =>
      listaAtual.filter(ordem => ordem.idOrdem !== id)
    )
  }

  const ordensAbertas = ordens.filter(
    ordem => !ordem.fgConcluida
  )

  const valorAberto = ordensAbertas.reduce(
    (total, ordem) => total + ordem.nuValor,
    0
  )

  return (
    <div className="App">
      <h1>ordem de servico</h1>

      <form onSubmit={cadastrarOrdem}>
        <input
          type="text"
          placeholder="cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />

        <input
          type="text"
          placeholder="serviço"
          value={servico}
          onChange={e => setServico(e.target.value)}
        />

        <input
          type="number"
          placeholder="valor"
          min="0"
          step="any"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />

        <button type="submit">cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <div className="resumo">
        <p>total de ordens: {ordens.length}</p>
        <p>ordens em aberto: {ordensAbertas.length}</p>
        <p>valor em aberto: R$ {valorAberto.toFixed(2)}</p>
      </div>

      {ordens.length === 0 ? (
        <p>nenhuma ordem cadastrada.</p>
      ) : (
        <div className="lista">
          {ordens.map(ordem => (
            <Ordem
              key={ordem.idOrdem}
              ordem={ordem}
              concluirOrdem={concluirOrdem}
              removerOrdem={removerOrdem}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
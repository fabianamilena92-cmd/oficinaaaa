import './Ordem.css'

function Ordem({ ordem, concluirOrdem, removerOrdem }) {
  return (
    <div className={ordem.fgConcluida ? 'ordem concluida' : 'ordem'}>
      <h3>{ordem.dsCliente}</h3>

      <p>serviço: {ordem.dsServico}</p>
      <p>valor: R$ {ordem.nuValor.toFixed(2)}</p>

      {ordem.fgConcluida && (
        <p className="selo">Concluída</p>
      )}

      <button
        type="button"
        onClick={() => concluirOrdem(ordem.idOrdem)}
      >
        {ordem.fgConcluida ? 'reabrir' : 'concluir'}
      </button>

      <button
        type="button"
        onClick={() => removerOrdem(ordem.idOrdem)}
      >
        remover
      </button>
    </div>
  )
}

export default Ordem
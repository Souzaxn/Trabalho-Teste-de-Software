import React, { useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState({
    'Segunda-feira': { manha: '', tarde: '', noite: '' },
    'Terça-feira': { manha: '', tarde: '', noite: '' },
    'Quarta-feira': { manha: '', tarde: '', noite: '' },
    'Quinta-feira': { manha: '', tarde: '', noite: '' },
    'Sexta-feira': { manha: '', tarde: '', noite: '' },
    'Sábado': { manha: '', tarde: '', noite: '' },
    'Domingo': { manha: '', tarde: '', noite: '' },
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');
  const [listaTarefas, setListaTarefas] = useState([]); // Armazena as tarefas
  const [testeConcluido, setTesteConcluido] = useState(false); // Verifica se todas as tarefas foram concluídas

  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade,
      },
    }));

    // Adicionar a atividade à lista de tarefas, se não houver mais de 3 tarefas.
    if (listaTarefas.length < 3) {
      setListaTarefas([...listaTarefas, { dia: diaSelecionado, periodo: periodoSelecionado, atividade }]);
    }

    setAtividade(''); // Limpar os campos após adicionar
  };

  const removerAtividade = (dia, periodo) => {
    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [dia]: {
        ...prevEstudos[dia],
        [periodo]: '',
      },
    }));

    // Remove a tarefa da lista
    setListaTarefas(listaTarefas.filter((tarefa) => !(tarefa.dia === dia && tarefa.periodo === periodo)));
  };

  const verificarTarefasCompletas = () => {
    // Verificar se todas as 3 tarefas foram preenchidas
    const tarefasCompletas = listaTarefas.every((tarefa) => {
      const { dia, periodo } = tarefa;
      return estudos[dia][periodo] !== '';
    });

    setTesteConcluido(tarefasCompletas);
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <label>Dia:</label>
        <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
          {diasDaSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label>Período:</label>
        <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>

        <label>O que estudar:</label>
        <br></br>
        <input
          type="text"
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Ex: Matemática"
        />
        <button onClick={adicionarAtividade} disabled={listaTarefas.length >= 3}>
          Adicionar
        </button>
      </div>

      {diasDaSemana.map(dia => (
        <div key={dia} className="dia-container">
          <h2>{dia}</h2>
          <div className="periodo-container">
            <strong>Manhã:</strong> {estudos[dia].manha}
            {estudos[dia].manha && <button onClick={() => removerAtividade(dia, 'manha')}>Remover</button>}
          </div>
          <div className="periodo-container">
            <strong>Tarde:</strong> {estudos[dia].tarde}
            {estudos[dia].tarde && <button onClick={() => removerAtividade(dia, 'tarde')}>Remover</button>}
          </div>
          <div className="periodo-container">
            <strong>Noite:</strong> {estudos[dia].noite}
            {estudos[dia].noite && <button onClick={() => removerAtividade(dia, 'noite')}>Remover</button>}
          </div>
        </div>
      ))}

      <div className="teste-container">
        <h2>Lista de Tarefas</h2>
        <ul>
          {listaTarefas.map((tarefa, index) => (
            <li key={index}>
              {tarefa.dia} - {tarefa.periodo}: {tarefa.atividade}
            </li>
          ))}
        </ul>
        <button onClick={verificarTarefasCompletas}>Verificar se as tarefas foram concluídas</button>
        {testeConcluido !== null && (
          <p>{testeConcluido ? "Todas as 3 tarefas foram concluídas!" : "Ainda há tarefas incompletas."}</p>
        )}
      </div>
    </div>
  );
}

export default App;

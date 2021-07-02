import { Button, IconButton, TextField, Modal } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './styles.scss';

import { FormEvent, useEffect, useState } from 'react';
import api from '../../../infrastructure/services/api/api';
import { useHistory } from 'react-router-dom';
import { StocksType, whiteLogo, token } from '../../../app/common/common';

export function Stocks() {
  const history = useHistory();
  const [idP, setIdP] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [stocks, setStocks] = useState<StocksType[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  async function handleCreateAndEdit(event: FormEvent) {
    event.preventDefault();
    let response;

    if (idP.trim() === '') {
      response = await api.post('', { name }, token);
      setStocks([...stocks, response.data]);
    } else {
      response = await api.put(`${idP}`, { name }, token);
      const index = stocks.findIndex((e) => e._id === idP);
      console.log(index);
      stocks.splice(index, 1, response.data);
      console.log(stocks);
    }

    setIdP('');
    setName('');
    setModal(false);
  }

  async function handleDelete(idP: String) {
    const response = await api.delete(`${idP}`, token);
    if (response) {
      setStocks(stocks.filter((stock) => stock._id !== idP));
    }
  }

  function openModal() {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  function openModalEdit(idParam: string) {
    setIdP(idParam);
    openModal();
  }

  function redirect(id: string) {
    localStorage.setItem('StockId', id);
    history.push('/items');
  }

  useEffect(() => {
    async function getStocks() {
      const response = await api.get('', token);
      setStocks(response.data);
    }
    getStocks();
  }, []);
  console.log(token.headers.authorization);
  return (
    <div className="stocks-container">
      <aside>
        <div className="aside-info">
          <strong>Informações</strong>
          <span>Estoques Criados</span>
          <h2>{stocks.length}</h2>
        </div>
        <div className="logo-frexco">
          <img src={whiteLogo} alt="" />
        </div>
      </aside>
      <main>
        <header>
          <Button onClick={() => openModal()}>Novo Estoque</Button>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Entrar</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <th>{stock._id}</th>
                <th>{stock.name}</th>
                <th>
                  <IconButton
                    onClick={() => redirect(stock._id)}
                    className="enterStockButton"
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </th>
                <th>
                  <IconButton
                    onClick={() => openModalEdit(stock._id)}
                    className="editButton"
                  >
                    <CreateIcon />
                  </IconButton>
                </th>
                <th>
                  <IconButton
                    onClick={() => handleDelete(stock._id)}
                    className="deleteButton"
                  >
                    <DeleteIcon />
                  </IconButton>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Modal open={modal} onClose={() => setModal(false)} className="Modal">
        <div className="modalStock-container">
          <h2>Digite o nome do estoque:</h2>
          <form onSubmit={handleCreateAndEdit}>
            <TextField
              variant="outlined"
              required
              label="Nome"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <Button type="submit">Confirmar</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

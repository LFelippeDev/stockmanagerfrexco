import { Button, IconButton, Modal, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import './styles.scss';

import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import api from '../../../infrastructure/services/api/api';
import { useEffect } from 'react';
import { id, ProductsType, whiteLogo, token } from '../../../app/common/common';
import { AxiosResponse } from 'axios';

export function Items() {
  const history = useHistory();
  const [idP, setIdP] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [inStock, setInStock] = useState<number>(0);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  async function handleCreateAndEdit(event: FormEvent) {
    event.preventDefault();
    let response: AxiosResponse<any>;

    if (idP.trim() === '') {
      response = await api.put(`${id}/Products`, { name, inStock }, token);
      setProducts([...products, response.data]);
    } else {
      response = await api.put(
        `${id}/Products/${idP}`,
        {
          name,
          inStock,
        },
        token
      );
      setProducts(
        products.map((product: ProductsType) => {
          return product._id === idP ? response.data : product;
        })
      );
    }

    setIdP('');
    setName('');
    setInStock(0);
    setModal(false);
  }

  async function handleDelete(idP: String) {
    const response = await api.delete(`${id}/Products/${idP}`, token);
    if (response) {
      setProducts(products.filter((product) => product._id !== idP));
    }
  }

  async function decreaseStock(productParam: ProductsType) {
    if (productParam.inStock === 0) {
      return;
    }

    productParam.inStock = productParam.inStock - 1;
    const idDecrease = productParam._id;
    const response = await api.put(
      `${id}/Products/${idDecrease}`,
      productParam,
      token
    );
    setProducts(
      products.map((product) => {
        return product._id === idDecrease ? response.data : product;
      })
    );
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

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`${localStorage.StockId}/Products`, token);
      setProducts(response.data);
    }
    getProducts();
  }, []);

  return (
    <div className="items-container">
      <aside>
        <div className="aside-info">
          <strong>Informações</strong>
          <span>Produtos Neste Estoque</span>
          <h2>{products.length}</h2>
        </div>
        <Button onClick={() => history.push('/stocks')}>
          Gerenciar estoques
        </Button>
        <div className="logo-frexco">
          <img src={whiteLogo} alt="" />
        </div>
      </aside>
      <main>
        <header>
          <Button onClick={openModal}>Novo Produto</Button>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quant. Estoque</th>
              <th>Remover do estoque (1 un.)</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th>{product._id}</th>
                <th>{product.name}</th>
                <th>{product.inStock}</th>
                <th>
                  <IconButton
                    onClick={() => decreaseStock(product)}
                    className="removeStockButton"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </th>
                <th>
                  <IconButton
                    onClick={() => openModalEdit(product._id)}
                    className="editButton"
                  >
                    <CreateIcon />
                  </IconButton>
                </th>
                <th>
                  <IconButton
                    onClick={() => handleDelete(product._id)}
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
      <Modal open={modal} onClose={openModal} className="Modal">
        <div className="modalItem-container">
          <h2>Digite os dados do produto:</h2>
          <form onSubmit={handleCreateAndEdit}>
            <TextField
              label="Nome"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Quantidade em estoque"
              required
              onChange={(e) => {
                let parsedValue = parseInt(e.target.value);
                setInStock(parsedValue);
              }}
              value={inStock}
            />
            <Button type="submit">Confirmar</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

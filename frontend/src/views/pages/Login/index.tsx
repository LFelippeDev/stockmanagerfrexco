import { TextField, Button } from '@material-ui/core';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logo } from '../../../app/common/common';
import api from '../../../infrastructure/services/api/api';

import './styles.scss';

export function Login() {
  const history = useHistory();
  const [name, setName] = useState<string>('frexco');
  const [password, setPassword] = useState<string>('frexco');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (name.trim() === '' || password.trim() === '') {
      return;
    }

    try {
      const response = await api.post('../Login', { name, password });
      localStorage.setItem('Token', `Bearer ${response.data.token}`);

      history.push('/Stocks');
    } catch (err) {}
  }

  return (
    <div className="container-login">
      <form onSubmit={handleLogin}>
        <img src={logo} alt="Logo Frexco" />
        <TextField
          variant="outlined"
          label="Usuário"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <TextField
          type="password"
          variant="outlined"
          label="Senha"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}

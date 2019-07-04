import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List, Error } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errMsg: 'Repositrio não encontrado...',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repos');

    if (repositories) this.setState({ repositories: JSON.parse(repositories) });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repos', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;
    const msg = 'Repositório duplicado';
    try {
      const isExists = repositories.filter(r => r.full_name === newRepo);

      // eslint-disable-next-line no-throw-literal
      if (isExists.length > 0) throw msg;

      const res = await api.get(`/repos/${newRepo}`);

      const data = {
        name: res.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        error: false,
      });
    } catch (err) {
      this.setState({
        error: true,
        errMsg: err === msg ? msg : 'Repositrio não encontrado...',
      });
    }

    this.setState({ loading: false });
  };

  render() {
    const { newRepo, loading, repositories, error, errMsg } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error && <Error>{errMsg}</Error>}
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhe
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;

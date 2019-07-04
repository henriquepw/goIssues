import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/container';
import { Loading, Owner, IssueList, Buttons, StateSelect } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    issuesState: 'all',
    repoName: '',
    page: 1,
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.setState;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: { page, state: 'all', per_page: 5 },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      repoName,
    });
  }

  componentDidUpdate(_, prevState) {
    const { page, issuesState } = this.state;
    if (page !== prevState.page || issuesState !== prevState.issuesState) {
      this.hanldeIssues();
    }
  }

  hanldeIssues = async () => {
    const { repoName, issuesState, page } = this.state;
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: { page, state: issuesState, per_page: 5 },
    });

    this.setState({ issues: [...issues.data] });
  };

  handleLeft = async () => {
    const { page } = this.state;
    const newPage = page > 1 ? page - 1 : page;
    this.setState({ page: newPage });
  };

  handleRight = async () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  handleSelect = e => {
    this.setState({
      issuesState: e.target.value.toLowerCase(),
    });
  };

  render() {
    const { repository, issues, issuesState, loading, page } = this.state;
    const states = ['All', 'Open', 'Closed'];

    if (loading) return <Loading>Carregando...</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaAngleLeft size="2rem" />
            {'Go to Home'}
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <StateSelect onChange={this.handleSelect} value={issuesState}>
          <p>Issues: </p>
          <select>
            {states.map(state => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </StateSelect>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          {issues.length === 0 && (
            <p className="error">Esse repositório não te issues</p>
          )}
        </IssueList>
        <Buttons left={page === 1} right={issues.length === 0}>
          <FaAngleLeft className="left" size="2rem" onClick={this.handleLeft} />
          <p>{page}</p>
          <FaAngleRight
            className="right"
            size="2rem"
            onClick={this.handleRight}
          />
        </Buttons>
      </Container>
    );
  }
}

export default Repository;

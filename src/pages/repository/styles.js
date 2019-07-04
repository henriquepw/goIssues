import styled, { css } from 'styled-components';

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: flex;
    align-items: center;

    color: #7159c1;
    text-decoration: none;
    font-size: 1.1rem;
    margin-right: auto;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 1.7rem;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 1rem;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 10px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 1.1rem;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 0.9rem;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 0.9rem;
        color: #999;
      }
    }
  }

  .error {
    text-align: center;
    font-weight: bold;
    color: #999;
  }
`;

export const Buttons = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  div {
  }

  svg {
    background: #7159c1;
    border: 0;
    margin: 0 5px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }

  ${({ left }) =>
    left &&
    css`
      .left {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `}

  ${({ right }) =>
    right &&
    css`
      .right {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `}

  p {
    color: #222;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 10px;
  }
`;

export const StateSelect = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-top: 30px;

  select {
    margin-left: 10px;
    color: #fff;
    background: #7159c1;

    border-color: #7159c1;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 1.2rem;
    text-decoration: none;
  }
`;

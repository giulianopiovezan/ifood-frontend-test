import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const Details = styled.div`
  display: flex;

  img {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  article {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      display: block;
      margin-top: 5px;
      font-size: 14px;
      color: #ea1d2c;
      border: 1px solid #ea1d2c;
      width: 100px;
      height: 38px;
      padding: 10px 20px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    h1 {
      font-family: Barlow;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 36px;

      color: #ea1d2c;
      margin-top: 10px;
    }

    .actions {
      display: flex;
      margin-top: 10px;

      > span {
        display: block;
        margin-top: 6px;
        font-size: 18px;
      }

      a {
        text-transform: uppercase;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        border: 0;
        border-radius: 4px;
        padding: 10px;

        &:first-of-type {
          margin: 0 10px 0 0;
        }

        svg {
          margin: 0 8px 0 0;
          color: #fff;
        }

        span {
          font-size: 14px;
          margin: 0;
          padding: 0;
          color: #fff;
          font-weight: 700;
        }

        &:hover {
          filter: brightness(95%);
        }
      }

      a.spotify {
        background: #1db954;
      }

      a.ifood {
        background: #ea1d2c;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    button {
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }

    article {
      margin-top: 8px;
      margin-left: 0;

      h1 {
        margin-top: 10px;
        font-size: 32px;
        font-weight: 600;
      }

      span {
        margin-top: 10px;
      }

      .actions {
        flex-direction: column;

        a {
          width: 100%;

          &:first-of-type {
            margin-bottom: 5px;
          }

          &:hover {
            filter: brightness(95%);
          }
        }
      }
    }
  }
`;

export const Tracks = styled.section`
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;

  h3 {
    margin-bottom: 10px;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  overflow: auto;
  background: #f5f3f4;
  padding: 10px;
  border-radius: 5px;

  .loadingPlaylist {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PlaylistContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
`;

export const PlaylistDetails = styled.div`
  display: flex;

  img {
    width: 250px;
    height: 250px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  article {
    margin-left: 20px;

    strong {
      color: #656060;
    }

    h1 {
      margin-top: 20px;
      font-size: 42px;
      font-weight: 600;
    }

    span {
      display: block;
      margin-top: 14px;
      font-size: 18px;
    }

    a {
      text-decoration: none;
      color: #656060;
      font-weight: 500;
      margin-top: 8px;
      display: block;
    }

    button {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 45px;
      border: 0;
      border-radius: 4px;
      background: #1db954;

      svg {
        margin-left: 5px;
        color: #fff;
      }

      span {
        flex: 1;
        margin: 0;
        padding: 0;
        color: #fff;
        font-weight: 600;
      }

      &:hover {
        opacity: 0.9;
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
      height: 350px;
    }

    article {
      margin-top: 8px;

      h1 {
        margin-top: 10px;
        font-size: 32px;
        font-weight: 600;
      }

      span {
        margin-top: 10px;
      }
    }
  }
`;

export const Tracks = styled.section`
  margin-top: 10px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);

  > div {
    display: flex;
  }
`;

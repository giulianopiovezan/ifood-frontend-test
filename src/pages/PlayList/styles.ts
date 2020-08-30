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

export const Tracks = styled.section`
  margin-top: 10px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);

  > div {
    display: flex;
  }
`;

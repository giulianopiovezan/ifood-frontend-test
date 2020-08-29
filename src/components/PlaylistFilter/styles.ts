import styled from 'styled-components';
import MdContainer from '@material-ui/core/Container';

export const Container = styled(MdContainer)`
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 8px;

  h2 {
    font-size: 50px;
    line-height: 60px;
    text-align: left;
    padding: 20px 0 40px 0;
    font-weight: 700;
    color: #ea1d2c;

    strong {
      color: #000;
    }
  }

  h1 {
    border-bottom: 1px solid #dadada;
    margin-bottom: 8px;
  }

  .btn-search {
    height: 50px;
  }
`;

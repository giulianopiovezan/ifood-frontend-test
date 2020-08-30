import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { mainColor } from 'styles/colors';

export const Container = styled(Grid)`
  display: flex;
  width: 100%;
  padding: 10px;
  border: 1px solid #e4e4e4;
  margin: 5px 0;
  border-radius: 5px;

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      border-radius: 5px;
      margin: 0 10px 0 0;
    }

    p {
      font-weight: 700;
    }

    .album {
      width: 35%;
    }

    .music {
      width: 25%;
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      align-self: center;

      strong {
        font-size: 16px;
        color: ${mainColor};
      }

      span {
        display: block;
        font-size: 12px;
      }

      @media only screen and (max-width: 768px) {
        width: 60%;
      }
    }
  }
`;

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
  &:first-of-type {
    margin-bottom: 8px;
  }

  img {
    border-radius: 5px;
  }

  p {
    font-weight: 700;
  }

  .music {
    display: flex;
    justify-content: flex-start;

    article {
      margin-left: 5px;
      align-self: center;

      strong {
        font-size: 16px;
        color: #ea1d2c;
      }

      span {
        display: block;
        font-size: 12px;
      }
    }
  }

  & + div {
    margin-top: 5px;
  }
`;

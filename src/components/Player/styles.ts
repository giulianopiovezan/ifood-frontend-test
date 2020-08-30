import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { mainColor } from 'styles/colors';

export const Container = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  background: #f5f3f4;
  z-index: 3000;

  img {
    border-radius: 5px;
  }

  p {
    font-weight: 700;
  }

  .music {
    display: flex;
    justify-content: space-between;

    > div {
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
    }

    .playPause {
      display: flex;
      align-items: center;

      button {
        padding: 0;
        height: 30px;
      }

      .timer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;

        span {
          position: absolute;
        }
      }
    }
  }
`;

import styled from 'styled-components';
import { mainColor } from 'styles/colors';

export const HeaderContainer = styled.header`
  background: #f5f3f4;
  padding: 20px 0px;

  h2 {
    font-size: 50px;
    line-height: 60px;
    text-align: left;
    padding: 20px 0 40px 0;
    font-weight: 700;

    strong {
      color: ${mainColor};
    }
  }

  a {
    display: inline-block;
    background: ${mainColor};
    border-radius: 50px;
    padding: 20px 40px;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;

    color: #ffffff;
  }
`;

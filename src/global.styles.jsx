import styled, { createGlobalStyle } from "styled-components";
import { Colors } from './app/common/typography/typography.styles';
import { MediaQueries } from './media-queries.styles';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  h1,h2,h3,p {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: Montserrat, "Open Sans", sans-serif;
    background-color: ${Colors.grayLight3};
    margin: 0;
  }

  ${MediaQueries};
`;

export const AppContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 4.4rem;
`
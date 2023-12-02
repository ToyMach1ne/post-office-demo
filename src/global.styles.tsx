import styled, { createGlobalStyle, css } from "styled-components";
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
    background-color: ${Colors.blueLight4};
    margin: 0;
  }

  ${MediaQueries};
`;

interface Props {
  mr?: string;
  ml?: string;
  mt?: string;
  mb?: string;
}

export const BaseContainerWithMargins = styled.div<Props>`
  ${({mr}) => mr && css`
      margin-right: ${mr};
  `}

  ${({ml}) => ml && css`
      margin-left: ${ml};
  `}

  ${({mt}) => mt && css`
      margin-top: ${mt};
  `}

  ${({mb}) => mb && css`
      margin-bottom: ${mb};
  `}
`


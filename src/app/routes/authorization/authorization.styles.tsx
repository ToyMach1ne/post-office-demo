import styled from "styled-components";
import { Colors, HeaderMain } from "../../common/typography/typography.styles";

export const AuthContainer = styled.div`
  max-width: 69rem;
  height: 80rem;
  margin: 5vh auto 60px;
  background-color: ${Colors.white};
  padding: 5rem 11rem 11rem 11rem;
  border-radius: 30px;

  ${HeaderMain} {
    text-align: center;
  }
`
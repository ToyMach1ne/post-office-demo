import styled from "styled-components";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { BaseButton } from "../../../common/button/button.styles";

export const ParcelCreationProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  min-width: 22rem;

  ${HeaderSecondary} {
    margin-bottom: 2.4rem;
  }

  ${BaseButton} {
    margin-top: 4rem;
  }
`
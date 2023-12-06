import styled from "styled-components";
import { Colors, HeaderSecondary } from "../../../common/typography/typography.styles";
import { BaseButton } from "../../../common/button/button.styles";
import { SidebarButtonClose } from "../../../common/sidebar-right/sidebar.styles";

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

export const ParcelCreationMobileHeader = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${Colors.grayLight4};

  ${SidebarButtonClose} {
    position: absolute;
    right: 0;
    top: 0;
  }
`

export const ParcelCreationProgressMobileContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  background-color: ${Colors.white};
  position: absolute;
  top: -11.4rem;
  left: -1.6rem;
  width: 100vw;
  padding: 1rem 1.6rem;
`
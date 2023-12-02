import styled, { css } from "styled-components";
import { Colors, FontSizes, TextLabel } from "../../../common/typography/typography.styles";

interface Props {
  isActive: boolean
}

export const ParcelStepNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${FontSizes.small};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: .5;
  color: ${Colors.gray5};

  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: ${Colors.gray5};
`

export const ParcelStepTitleContainer = styled.div<Props>`
  ${({isActive}) => isActive 
    ? css`
      ${ParcelStepNumber} {
        border-color: ${Colors.blue};
        color: ${Colors.blue};
      }

      ${TextLabel} {
        color: ${Colors.blue}
      }
    `
    : css`
      ${TextLabel} {
        color: ${Colors.gray5}
      }
    `
  }
`

export const ParcelStepTitleBody = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
`

export const ParcelStepSeparator = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 12px;
  height: 12px;
  width: 1px;
  background-color: ${Colors.gray5};
`

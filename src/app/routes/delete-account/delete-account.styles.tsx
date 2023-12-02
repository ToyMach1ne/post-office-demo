import styled from 'styled-components';
import { TextBody as OriginalTextBody } from "../../common/typography/typography.styles";
import { FontSizes } from "../../common/typography/typography.styles"
import { Modal } from 'antd';

export const DeleteAccountContainer  = styled.div``;

export const TextBody = styled(OriginalTextBody)`
  margin: ${FontSizes.medimPlus} 0;
`;

export const ButtonContainer = styled.div`
  width: 40%;
  max-width: 100%;

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const DeleteModal = styled(Modal)`
    padding: 2rem 2.5rem;
    text-align: center;
    font-family: Montserrat, "Open Sans", sans-serif;
    
   .ant-modal-body button:first-of-type {
    margin-bottom: 1rem;
  }

  .ant-modal-content {
    padding: 1.6rem 1.2rem;
  }

  .ant-modal-close {
    top: 1rem;
    right: 1rem;
  }
  
  @media(max-width: 390px) {
    padding: 1.4rem;
    
    .ant-modal-close {
      right: 0.6rem;
    }
  }
`;

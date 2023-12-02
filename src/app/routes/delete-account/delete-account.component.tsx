import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { HeaderSecondary } from "../../common/typography/typography.styles";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import {DeleteAccountContainer, TextBody, DeleteModal, ButtonContainer} from "./delete-account.styles";
import { ServicesSubSectionContainer } from "../../features/services/services-subsection/services-subsection.styles";

const DeleteAccount = () => {
    const { userStore: { user, deleteAccount }, commonStore: { firebaseUuid, firebaseToken } } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteAccount = () => {
        setIsModalOpen(false);
        deleteAccount({firebaseUuid, firebaseToken});
    }

    if (!user) return null;

    return (
        <DeleteAccountContainer as={ServicesSubSectionContainer}>
            <HeaderSecondary>Delete account</HeaderSecondary>
            <TextBody>
                By deleting your account, you will lose all your personal data, settings and access to your parcels, except data in the created parcels.
                To restore access to your parcels, you will need to register again.
            </TextBody>
            <ButtonContainer>
                <Button buttonType={BUTTON_TYPES.inverted_danger} onClick={showModal}>Delete account</Button>
            </ButtonContainer>
            <DeleteModal width={400} onCancel={() => setIsModalOpen(false)} footer={null} open={isModalOpen}>
                <HeaderSecondary>Are you sure you want to remove your account?</HeaderSecondary>
                <TextBody>
                    By deleting your account, you will lose all your personal data, settings and access to your parcels, except data in the created parcels.
                    To restore access to your parcels, you will need to register again.
                </TextBody>
                <Button buttonType={BUTTON_TYPES.danger} onClick={() => handleDeleteAccount()}>Yes, remove my account</Button>
                <Button buttonType={BUTTON_TYPES.neutral} onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </DeleteModal>
        </DeleteAccountContainer>
    );
};

export default observer(DeleteAccount);

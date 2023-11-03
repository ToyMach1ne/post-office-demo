import { observer } from "mobx-react-lite";
import { AuthContainer } from "./authorization.styles";

import AuthTabs from "../../components/auth-tabbed-container/auth-tabbed-container.component";
import SignUpEmailSent from "../../components/sign-up/sign-up-email-sent.component";

import { useStore } from "../../stores/store";
import PasswordRestore from "../../components/password-restore/password-restore.component";
import RestoreEmailSent from "../../components/password-restore/restore-email-sent.component";

const Authorization = () => {

  const { navStore: { signUpEmailSentShown, passwordResetEmailSentShown, passwordResetFormShown } } = useStore();

  return (
    <AuthContainer>
      {signUpEmailSentShown
        ? <SignUpEmailSent />
        : passwordResetFormShown
          ? <PasswordRestore />
          : passwordResetEmailSentShown
            ? <RestoreEmailSent />
            : <AuthTabs />
      }
    </AuthContainer>
  )
}

export default observer(Authorization);
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authorization from "./app/routes/authorization/authorization.component";
import EmailActionRouter from "./app/routes/email-action-router/email-action-router.component";
import PersonalData from "./app/routes/personal-data/personal-data.component";
import Preferences from "./app/routes/preferences/preferences.component";
import Services from "./app/routes/services/services.component";
import SecuritySettings from "./app/routes/security-settings/security-settings.component";
import NotFound from "./app/routes/not-found/not-found.component";
import ServerError from "./app/routes/server-error/server-error.component";
import ComingSoon from "./app/routes/coming-soon/coming-soon.component";
import ParcelDetails from "./app/routes/parcel-details/parcel-details.component";
import ParcelCreation from "./app/routes/parcel-creation/parcel-creation.component";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // { path: 'activities', element: <ActivityDashboard /> },
      // { path: 'activities/:id', element: <ActivityDetails /> },
      // { path: 'createActivity', element: <ActivityForm key='create' /> },
      // { path: 'manage/:id', element: <ActivityForm key='manage' /> },
      { path: 'auth', element: <Authorization /> },
      { path: 'auth/action', element: <EmailActionRouter /> },
      { path: 'not-found', element: <NotFound />},
      { path: 'server-error', element: <ServerError />},
      { path: 'coming-soon', element: <ComingSoon />},
      { path: 'services', element: <Services />,
        children: [
          { path: 'personaldata', element: <PersonalData />},
          { path: 'preferences', element: <Preferences />},
          { path: 'securitysettings', element: <SecuritySettings />},
          { path: 'parcel/create', element: <ParcelCreation />,
            children: [
              { path: 'step-1', element: <ParcelDetails /> },
            ]
          },
        ]
      },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ]
  }
]

export const router = createBrowserRouter(routes);

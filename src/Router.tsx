import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authorization from "./app/routes/authorization/authorization.component";
import CloudPasswordRestore from "./app/routes/password-cloud-restore/password-cloud-restore.component";
import CloudRestorePasswordSuccess from "./app/routes/password-cloud-restore/password-restore-success.component"

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
      { path: 'auth/pswd', element: <CloudPasswordRestore /> },
      { path: 'auth/pswd/success', element: <CloudRestorePasswordSuccess /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ]
  }
]

export const router = createBrowserRouter(routes);
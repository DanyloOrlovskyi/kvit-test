import { rootStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = observer(() => {
  const location = useLocation();

  if (!rootStore.auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
});

export default ProtectedRoute;

import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router';

import ProtectedRoute from './routes/ProtectedRoute';

import AppLayout from './layouts/AppLayout';

import AuthPage from './pages/AuthPage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';

const App = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<MapPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;

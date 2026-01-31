import { rootStore } from '@/stores';
import EmptyMapView from './EmptyMapView';
import FilledMapView from './FilledMapView';

const MapView = () => {
  const isAuthenticated = rootStore.auth.isAuthenticated;

  return <>{isAuthenticated ? <FilledMapView /> : <EmptyMapView />}</>;
};

export default MapView;

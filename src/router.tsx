import {createBrowserRouter} from 'react-router';

import AppHeader from './components/AppHeader.tsx';
import AuthDialog from './components/AuthDialog';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';

import {Box, Drawer} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {Outlet} from 'react-router';
import {rootStore} from './stores';

const ProtectedLayout = observer(() => {

    const drawerWidth = window.innerWidth > 600 ? 310 : 0;

    return (
        <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <AppHeader/>
            <Box sx={{flex: 1, display: 'flex', overflow: 'hidden', zIndex: 2}}>
                <Box
                    sx={{
                        flex: 1,
                        transition: (theme) => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        mr: rootStore.sidebar.isOpen ? 0 : 0,
                        width: '100%'
                    }}
                >
                    <MapView/>
                </Box>
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={rootStore.sidebar.isOpen}
                    sx={{
                        width: drawerWidth,
                        borderLeft: 1,
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }}
                >
                    <Sidebar/>
                </Drawer>
            </Box>
        </Box>
    );
});

const AuthGuard = observer(() => {
    if (rootStore.auth.isAuthenticated) {
        return <Outlet/>;
    }

    return <AuthDialog/>;
});

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthGuard/>,
        children: [
            {
                index: true,
                element: <ProtectedLayout/>,
            },
        ],
    },
]);

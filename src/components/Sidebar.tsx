import {GpsFixed, GpsOff, Menu as MenuIcon, MenuOpen, Navigation as NavigationIcon} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Chip, IconButton,
    List,
    ListItem,
    ListItemText, Tooltip,
    Typography,
} from '@mui/material';

import {useEffect, useState} from 'react';

import {rootStore} from '@/stores';

const Sidebar = () => {
    const [currentTime, setCurrentTime] = useState(() => Date.now());

    const {activeObjects, lostObjects} = rootStore.objectTracker;

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Tooltip
                title={rootStore.sidebar.isOpen ? 'Скрыть панель' : 'Показать панель'}
            >
                <IconButton
                    color="inherit"
                    onClick={rootStore.sidebar.handleToggleSidebar}
                    sx={{
                        ml: 0,
                        position: 'absolute',
                        width: 'min-content',
                        height: 'min-content',
                        left: '-33px',
                        top: '18px',
                        backgroundColor: 'background.paper',
                        borderRadius: '8px 0 0 8px',
                        borderLeft: 2,
                        borderTop: 2,
                        borderBottom: 2,
                        paddingRight: 0,
                        borderColor: 'divider',
                        display: {xs: 'flex', sm: 'none'},
                        '&:hover': {
                            backgroundColor: 'background.default',
                        },
                    }}
                >
                    {rootStore.sidebar.isOpen ? <MenuOpen/> : <MenuIcon/>}
                </IconButton>
            </Tooltip>
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderLeft: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    top: '64px',
                    height: 'calc(100vh - 64px)',
                }}
            >
                <Box sx={{p: 2, overflow: 'hidden'}}>
                    <Card variant="outlined" sx={{mb: 2}}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Статистика
                            </Typography>
                            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                <Chip
                                    icon={<GpsFixed/>}
                                    label={`Активні: ${activeObjects.length}`}
                                    color="success"
                                    variant="outlined"
                                />
                                <Chip
                                    icon={<GpsOff/>}
                                    label={`Втрачені: ${lostObjects.length}`}
                                    color="error"
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{flex: 1, overflow: 'auto', px: 2, pb: 2}}>
                    {activeObjects.length > 0 && (
                        <Box sx={{mb: 2}}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                                sx={{textTransform: 'uppercase', fontWeight: 600}}
                            >
                                Активні об'єкти
                            </Typography>
                            <List dense>
                                {activeObjects.map((obj) => (
                                    <ListItem
                                        key={obj.id}
                                        sx={{
                                            bgcolor: 'success.50',
                                            mb: 0.5,
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'success.200',
                                        }}
                                    >
                                        <NavigationIcon
                                            sx={{
                                                mr: 1,
                                                fontSize: 20,
                                                transform: `rotate(${obj.direction}deg)`,
                                                color: 'success.main',
                                            }}
                                        />
                                        <ListItemText
                                            primary={obj.id}
                                            secondary={`${obj.lat.toFixed(4)}, ${obj.lng.toFixed(4)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}

                    {lostObjects.length > 0 && (
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                                sx={{textTransform: 'uppercase', fontWeight: 600}}
                            >
                                Втрачені об'єкти
                            </Typography>
                            <List dense>
                                {lostObjects.map((obj) => (
                                    <ListItem
                                        key={obj.id}
                                        sx={{
                                            bgcolor: 'error.50',
                                            mb: 0.5,
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'error.200',
                                        }}
                                    >
                                        <GpsOff sx={{mr: 1, fontSize: 20, color: 'error.main'}}/>
                                        <ListItemText
                                            primary={obj.id}
                                            secondary={`Втрачено ${Math.floor(
                                                (currentTime - obj.lastUpdate) / 1000
                                            )}с тому`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Sidebar;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { rootStore } from '@/stores';
import { useNavigate } from 'react-router';

const AuthPage = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const result = rootStore.auth.checkApiKey(key);
    if (!result.success) {
      setError('Невірний API ключ');
      return;
    }
    return navigate('/');
  };

  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Dialog maxWidth="sm" fullWidth open={true}>
        <DialogTitle>Авторизація</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Введіть ваш унікальний API ключ для доступу до системи
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="API Key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            error={!!error}
            helperText={error ?? 'Для демо використайте будь-який ключ (мін. 8 символів)'}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Увійти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthPage;

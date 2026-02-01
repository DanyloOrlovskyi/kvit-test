import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';

function NotFoundPage() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          animation: 'fadeIn 1.2s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ mb: 4, color: theme.palette.error.main }}>
          <ErrorOutlineIcon sx={{ fontSize: { xs: 100, md: 140 }, opacity: 0.15, mb: 4 }} />
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: { xs: '6rem', md: '9rem' },
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: theme.palette.text.primary,
              mt: -6,
            }}
          >
            404
          </Typography>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Сторінка не знайдена
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeRoundedIcon />}
            component={RouterLink}
            to="/"
            sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
          >
            Вернутися на головну
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFoundPage;

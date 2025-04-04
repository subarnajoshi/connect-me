import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
          onClick={() => navigate('/')}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease-in-out'
              },
              '&:hover::after': {
                transform: 'scaleX(1)'
              }
            }}
          >
            Connect-me
          </Typography>
        </Box>
        <Box>
          <Button 
            color="inherit" 
            onClick={() => navigate('/signup')}
            sx={{ 
              mr: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Sign Up
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '20px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }
            }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
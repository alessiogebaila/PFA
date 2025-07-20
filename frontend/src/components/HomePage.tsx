import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Fade,
} from '@mui/material';
import {
  BusinessCenter,
  Schedule,
  Email,
  Phone,
  AccountBalance,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Contabilitate Generală',
      description: 'Servicii complete de contabilitate pentru PFA și societăți comerciale.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Consultanță Fiscală',
      description: 'Optimizare fiscală și consultanță în domeniul fiscal și financiar.',
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Înființare PFA',
      description: 'Te ajutăm să-ți înființezi PFA-ul rapid și fără complicații.',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(45deg, #1976d2, #42a5f5)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            PFA Contabilitate
          </Typography>
          <Button color="inherit" onClick={() => navigate('/services')}>
            Servicii
          </Button>
          <Button color="inherit" onClick={() => navigate('/prices')}>
            Prețuri
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            sx={{ ml: 2 }}
            onClick={() => navigate('/appointment')}
          >
            Programează-te
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                }}
              >
                Servicii Contabilitate PFA
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 300,
                }}
              >
                Soluții profesionale de contabilitate pentru afacerea ta
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/appointment')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  backgroundColor: '#ff6b6b',
                  '&:hover': {
                    backgroundColor: '#ff5252',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Programează o Consultație
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold', color: '#333' }}
        >
          Serviciile Noastre
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {services.map((service, index) => (
            <Box key={index} sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <Fade in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                De ce să ne alegi?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Cu peste 10 ani de experiență în domeniul contabilității, oferim servicii 
                profesionale și personalizate pentru fiecare client. Echipa noastră de 
                experți te va ghida în toate aspectele financiare ale afacerii tale.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: '#1976d2' }} />
                <Typography>alessio.andrei276@gmail.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 2, color: '#1976d2' }} />
                <Typography>+40 XXX XXX XXX</Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                component="img"
                src="/api/placeholder/500/400"
                alt="Contabilitate profesională"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#333', color: 'white', py: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2">
            © 2025 PFA Contabilitate. Toate drepturile rezervate.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

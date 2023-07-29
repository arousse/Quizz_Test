/* eslint-disable react-hooks/exhaustive-deps*/
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function TemplatePage() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Dashboard
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            onClick={() => {
              navigate('/statistics');
            }}
          >
            Statistiken
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Grüner Daumen
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Teste dein Wissen im Bereich der Natur
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center"></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?nature"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Allgemeinwissen zur Natur
                  </Typography>
                  <Typography>Fragen allgemein zur Natur</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/natur');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?potato"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    die Kartoffel
                  </Typography>
                  <Typography>Fragen zur Kartoffel</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/kartoffel');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?harvest"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Ernte- und Saatzeit
                  </Typography>
                  <Typography>Quiz Fragen zu Ernte- und Saatzeit</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/ernte');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?plant"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Pflanzenidentifikation
                  </Typography>
                  <Typography>Quiz rund um das Thema Pflanzen Identifikation</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/pflanzenidentifikation');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?Caterpillar"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Krankheiten und Schädlinge
                  </Typography>
                  <Typography>Fragen über Schädling und Nützling</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/schädlingnützling');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?herbs"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Nützlinge und Heilkräuter
                  </Typography>
                  <Typography>Beantworte Fragen zu Kräutern</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/kräuter');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image="https://source.unsplash.com/random?map"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Geographisches Vorkommen
                  </Typography>
                  <Typography>Ein Quiz zum Thema Geographisches Vorkommen</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/geographischesvorkommen');
                    }}
                    size="small"
                  >
                    Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Learning Website
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

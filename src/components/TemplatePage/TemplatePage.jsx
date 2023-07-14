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
            Welcome Page
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
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
              Grüne Daum 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Description from the app and what it does 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
               
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?nature"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Allgemeinwissen zur Natur
                    </Typography>
                    <Typography>
                      This is a topic of nature knowledge
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/AllgemeinwissenZurNatur");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?potato"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     die Kartoffel
                    </Typography>
                    <Typography>
                      This is a topic for potato knowledge
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/Kartoffel");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?harvest"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     Ernte- und Saatzeit
                    </Typography>
                    <Typography>
                      This is a topic for Ernte- und Saatzeit
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/ErnteundSaatzeit");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?Pflanzenidentifikation"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Pflanzenidentifikation
                    </Typography>
                    <Typography>
                      This is a topic for identifiying Plants
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/Pflanzenidentifikation");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?seekplant"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Krankheiten und Schädlinge
                    </Typography>
                    <Typography>
                      This is a topic for seekness and damaged Plants
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/KrankheitenundSchädlinge");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?medicinalherbs"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Nützlinge und Heilkräuter
                    </Typography>
                    <Typography>
                      This is a topic for Nützlinge und Heilkräuter
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/NützlingeundHeilkräuter");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
                  </CardActions>
                </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}><Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?GeographischesVorkommen"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Geographisches Vorkommen
                    </Typography>
                    <Typography>
                      This is a topic for Geographisches Vorkommen
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick = {() =>{
                      navigate("/GeographischesVorkommen");
                    }} 
                    size="small">Quiz</Button>
                    <Button
                    onClick = {() =>{
                      navigate("/learn");
                    }} 
                    size="small">Learn</Button>
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
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
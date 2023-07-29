import { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import httpService from '../../utils/http-service';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const StatisticComponent = () => {
  const [getStatistic, setStatistic] = useState([]);
  // let time;

  useEffect(() => {
    if (getStatistic.length > 0) return;
    httpService
      .getJSON(`api/statistic/user/${sessionStorage.getItem('userid')}`, {})
      .then((response) => response.json())
      .then((data) => {
        setStatistic(data);
      });
  });

  const getMostFrequent = (arr) => {
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b));
  };

  const basicStatistic = () => {
    // let timeToAnswer = 0;
    let domains = [];
    const lableMap = [
      { key: 'ernte', value: 'Ernte' },
      { key: 'geographischesvorkommen', value: 'Geographisches Vorkommen' },
      { key: 'kartoffel', value: 'Kartoffeln' },
      { key: 'kräuter', value: 'Kräuter' },
      { key: 'natur', value: 'Natur' },
      { key: 'pflanzenidentifikation', value: 'Pflanzen Identifikation' },
      { key: 'schädlingnützling', value: 'Schädling Nützling' }
    ];
    getStatistic.forEach((el) => {
      // timeToAnswer += el.time;
      if (el.numRightAnswer > el.numWrongAnswer) {
        domains.push(el.domain);
      }
    });

    // time = Math.round(timeToAnswer / getStatistic.length);
    return (
      <div id="basic-container">
        <p className="basic">Fragen beantwortet: {getStatistic.length || 0}</p>
        <p className="basic">
          Beste Domain:{' '}
          {domains.length > 0
            ? lableMap.find((el) => el.key === getMostFrequent(domains)).value
            : ''}{' '}
        </p>
      </div>
    );
  };

  // souce https://codesandbox.io/s/chartjs-area-chart-p1o023?file=/App.tsx:273-424
  const advancedStatistic = () => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler,
      ArcElement
    );

    const options = {
      responsive: true,
      tension: 0.3
    };
    const labels = [
      'Ernte',
      'Geographisches Vorkommen',
      'Kartoffel',
      'Kräuter',
      'Natur',
      'Pflanzen Identifikation',
      'Schädling Nützling'
    ];
    const dummyLabels = [
      'ernte',
      'geographischesvorkommen',
      'kartoffel',
      'kräuter',
      'natur',
      'pflanzenidentifikation',
      'schädlingnützling'
    ];
    const corrects = [];
    const inCorrects = [];
    let correctTime = 0;
    let inCorrectTime = 0;
    dummyLabels.forEach((entry) => {
      let correctAnswers = 0;
      let inCorrectAnswers = 0;
      getStatistic.forEach((el) => {
        if (entry === el.domain) {
          if (el.numRightAnswer > el.numWrongAnswer) {
            correctAnswers += 1;
            correctTime += el.time;
          }
          if (el.numRightAnswer < el.numWrongAnswer) {
            inCorrectAnswers += 1;
            inCorrectTime += el.time;
          }
        }
      });
      corrects.push(correctAnswers);
      inCorrects.push(inCorrectAnswers);
    });
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Falsch Beantwortet',
          data: inCorrects,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 0, 0)',
          fill: {
            target: 'origin',
            above: 'rgba(255, 0, 0, 0.3)'
          }
        },
        {
          label: 'Richtig Beantwortet',
          data: corrects,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.3)',
          fill: 'origin'
        }
      ]
    };
    const DoughnutData = {
      labels: ['Falsch', 'Richtig'],
      datasets: [
        {
          label: 'Zeit in Sekunde',
          data: [inCorrectTime / inCorrects.length, correctTime / corrects.length],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
          borderColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
          borderWidth: 1
        }
      ]
    };

    return (
      <>
        <h2>Richtig vs Falsch</h2>
        <Line options={options} data={chartData} />
        <h2>Zeit je Antwort</h2>
        <div>
          <Doughnut data={DoughnutData}> </Doughnut>
        </div>
      </>
    );
  };

  return (
    <section id="statistic">
      {basicStatistic()}
      {advancedStatistic()}
    </section>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function TemplatePage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <a id="link" href="http://localhost:3000">
              Dashboard
            </a>
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            Statistiken
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
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
              Statistiken
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Deine bisherigen Leistungen
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center"></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <StatisticComponent />
        </Container>
      </main>
    </ThemeProvider>
  );
}

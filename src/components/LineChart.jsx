import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  if (!coinHistory || !coinHistory.data || !coinHistory.data.history) {
    console.error('Invalid coinHistory data structure:', coinHistory);
    return null;
  }

  const coinPrice = [];
  const coinTimestamp = [];

  console.log(coinHistory);

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(moment(coinHistory?.data?.history[i].timestamp).format('YYYY-MM-DD'));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Price in USD',
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

import {Line} from 'react-chartjs-2';
import {Typography, Col, Row, Select} from 'antd';
import {useEffect, useState} from "react";

const {Title, Text} = Typography;
export default function LineChart({coinHistory, currentPrice, coinName}) {

    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const coinPrice = [];
        const coinTimestamp = [];

        for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
            coinPrice.push(coinHistory.data.history[i].price);
            coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
        }

        setChartData({
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
        });
        setLoading(false);
    }, [coinHistory]);

    if (loading) return 'Loading...';

    const options = {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                type: 'line',
                adapters: {
                    date: {
                        parser: 'MM/DD/YYYY',
                        tooltipFormat: 'll'
                    }
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }
        }
    };



    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            {chartData && <Line data={chartData} options={options}/>}
            {/*<Select*/}
            {/*    defaultValue="7d"*/}
            {/*    className="select-timeperiod"*/}
            {/*    placeholder="Select Time Period"*/}
            {/*>*/}
            {/*    <Option value="24h">24h</Option>*/}
            {/*    <Option value="7d">7d</Option>*/}
            {/*    <Option value="30d">30d</Option>*/}
            {/*    <Option value="1y">1y</Option>*/}
            {/*    <Option value="5y">5y</Option>*/}
            {/*</Select>*/}
        </>
    );
}
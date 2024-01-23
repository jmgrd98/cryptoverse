import HTMLReactParser from "html-react-parser";
import {useParams} from "react-router-dom";
import millify from "millify";
import {Col, Row, Typography, Select} from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    CheckOutlined,
    MessageOutlined
} from "@ant-design/icons";
import {useEffect, useState} from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from "../services/cryptoApi";

const {Title, Text} = Typography;
const {Option} = Select;

export default function CryptoDetails() {


    const {coinId} = useParams();

    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const  coinHistoryData = useGetCryptoHistoryQuery({coinId, timePeriod});
    const cryptoDetails = data?.data?.coin;
    const coinHistory = coinHistoryData?.data?.data?.history?.map(item => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        Time: new Date(item.timestamp).toLocaleTimeString(),
        Price: item.price,
      }));
    useEffect(() => {
        console.log('COIN HISTORY DATA', coinHistoryData)
        console.log('COIN HISTORY', coinHistory)
    }, [])

    if(isFetching) return 'Loading...';

    const time = ['3h', '24h', '7d', '30d', '1y', '5y'];

    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: 'Rank',
            value: cryptoDetails?.rank,
            icon: <NumberOutlined/>
        },
        {
            title: '24h Volume',
            value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`,
            icon: <ThunderboltOutlined/>
        },
        {
            title: 'Market Cap',
            value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: 'All-time-high(daily avg.)',
            value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`,
            icon: <TrophyOutlined/>
        }
    ];

    const genericStats = [
        {
            title: 'Number Of Markets',
            value: cryptoDetails?.numberOfMarkets,
            icon: <FundOutlined/>
        },
        {
            title: 'Number Of Exchanges',
            value: cryptoDetails?.numberOfExchanges,
            icon: <MoneyCollectOutlined/>
        },
        {
            title: 'Approved Supply',
            value: cryptoDetails?.approvedSupply ? <StopOutlined/> : <CheckOutlined/>,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Total Supply',
            value: `$ ${millify(cryptoDetails?.supply.max)}`,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Circulating Supply',
            value: `$ ${millify(cryptoDetails?.supply.circulating)}`,
            icon: <ExclamationCircleOutlined/>
        }
    ];


    if (isFetching) return 'Loading...';


    return (
        <Col className={'coin-detail-container'}>
            <Col className={'coin-heading-container'}>
                <Title level={2} className={'coin-name'}>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails?.name} live price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue={'7d'}
                className={'select-timeperiod'}
                placeholder={'Select Time Period'}
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => <Option key={crypto.randomUUID()}>{date}</Option>)}
            </Select>

            <LineChart
                width={550}
                height={275}
                data={coinHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="price"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Time" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Price" stroke="#82ca9d" />
            </LineChart>


            <Col className={'stats-container'}>
                <Col className={'coin-value-statistics'}>
                    <Col className={'coin-value-statistics-heading'}>
                        <Title level={3} className={'coin-details-heading'}>
                            {cryptoDetails?.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote
                            currency, the rank, and trading volume.
                        </p>
                    </Col>
                    {stats.map(({icon, title, value}) => (
                        <Col key={crypto.randomUUID()} className={'coin-stats'}>
                            <Col className={'coin-stats-name'}>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className={'stats'}>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className={'other-stats-info'}>
                    <Col className={'coin-value-statistics-heading'}>
                        <Title level={3} className={'coin-details-heading'}>
                            Other Stats Info
                        </Title>
                        <p>
                            An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote
                            currency, the rank, and trading volume.
                        </p>
                    </Col>
                    {genericStats.map(({icon, title, value}) => (
                        <Col key={crypto.randomUUID()} className={'coin-stats'}>
                            <Col className={'coin-stats-name'}>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className={'stats'}>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className={'coin-desc-link'}>
                <Row className={'coin-desc'}>
                    <Title level={3} className={'coin-details-heading'}>
                        What is {cryptoDetails?.name}
                    </Title>
                    <Title level={4}>{HTMLReactParser(cryptoDetails?.description)}</Title>
                </Row>
                <Col className={'coin-links'}>
                    <Title level={3} className={'coin-details-heading'}>
                        {cryptoDetails?.name} Links
                    </Title>
                    {cryptoDetails?.links?.map((link) => (
                        <Row className={'coin-link'} key={crypto.randomUUID()}>
                            <Title level={5} className={'link-name'}>
                                {link.type}
                            </Title>
                            <a href={link.url} target={'_blank'} rel={'noreferrer'}>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
}
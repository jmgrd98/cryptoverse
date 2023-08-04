import {Select, Typography, Card, Row, Col, Avatar} from "antd";
import moment from "moment";
import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi.js";
import {useState} from "react";
import {useGetCryptosQuery} from "../services/cryptoApi.js";

const {Text, Title} = Typography;
const {Option} = Select;

export default function News({ simplified }) {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const { data } = useGetCryptosQuery(100);
    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});


    if(!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className={'select-news'}
                        placeholder={'Select a Crypto'}
                        optionFilterProp={'children'}
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value={'Cryptocurrency'}>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin, i) => (
                            <Option value={coin.name} key={i}>{coin.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className={'news-card'}>
                        <a href={news.url} target={'_blank'} rel={'noreferrer'}>
                            <div className={'news-image-container'}>
                                <Title className={'news-title'} level={4}>{news.name}</Title>
                                <img src={news?.image?.thumbnail?.contentUrl || 'https://www.cryptocompare.com/media/37746251/untitled-1.png'} alt={'news'} style={{maxWidth: '200px', maxHeight: '100px'}}/>
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className={'provider-container'}>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || 'https://www.cryptocompare.com/media/37746251/untitled-1.png'} alt={'news'}/>
                                    <Text className={'provider-name'}>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

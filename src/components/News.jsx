import {Select, Typography, Card, Row, Col, Avatar} from "antd";
import moment from "moment";
import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi.js";

const {Text, Title} = Typography;
const {Option} = Select;

export default function News({ simplified }) {

    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count: simplified ? 10 : 100});

    if(!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[24, 24]}>
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

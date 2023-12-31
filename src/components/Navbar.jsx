
import {Button, Menu, Typography, Avatar} from "antd";
import {Link} from "react-router-dom";
import icon from '../images/cryptocurrency.png';
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from "@ant-design/icons";

export default function Navbar() {
    return (
        <div className={'nav-container'}>
            <div className={'logo-container'}>
                <Avatar src={icon} size={'large'}/>
                <Typography.Title level={2} className={'logo'}>
                    <Link to={'/'}>Cryptoverse</Link>
                </Typography.Title>
            </div>
                <Menu theme={'dark'}>
                    <Menu.Item key={1} icon={<HomeOutlined/>}>
                        <Link to={'/'}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key={2} icon={<FundOutlined/>}>
                        <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key={3} icon={<MoneyCollectOutlined/>}>
                        <Link to={'/exchanges'}>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item key={4} icon={<BulbOutlined/>}>
                        <Link to={'/news'}>News</Link>
                    </Menu.Item>
                </Menu>


                        {/*<Button className={'menu-control-container'}>*/}
                        {/*    */}
                        {/*</Button>*/}
            </div>
);
}
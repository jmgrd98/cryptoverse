import {Route, Routes, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
// import { Navbar } from "./components";
import {Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News} from './components';
import './App.css';

function App() {

    return (
        <div className="app">
            <div className='navbar'>
                <Navbar/>
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route exact path='/' element={<Homepage/>}/>
                            <Route exact path='/exchanges' element={<Exchanges/>}/>
                            <Route exact path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                            <Route exact path='/crypto/:cryptoId' element={<CryptoDetails/>}/>
                            <Route exact path='/news' element={<News/>}/>
                        </Routes>
                    </div>
                </Layout>
            </div>
            <div className='footer'>

            </div>
        </div>
    )
}

export default App

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer.jsx';
import Hero from './hero.jsx';
import Ticker from '../models/ticker';
import Toolbar from './toolbar.jsx';
import Wallet from '../models/wallet';
import './styles/index.scss';

/**
 * mysiacoin.com App
 * @author Rocco Augusto <@therocco>
 */
class App extends React.Component {
    /**
     * @param {object} props user supplied props
     */
    constructor(props) {
        super(props);

        this.state = {
            wallet: {}, // blank object / placeholder
            ticker: {}, // blank object / placeholder
            donate: [
                { name: 'SiaCoin', image: '/img/donate_sc.png', address: '4f61cdd4820023a2a9d7c2997324934fcc03cc5a58cd3cf0164b40d8371ff1f093690a93c706' },
                { name: 'Bitcoin', image: '/img/donate_btc.png', address: '1NQXNGmAwWmkNEoqCSXBPYmxcbgkQbXNCM' },
                { name: 'Litecoin', image: '/img/donate_ltc.png', address: 'LZ2EZQbXDNwBfakPfEgWhhseb8amiVmp7U' },
                { name: 'Dash', image: '/img/donate_dash.png', address: 'XoUPR4rEVeCToachNRsWErY1ehwticZ6Uk' }
            ],
            showDonate: false
        };
    }

    /**
     * Show or hide donate box
     */
    showDonate() {
        this.setState({ showDonate: !this.state.showDonate });
    }

    /**
     * Attempt to generate a new wallet seed and Addresses
     * @param {bool} accept check if they consented to warnings and terms
     */
    generateWallet() {
        let wallet = new Wallet();

        wallet.generate()
            .then(seed => this.setState({wallet: seed}))
            .catch(err => console.log(err));
    }

    /**
     * Grab new ticker data
     */
    refreshTicker() {
        // refresh ticker data
        this.props.ticker.get().then(ticker => this.setState({ticker: ticker}));
    }

    /**
     * Start ticker timer
     */
    componentWillMount() {
        // check for new ticker data every 60 seconds
        this.timer = setInterval(this.refreshTicker(), 60000);
        this.generateWallet();
    }

    /**
     * Destroy timer on unmount
     */
    componentWillUnmount() {
        // remove timer when unmounting
        clearInterval(this.timer);
    }

    /**
     * render
     * @return {ReactElement} template markup
     */
    render() {
        return (
            <div className="app-container">
                <Toolbar {... this.state } showDonate={this.showDonate.bind(this) }/>
                <Hero {... this.state} />
                <Footer />
            </div>
        );
    }
}

// bootstrap app
ReactDOM.render(<App ticker={new Ticker()}/>, document.getElementById('content'));

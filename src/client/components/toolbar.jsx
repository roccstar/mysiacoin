'use strict';

import React from 'react';

/**
 * Toolbar component
 */
export default class Toolbar extends React.Component {
    /**
     * @param {object} props passed in from app
     */
    constructor(props) {
        super(props);
    }

    /**
     * Generate Shifty button popup
     */
     donate(e) {
         e.preventDefault();
         const link = 'https://shapeshift.io/shifty.html?destination=4f61cdd4820023a2a9d7c2997324934fcc03cc5a58cd3cf0164b40d8371ff1f093690a93c706&output=SC&apiKey=4c118c51fc77bd9e75e679c23310c49627c4a2899afd5f22620b31d3ef9e025d344978d46db034586d3cf8536943c57a156adfc56fd453113c2da255c03db17d';
         window.open(link,'1418115287605','width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0');
         return false;
     }

    /**
     * render
     * @return {ReactElement} template markup
     */
    render() {
        // cache 1hr and 24hr change rate
        const change1hr = this.props.ticker.percent_change_1h || '0';
        const change24hr = this.props.ticker.percent_change_24h || '0';
        return (
            <header className="toolbar">
                <div className="container">
                    <div className="logo">
                        <a href="/" title="My Siacoin">My
                            <img src="/img/sia.svg" alt="Siacoin"/></a>
                    </div>
                    <nav className="navigation"></nav>
                    <div className="donate-button">
                        <a aria-label="Donate Siacoin and help keep the lights on!"
                            href="#donate"
                            onClick={this.donate.bind(this)}>
                            Donate
                        </a>
                    </div>
                    <div className="ticker">
                        <ul>
                            <li>
                                <span className="label" aria-label="1 hr change">
                                    {`%1hr`}
                                </span>
                                <span className={change1hr.indexOf('-') > -1 ?
                                    'value negative small' :
                                    'value positive small'}>
                                    {change1hr}%
                                </span>
                            </li>
                            <li>
                                <span className="label" aria-label="Siacoin price in USD">USD</span>
                                <span className="value">${Number(this.props.ticker.price_usd || 0).toFixed(4)}</span>
                            </li>
                            <li>
                                <span className="label"
                                    aria-label="24 hour change">
                                    {`%24hr`}
                                </span>
                                <span className={change24hr.indexOf('-') > -1 ?
                                    'value negative small' :
                                    'value positive small'}>
                                    {change24hr}%
                                </span>
                            </li>
                            <li>
                                <span className="label" aria-label="Siacoin price in Bitcoin">BTC</span>
                                <span className="value">{Number(this.props.ticker.price_btc || 0).toFixed(8)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

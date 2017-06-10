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
                        <a aria-label="Donate Siacoin and help keep the lights on!" href="#donate">
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

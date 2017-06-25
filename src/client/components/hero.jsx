'use strict';

import React from 'react';
import qr from 'qr-image';

/**
 * Hero component
 */
export default class Hero extends React.Component {
    /**
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.generateQR = this.generateQR.bind(this);
        this.downloadWallet = this.downloadWallet.bind(this);
    }

    /**
     * create a QA code based on the seed for easy recovery
     * @return {string} qr code in svg format
     */
    generateQR(seed) {
        return qr.imageSync(seed, { type: 'svg' });
    }

    /**
     * create text file from wallet json
     * @return {string} wallet text file
     */
    downloadWallet() {
        // create anchor element
        let anchor = document.createElement('a');

        // format text by joining array
        // (slighly cleaner than a bunch of \n's)
        let text = [
            'Siacoin Recovery Seed',
            '----',
            this.props.wallet.Seed,
            '',
            'Siacoin Public Addresses',
            '----',
            this.props.wallet.Addresses.join('\n')
        ].join('\n');


        // set attributes for href, set downloaded filename, and hide
        anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        anchor.setAttribute('download', `mysiacoin.com__${new Date().toLocaleString()}.txt`);
        anchor.style.display = 'none';

        // append to page, activate, and clean up dom
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    /**
     * runs once component has finished loading
     */
    componentDidMount() {
        // wait 0.2s and fade in
        setTimeout(() => {
            document.body.style.display = 'block';
            document.body.style.opacity = '1';
        }, 200);
    }

    /**
    * render component template
     * @return {ReactElement} markup code
     */
    render() {
        // grab seed and addresses from wallet
        let seed = this.props.wallet.Seed || '';
        let addresses = this.props.wallet.Addresses ? this.props.wallet.Addresses.map(addy => <span key={addy}>{addy}</span>) : '';

        // generate svg qr code for private seed
        let qrcode = this.generateQR(seed);

        return (
            <div className="hero-container">
                <div className="container">
                    <div className="card">
                        <div className="column">
                            <h2 aria-label="Your private seed">Private Recovery Seed</h2>
                            <p><img src={`data:image/svg+xml;base64,${btoa(qrcode)}`} alt={seed} /></p>
                            <p className="mobile">
                                <button
                                    onClick={this.downloadWallet.bind(this)}
                                    aria-label="Download and save paper wallet">
                                    Download Paper Wallet
                                </button>
                            </p>
                            <p className="warning">
                                <em>(Keep this somewhere private and never share it with anyone! If you lose this there is no way to recover your wallet!)</em>
                            </p>
                            <p className="content seed">{seed}</p>
                            <p>
                                <button
                                    onClick={this.downloadWallet.bind(this)}
                                    aria-label="Download and save paper wallet">
                                    Download Paper Wallet
                                </button>
                            </p>
                        </div>
                        <div className="column">
                            <h2 aria-label="Your 20 Siacoin addresses">Public Wallet Addresses</h2>
                            <p className="content"
                                key={`addresses-${seed.replace(/\s/g, '-')}`}>
                                <small>{addresses}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

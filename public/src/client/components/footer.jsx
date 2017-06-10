'use strict';

import React from 'react';

/**
 * Footer component
 */
export default class Footer extends React.Component {
    /**
     * @param {object} props React props
     */
    constructor(props) {
        super(props);
    }

    /**
     * @return {ReactElement} markup code
     */
    render() {
        // current year
        const year = new Date().getFullYear();

        return (
            <footer>
                <div className="container">
                    <span className="donate">
                        <strong>Donate SC:</strong> {'4f61cdd4820023a2a9d7c2997324934fcc03cc5a58cd3cf0164b40d8371ff1f093690a93c706'}
                    </span>
                    <span className="legal">
                        &copy; {year} <a href="https://roccstar.com" target="_blank">Roccstar, Inc</a>
                    </span>
                </div>
            </footer>
        );
    }
}

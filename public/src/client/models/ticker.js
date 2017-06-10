'use strict';

/**
 * Ticker Model
 */
export default class Ticker {
    /**
     * get ticker information from cache or api
     * @return {onject} ticker json data
     */
    get() {
        return fetch('/api/v1/ticker').then(resp => {
            // return new wallet to user on 200 status
            if(resp.status === 200) {
                return resp.json().then(json => json);
            }
        });
    }
}

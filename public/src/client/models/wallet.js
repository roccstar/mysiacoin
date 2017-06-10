'use strict';

/**
 * Wallet Model
 */
export default class Wallet {
    /**
     * grab new generated wallet from api
     * @return {object} wallet json ({ Seed: 'xxxxx', Addresses: [ 'xxx','xxxx',... ]})
     */
    generate() {
        return fetch('/api/v1/generate').then(resp => {
            // return new wallet to user on 200 status
            if(resp.status === 200) {
                return resp.json().then(json => {
                    return json;
                });
            }
        });
    }
}

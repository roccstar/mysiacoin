'use strict';

/**
 * Wallet Model
 */
export default class Wallet {
    /**
     * grab new generated wallet from clinet side script
     * @return {object} wallet json ({ Seed: 'xxxxx', Addresses: [ 'xxx','xxxx',... ]})
     */
    generate() {
    	return window.SiacoinWalletGenerator ?
            Promise.resolve(new SiacoinWalletGenerator).then(resp => {
                return JSON.parse(resp.toString());
            }) : Promise.resolve({});
    }
}

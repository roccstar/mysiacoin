# mysiacoin.com

Unofficial Siacoin coldstorage wallet generator written in `nodejs` using a `Express` backend. The backend us only used for caching the price ticker data and executing the `sia-coldstorage-json` binary (https://github.com/roccstar/sia-coldstorage-json) to generate a new wallet seed and 20 addresses. The front-end is just basic `React`, nothing fancy.

All the actions in this site are read only with no data being saved to the server or uploaded anywhere else. The only bit of data that does get cached is from the price ticker and that is to friendly to the service we are calling to grab the latest Siacoin price. We highly encourage you to poke around at the code and examine it or make any changes that you want.

_(NODE: Make sure to download and store your wallet somewhere safe! There is no way whatsoever to recover lost wallets of lost Siacoin!)_

## Reporting issues

https://github.com/roccstar/mysiacoin/issues

## Donate

- **SC:** 4f61cdd4820023a2a9d7c2997324934fcc03cc5a58cd3cf0164b40d8371ff1f093690a93c706
- **BTC:** 1NQXNGmAwWmkNEoqCSXBPYmxcbgkQbXNCM
- **LTC:** LZ2EZQbXDNwBfakPfEgWhhseb8amiVmp7U
- **DASH:** XoUPR4rEVeCToachNRsWErY1ehwticZ6Uk

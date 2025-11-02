require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/truffle_abis/',
  compilers: {
    solc: {
      // Use a specific compiler version compatible with the contracts.
      // Exact version avoids range-resolution issues when fetching from solc-bin.
      version: '0.5.17',
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
}



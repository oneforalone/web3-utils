const provider = window.ethereum;

// Check to see if Metamask is installed
const isMetaMaskInstalled = () => {
  return Boolean(provider && provider.isMetaMask);
};

// Connect to MetaMask
const connectMetaMask = async() => {
  try {
    provider.request({ method: 'eth_requestAccounts' });
  } catch (err) {
    console.log(err);
  }
};

//
// todo: need two mappings: (maybe json format is proper)
//  { chainId: {
//       chainName: "",
//       RPC: [],
//       ExplorerURL: [],
//       Currency: { symbol: "", decimals: 18 },
//     },
//     ....}
//
const chainInfo = require("./chains.json");

// from https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
async function add_network(chain_id) {
  try {
    let chainId = '0x' + parseInt(chain_id, 10).toString(16);
    let network_info = {
      chainId: chainId,
      chainName: chainInfo[chain_id].name,
      rpcUrls: chainInfo[chain_id].RPC,
      blockExplorerUrls: chainInfo[chain_id].exploerURL,
      nativeCurrency: chainInfo[chain_id].currency,
    };
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [network_info]
    })
  } catch (err) {
    console.log(err)
  }
}

// from https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
async function switch_network(chain_id) {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain_id }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
        add_network(network_info);
    }
  }
}

async function add_token(token_info) {
  try {
    const wasAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: "ERC20",
        options: token_info
      },
    })
    if (wasAdded) {
      console.log("Token is Added")
    } else {
      console.log("Token not added")
    }
  } catch (err) {
    console.log(err)
  }
}
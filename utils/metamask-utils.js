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

async function add_network(network_info) {
  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [network_info]
    })
  } catch (err) {
    console.log(err)
  }
}

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
async function switch_network(chain_id) {
  const current_chain_id = await provider.request({ method: 'eth_chainId' });
  if (current_chain_id != chain_id) {
    let network_info = {
      chainId: chain_id,
      chainName: chainInfo[chain_id].name,
      rpcUrls: chainInfo[chain_id].RPC,
      blockExplorerUrls: chainInfo[chain_id].exploerURL,
      NativeCurrency: chainInfo[chain_id].currency
    };
    add_network(network_info);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain_id }],
      })
    } catch (err) {
      if (err.code === 4902) {
        console.log("This network is not available in your metamask, please add it");
      }
      console.log("Failed to switch to the network.");
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
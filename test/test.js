const axios = require('axios')
const { expect } = require('chai')

describe("NFTMarket", function() {
  it("Should interact with the token contract", async function() {


    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed()
    const marketAddress = market.address; 

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed()
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")
 
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})
    
    const [_, userAddress, userAddress2, userAddress3] = await ethers.getSigners();

    await market.connect(userAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    let items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toNumber(),
        tokenId: i.price.toNumber(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    
    console.log('items: ', items)

    // const myNfts = await market.connect(userAddress2).fetchMyNFTs()
    // console.log('myNfts:', myNfts);
  });
});

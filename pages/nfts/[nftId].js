import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { MarketplaceModule, ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from "../../components/nft/NFTImage"
import GeneralDetails from "../../components/nft/GeneralDetails"
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from "../../components/nft/Purchase"

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}
const NFT = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()
  
    const nftModule = useMemo(() => {
      if (!provider) return
  
      const sdk = new ThirdwebSDK(
        provider.getSigner(),
        'https://eth-rinkeby.alchemyapi.io/v2/G7l9Sx2OrMXwVVA5WX3iZWkx2vDVuVR4'
      )
      return sdk.getNFTModule('0xf066ac51698e3028c6eD5184BBe01fb720A66EEE')
    }, [provider])
  
    // get all NFTs in the collection
    useEffect(() => {
      if (!nftModule) return
      ;(async () => {
        const nfts = await nftModule.getAll()
  
        const selectedNftItem = nfts.find(
          (nft) => nft.id === router.query.nftId)
  
        setSelectedNft(selectedNftItem)
      })()
    }, [nftModule])
  
    const marketPlaceModule = useMemo(() => {
      if (!provider) return
  
      const sdk = new ThirdwebSDK(
        provider.getSigner(),
        'https://eth-rinkeby.alchemyapi.io/v2/G7l9Sx2OrMXwVVA5WX3iZWkx2vDVuVR4'
      )
  
      return sdk.getMarketplaceModule(
        '0xEBf0600eF352ab440FB0e92F3745A4c737979d32'
      )
    }, [provider])
  
    useEffect(() => {
      if (!marketPlaceModule) return
      ;(async () => {
        setListings(await marketPlaceModule.getAllListings())
      })()
    }, [marketPlaceModule])

    return(
        <div>
        <Header />
        <div className={style.wrapper}>
              <div className={style.container}>
                <div className={style.topContent}>
                  <div className={style.nftImgContainer}>
                    <NFTImage selectedNft={selectedNft} />
                  </div>
                  <div className={style.detailsContainer}>
                    <GeneralDetails selectedNft={selectedNft} />
                    <Purchase isListed={router.query.isListed} selectedNft={selectedNft} listings={listings} marketPlaceModule={marketPlaceModule} />
                  </div>
                </div>
                <ItemActivity />
              </div>
            </div>
          </div>
    )

}


export default NFT
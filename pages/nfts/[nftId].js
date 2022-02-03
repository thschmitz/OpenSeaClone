import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from "../../components/nft/NFTImage"


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
        'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
      )
      return sdk.getNFTModule('0x66a576A977b7Bccf510630E0aA5e450EC11361Fa')
    }, [provider])
  
    // get all NFTs in the collection
    useEffect(() => {
      if (!nftModule) return
      ;(async () => {
        const nfts = await nftModule.getAll()
  
        const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
  
        setSelectedNft(selectedNftItem)
      })()
    }, [nftModule])
  
    const marketPlaceModule = useMemo(() => {
      if (!provider) return
  
      const sdk = new ThirdwebSDK(
        provider.getSigner(),
        'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
      )
  
      return sdk.getMarketplaceModule(
        '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
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
            <NFTImage />
        </div>
    )

}


export default NFT
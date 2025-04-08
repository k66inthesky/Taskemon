access(all) contract ExampleNFT {
    access(all) resource NFT {
        access(all) let id: UInt64

        init(initID: UInt64) {
            self.id = initID
        }
    }

    access(all) resource interface NFTMinter {
        access(all) fun mintNFT(): @NFT
    }

    access(all) resource NFTMinterImpl: NFTMinter {
        access(all) fun mintNFT(): @NFT {
            return <-create NFT(initID: 0)
        }
    }

    init() {
        self.account.save(<-create NFTMinterImpl(), to: /storage/NFTMinter)
    }
}

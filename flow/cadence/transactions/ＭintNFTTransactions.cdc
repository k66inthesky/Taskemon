import ExampleNFT from 0xYourContractAddress

transaction {
    prepare(acct: AuthAccount) {
        let minter = acct.borrow<&ExampleNFT.NFTMinter>(from: /storage/nftMinter)
            ?? panic("Could not borrow a reference to the NFTMinter")

        let newNFT <- minter.createNFT()

        acct.save(<-newNFT, to: /storage/MyNFT)
    }
}

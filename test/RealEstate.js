const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Real Estate', () => {

    let realEstate, escrow
    let deployer, seller, accounts
    let nftID = 1
    let purchasePrice = ether(100)
    let escrowAmount = ether(20)

    beforeEach(async () => {
        //Setup accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        inspector = accounts[2]
        lender = accounts[3]

        // Load Contracts
        const RealEstate = await ethers.getContractFactory('RealEstate')
        const Escrow = await ethers.getContractFactory('Escrow')

        // Deploy contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy(
            realEstate.address, 
            nftID,
            purchasePrice,
            escrowAmount,
            seller.address,
            buyer.address,
            inspector.address,
            lender.address
            )

        transaction = await realEstate.connect(seller).approve(escrow.address, nftID)
        await transaction.wait()
    })

    describe('Deployment', async () => {

        it('checks nft owner', async () => {
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
        })
    })

    describe('Selling real estate', async () => {
        let balance, transaction
       
        it('executes a succesful transaction', async () => {
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
            // Check escrow balance
            balance = await escrow.getBalance()
            console.log("Escrow Balance before deposit: ", ethers.utils.formatEther(balance))


            // Buyer deposits Earnest
            transaction = await escrow.connect(buyer).depositEarnest({ value: escrowAmount })

            // Check escrow balance
            balance = await escrow.getBalance()
            console.log("Escrow Balance after deposit : ", ethers.utils.formatEther(balance))

            //Inspector updates status
            transaction = await escrow.connect(inspector).updateInspectionStatus(true)
            await transaction.wait()
            console.log("Inspector updates status")

            // Finalize sale
            transaction = await escrow.connect(buyer).finalizeSale()
            await transaction.wait()
            console.log("Buyer finalizes sale")


            expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address)
        })
    })

})
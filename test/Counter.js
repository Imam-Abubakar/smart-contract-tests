const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {
    let counter

    beforeEach(async() => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter String', 1)
    })

    describe('Deployment', ()=> {

        it('sets initial count', async () => {
            expect(await counter.count()).to.equal(1)
        })
    
        it('sets initial name', async () => {
            expect(await counter.name()).to.equal('My Counter String')
        })
    })

    describe('Counting', () => {
        let transaction

        it('reads the count from the "count" state variable', async () => {
            expect(await counter.count()).to.equal(1)
        })

        it('reads the count from the "getCount()" function', async () => {
            expect(await counter.count()).to.equal(1) 
        })

        it('reads the name from the "name" state variable', async () => {
            expect(await counter.name()).to.equal('My Counter String')
        })

        it('reads the name from the "getName()" function', async () => {
            expect(await counter.name()).to.equal('My Counter String') 
        })

        it('increments the count', async () => {
            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(2)

            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(3)
        })

        it('decrements the count', async () => {
            transaction = await counter.decrement()
            await transaction.wait()

            expect(await counter.count()).to.equal(0)

            await expect( counter.decrement()).to.be.reverted

        })

        it('updates the name', async () => {
            transaction = await counter.setName('New String')
            expect(await counter.name()).to.equal('New String')
        })

        it('updates the count', async () => {
            transaction = await counter.setCount(1000)
            expect(await counter.count()).to.equal(1000)
        })
    })

})
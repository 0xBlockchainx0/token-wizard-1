import React from 'react'
import Adapter from 'enzyme-adapter-react-15'
import { configure, shallow } from 'enzyme'
import { TierSetupDutchAuction } from '../../../src/components/StepFour/TierSetupDutchAuction'
import { tierStore } from '../../../src/stores'
import { defaultTier, defaultTierValidations } from '../../../src/utils/constants'

configure({ adapter: new Adapter() })

describe('TierSetupDutchAuction', () => {
  it(`should render the component `, () => {
    const addCrowdsale = num => {
      const newTier = Object.assign({}, defaultTier)
      const newTierValidations = Object.assign({}, defaultTierValidations)
      newTier.tier = `Tier ${num + 1}`
      if (0 === num) {
        newTier.whitelistEnabled = 'no'
        newTier.burnExcess = 'no'
        newTier.walletAddress = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
        newTier.endTime = 1234
      }

      tierStore.addTier(newTier, newTierValidations)
    }

    addCrowdsale(0)

    const stores = {
      tier: tierStore.tiers[0]
    }
    const wrapper = shallow(<TierSetupDutchAuction {...stores} />)

    expect(wrapper).toMatchSnapshot()
  })
})
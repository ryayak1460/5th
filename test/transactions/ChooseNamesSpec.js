/*
 *  5th edition, a library for 5th edition D&D applications.
 *  Copyright (C) 2017  Ryan Y.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const { expect } = require('chai')
const { ChooseNames } = require('../../src/transactions')
const { RequiresHandlerFactory, RequiresRace, InvalidNameTypeFor } =
  require('../../src/errors')

describe('The choose names transaction', () => {
  let updatedCharacter, transaction, character

  const expectNameToEqual = (type, name) =>
    expect(updatedCharacter).to.have.property('names')
      .that.have.property(type)
      .that.equal(name)
  const expectGivenNameToEqual = name => expectNameToEqual('given', name)
  const expectClanNameToEqual = name => expectNameToEqual('clan', name)

  beforeEach(() => {
    transaction = new ChooseNames({
      make(type) {
        return {
          handle({ character }) {
            updatedCharacter = character
          }
        }
      }
    })
    character = { race: 'dwarf' }
  })

  context('with a dwarf', () => {
    it('will accept a given name', () => {
      transaction.process({character, names: { given: 'Muradin' }})
      expectGivenNameToEqual('Muradin')
    })

    it('will accept a clan name', () => {
      transaction.process({character, names: { clan: 'Bronzebeard' }})
      expectClanNameToEqual('Bronzebeard')
    })

    it('will update a given name', () => {
      character = {race: 'dwarf', names: { given: 'Muradin' }}
      transaction.process({character, names: { given: 'Thorin' }})
      expectGivenNameToEqual('Thorin')
    })

    it('will update a clan name', () => {
      character = {race: 'dwarf', names: { clan: 'Bronzebeard' }}
      transaction.process({character, names: { clan: 'Oakenshield' }})
      expectClanNameToEqual('Oakenshield')
    })

    it('will update a character with a given name', () => {
      const names = { given: 'Muradin', clan: 'Bronzebeard' }
      character = {race: 'dwarf', names}
      transaction.process({character, names: { given: 'Thorin' }})
      expectGivenNameToEqual('Thorin')
    })

    it('will update a character with a clan name', () => {
      const names = { given: 'Muradin', clan: 'Bronzebeard' }
      character = {race: 'dwarf', names}
      transaction.process({character, names: { clan: 'Oakenshield' }})
      expectClanNameToEqual('Oakenshield')
    })

    it('will throw with invalid name types', () => {
      const invalidNameTypes = ['child', 'adult', 'family', 'nickname',
        'surname', 'childhood', 'orc', 'infernal', 'virtue']
      invalidNameTypes.forEach(type => {
        const names = { [type]: 'BB' }
        const process = () => transaction.process({character, names})
        expect(process).to.throw(InvalidNameTypeFor)
      })
    })
  })

  it('will throw without a handler factory', () => {
    const process = () => transaction = new ChooseNames
    expect(process).to.throw(RequiresHandlerFactory)
  })

  it('will throw without a race', () => {
    const process = () => transaction.process({ character: {}, names: {}})
    expect(process).to.throw(RequiresRace)
  })
})

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
const { SelectRace } = require('../../src/transactions')
const { RequiresHandlerFactory, InvalidRace } = require('../../src/errors')

const expectToHaveRace = (character, race) =>
  expect(character).to.have.property('race')
    .that.have.property('id')
    .that.equal(race)

describe('The select race transaction', () => {
  let transaction, updatedCharacter

  beforeEach(() => {
    let handlerFactory = {
      make(type) {
        return {
          handle({ character }) {
            updatedCharacter = character
          }
        }
      }
    }
    transaction = new SelectRace(handlerFactory)
  })

  context('when successful', () => {
    it('will allow hill dwarfs', () => {
      transaction.process({character: {}, race: 'hill dwarf'})
      expectToHaveRace(updatedCharacter, 'hill dwarf')
    })

    it('will allow mountain dwarfs', () => {
      transaction.process({character: {}, race: 'mountain dwarf'})
      expectToHaveRace(updatedCharacter, 'mountain dwarf')
    })

    it('will allow high elfs', () => {
      transaction.process({character: {}, race: 'high elf'})
      expectToHaveRace(updatedCharacter, 'high elf')
    })

    it('will allow wood elfs', () => {
      transaction.process({character: {}, race: 'wood elf'})
      expectToHaveRace(updatedCharacter, 'wood elf')
    })

    it('will allow dark elfs', () => {
      transaction.process({character: {}, race: 'dark elf'})
      expectToHaveRace(updatedCharacter, 'dark elf')
    })

    it('will allow lightfeet', () => {
      transaction.process({character: {}, race: 'lightfoot'})
      expectToHaveRace(updatedCharacter, 'lightfoot')
    })

    it('will allow stouts', () => {
      transaction.process({character: {}, race: 'stout'})
      expectToHaveRace(updatedCharacter, 'stout')
    })

    it('will allow humans', () => {
      transaction.process({character: {}, race: 'human'})
      expectToHaveRace(updatedCharacter, 'human')
    })

    it('will allow dragonborn', () => {
      transaction.process({character: {}, race: 'dragonborn'})
      expectToHaveRace(updatedCharacter, 'dragonborn')
    })

    it('will allow forest gnomes', () => {
      let race = 'forest gnome'
      transaction.process({character: {}, race})
      expectToHaveRace(updatedCharacter, race)
    })

    it('will allow rock gnomes', () => {
      let race = 'rock gnome'
      transaction.process({character: {}, race})
      expectToHaveRace(updatedCharacter, race)
    })

    it('will allow half-elfs', () => {
      transaction.process({character: {}, race: 'half-elf'})
      expectToHaveRace(updatedCharacter, 'half-elf')
    })

    it('will allow half-orcs', () => {
      transaction.process({character: {}, race: 'half-orc'})
      expectToHaveRace(updatedCharacter, 'half-orc')
    })

    it('will allow tieflings', () => {
      transaction.process({character: {}, race: 'tiefling'})
      expectToHaveRace(updatedCharacter, 'tiefling')
    })
  })

  it('will not accept an invalid race', () => {
    let process = () => transaction.process({ character: {}, race: 'merman' })
    expect(process).to.throw(InvalidRace)
  })

  it('will require a handler factory', () => {
    const createTransaction = () => { let x = new SelectRace }
    expect(createTransaction).to.throw(RequiresHandlerFactory)
  })
})

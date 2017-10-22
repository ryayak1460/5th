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
const { RequiresFormatterFactory, RequiresHandlerFactory, InvalidRace } =
  require('../../src/errors')
const { FormatterFactory } = require('../../src/formatters')

const expectToHaveRace = (character, race) =>
  expect(character).to.have.property('race').that.equal(race)

describe('The select race transaction', () => {
  let transaction, updatedCharacter

  beforeEach(() => {
    let formatterFactory = new FormatterFactory
    let handlerFactory = {
      make(type) {
        return {
          handle({ character }) {
            updatedCharacter = character
          }
        }
      }
    }
    transaction = new SelectRace(formatterFactory, handlerFactory)
  })

  context('when successful', () => {
    it('will allow dwarfs', () => {
      transaction.process({character: {}, race: 'dwarf'})
      expectToHaveRace(updatedCharacter, 'dwarf')
    })

    it('will allow elfs', () => {
      transaction.process({character: {}, race: 'elf'})
      expectToHaveRace(updatedCharacter, 'elf')
    })

    it('will allow halflings', () => {
      transaction.process({character: {}, race: 'halfling'})
      expectToHaveRace(updatedCharacter, 'halfling')
    })

    it('will allow humans', () => {
      transaction.process({character: {}, race: 'human'})
      expectToHaveRace(updatedCharacter, 'human')
    })

    it('will allow dragonborn', () => {
      transaction.process({character: {}, race: 'dragonborn'})
      expectToHaveRace(updatedCharacter, 'dragonborn')
    })

    it('will allow gnomes', () => {
      let race = 'gnome'
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

  it('will require a formatter factory', () => {
    const createTransaction = () => { let x = new SelectRace }
    expect(createTransaction).to.throw(RequiresFormatterFactory)
  })

  it('will require a handler factory', () => {
    const createTransaction = () => {
      let x = new SelectRace(new FormatterFactory)
    }
    expect(createTransaction).to.throw(RequiresHandlerFactory)
  })
})

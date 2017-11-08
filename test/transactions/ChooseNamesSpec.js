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
    expect(updatedCharacter).to.have.property('race')
      .that.have.property('names')
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
    character = {race: {id: 'hill dwarf'}}
  })

  const examples = {
    'hill dwarf': {given: 'Muradin', clan: 'Bronzebeard'},
    'mountain dwarf': {given: 'Thorin', clan: 'Oakenshield'},
    'high elf': {child: 'Ara', adult: 'Adran', family: 'Amakiir'},
    'wood elf': {child: 'Bryn', adult: 'Althaea', family: 'Amastacia'},
    'dark elf': {child: 'Link', adult: 'Drizzt', family: "Do'Urden"},
    lightfoot: {given: 'Bilbo', family: 'Baggins', nickname: 'Ringwinner'},
    stout: {given: 'Bilbo', family: 'Baggins', nickname: 'Ringwinner'},
    human: {given: 'Aragorn', surname: 'Son of Arathorn'},
    dragonborn: {given: 'Arjhan', childhood: 'Climber', clan: 'Clethtinthiallor'},
    'forest gnome': {
      given: ['Alston', 'Alvyn', 'Boddynock', 'Brocc'],
      nickname: 'Aleslosh',
      clan: 'Beren'
    },
    'rock gnome': {
      given: ['Bimpnottin', 'Breena', 'Caramip', 'Carlin'],
      nickname: 'Ashhearth',
      clan: 'Daergel'
    },
  }

  for (const race in examples) {
    const fullName = examples[race]
    for (const part in fullName) {
      context(`with a ${race}`, () => {
        it(`will accept the ${part} part`, () => {
          const names = { [part]: fullName[part] }
          transaction.process({character: {race: {id: race}}, names})
          expectNameToEqual(part, fullName[part])
        })
      })
    }
  }

  const racesWithOptions = {
    'half-elf': [
      {child: 'Del', adult: 'Aelar', family: 'Galanodel'},
      {given: 'Ander', surname: 'Brightwood'}
    ],
    'half-orc': [{given: 'Aoth', surname: 'Ankhalab'}, {orc: 'Kansif'}],
    tiefling: [{given: 'Anton'}, {infernal: 'Orianna'}, {virtue: 'Poetry'}]
  }

  for (const raceWithOptions in racesWithOptions) {
    context(`with a ${raceWithOptions}`, () => {
      const examples = racesWithOptions[raceWithOptions]

      examples.forEach(example => {
        for (const part in example) {
          it(`will accept the ${part} part`, () => {
            const names = { [part]: example[part] }
            transaction.process({character: {race: {id: raceWithOptions}}, names})
            expectNameToEqual(part, example[part])
          })
        }
      })
    })
  }

  it('will throw without a handler factory', () => {
    const process = () => transaction = new ChooseNames
    expect(process).to.throw(RequiresHandlerFactory)
  })

  it('will throw without a race', () => {
    const process = () => transaction.process({ character: {}, names: {}})
    expect(process).to.throw(RequiresRace)
  })

  it('will throw with a bad name type', () => {
    const process = () => transaction.process({
      character: {race: {id: 'tiefling'}},
      names: {clan: 'Ironfist'}
    })
    expect(process).to.throw(InvalidNameTypeFor)
  })
})

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
const { CharacterFormatter } = require('../../src/formatters')
const { Character } = require('../../src/entities')
const {
  Dwarf, HillDwarf, MountainDwarf,
  Elf,
  Halfling,
  Human,

  Dragonborn,
  Gnome,
  HalfElf,
  HalfOrc,
  Tiefling
} = require('../../src/entities/races')
const { InvalidCharacter } = require('../../src/errors')

describe('The character formatter', () => {
  let character, formatter
  const expectRaceToMatch = (type, name) =>
    expectKeyToMatch({key: 'race', type, name })
  const expectKeyToMatch = ({key, type, name}) => {
    const value = new type
    character[key] = value
    expect(formatter.format(character)).to.deep.include({
      [key]: name
    })
  }
  const expectSubraceToMatch = (type, name) =>
    expectKeyToMatch({key: 'subrace', type, name })

  beforeEach(() => {
    character = new Character
    formatter = new CharacterFormatter
  })

  context('with a race', () => {
    it('will include a dwarf race', () => {
      expectRaceToMatch(Dwarf, 'dwarf')
    })

    it('will include an elf race', () => {
      expectRaceToMatch(Elf, 'elf')
    })

    it('will include a halfling race', () => {
      expectRaceToMatch(Halfling, 'halfling')
    })

    it('will include a human race', () => {
      expectRaceToMatch(Human, 'human')
    })

    it('will include a dragonborn race', () => {
      expectRaceToMatch(Dragonborn, 'dragonborn')
    })

    it('will include a gnome race', () => {
      expectRaceToMatch(Gnome, 'gnome')
    })

    it('will include a half-elf race', () => {
      expectRaceToMatch(HalfElf, 'half-elf')
    })

    it('will include a half-orc race', () => {
      expectRaceToMatch(HalfOrc, 'half-orc')
    })

    it('will include a tiefling race', () => {
      expectRaceToMatch(Tiefling, 'tiefling')
    })
  })

  context('with a subrace', () => {
    it('will include a Hill Dwarf subrace', () => {
      expectSubraceToMatch(HillDwarf, 'hill dwarf')
    })

    it('will include a Mountain Dwarf subrace', () => {
      expectSubraceToMatch(MountainDwarf, 'mountain dwarf')
    })
  })

  context('without a character object', () => {
    it('will throw an exception', () => {
      const process = () => formatter.format({})
      expect(process).to.throw(InvalidCharacter)
    })
  })
})

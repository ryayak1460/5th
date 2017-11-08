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
const { Character } = require('../../src/entities')
const { InvalidRace } = require('../../src/errors')

const races = [
  'hill dwarf',
  'mountain dwarf',
  'high elf',
  'wood elf',
  'dark elf',
  'lightfoot',
  'stout',
  'human',
  'dragonborn',
  'forest gnome',
  'rock gnome',
  'half-elf',
  'half-orc',
  'tiefling'
]

const invalidRaces = [
  'dwarf',
  'elf',
  'halfling',
  'gnome',
  'merman',
  '',
  'saoehtusnaotehu',
  'red dragon'
]

describe('The character entity', () => {
  context('race', () => {
    it('will allow valid races', () => {
      races.forEach(race => {
        let character = new Character({ race: { id: race }})
        expect(character.data.race.id).to.equal(race)
      })
    })

    it('will not allow invalid races', () => {
      invalidRaces.forEach(race => {
        const process = () => new Character({ race: { id: race }})
        expect(process).to.throw(InvalidRace)
      })
    })
  })
})

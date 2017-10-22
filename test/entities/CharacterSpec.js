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
const { Dwarf, Elf, Halfling, Human, Dragonborn, Gnome, HalfElf, HalfOrc, Tiefling } = require('../../src/entities/races')

const races = [
  new Dwarf,
  new Elf,
  new Halfling,
  new Human,
  new Dragonborn,
  new Gnome,
  new HalfElf,
  new HalfOrc,
  new Tiefling
]
const invalidRaces = ['merman', '', 'saoehtusnaotehu', 'red dragon']

describe('The character entity', () => {
  context('race', () => {
    it('will allow valid races', () => {
      let character = new Character
      races.forEach(race => {
        character.race = race
        expect(character.race).to.equal(race)
      })
    })

    it('will not allow invalid races', () => {
      let character = new Character
      invalidRaces.forEach(race => {
        let mutation = () => character.race = race
        expect(mutation).to.throw(InvalidRace)
      })
    })
  })
})

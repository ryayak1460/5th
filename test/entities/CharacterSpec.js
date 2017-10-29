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
const {
  InvalidRace, RequiresRace, NotSubraceOfRace
} = require('../../src/errors')
const {
  Dwarf, HillDwarf, MountainDwarf,
  Elf, HighElf, WoodElf, DarkElf,
  Halfling,
  Human,

  Dragonborn,
  Gnome,
  HalfElf,
  HalfOrc,
  Tiefling
} = require('../../src/entities/races')

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

const dwarfs = [new HillDwarf, new MountainDwarf]
const elfs = [new HighElf, new WoodElf, new DarkElf]
const subraces = [...dwarfs, ...elfs]

const invalidRaces = ['merman', '', 'saoehtusnaotehu', 'red dragon']

describe('The character entity', () => {
  let character

  beforeEach(() => {
    character = new Character
  })

  context('race', () => {
    it('will allow valid races', () => {
      races.forEach(race => {
        character.race = race
        expect(character.race).to.equal(race)
      })
    })

    it('will not allow invalid races', () => {
      invalidRaces.forEach(race => {
        let mutation = () => character.race = race
        expect(mutation).to.throw(InvalidRace)
      })
    })
  })

  context('subrace', () => {
    context('with dwarfs', () => {
      it('will allow valid dwarfs', () => {
        character.race = new Dwarf
        dwarfs.forEach(dwarf => {
          character.subrace = dwarf
          expect(character.subrace).to.equal(dwarf)
        })
      })

      it('will throw without a main race of "dwarf"', () => {
        const invalidRaces = races.filter(race => !(race instanceof Dwarf))
        invalidRaces.forEach(race => {
          character.race = race
          dwarfs.forEach(dwarf => {
            const process = () => character.subrace = dwarf
            expect(process).to.throw(NotSubraceOfRace)
          })
        })
      })
    })

    context('with elfs', () => {
      it('will allow valid elfs', () => {
        character.race = new Elf
        elfs.forEach(elf => {
          character.subrace = elf
          expect(character.subrace).to.equal(elf)
        })
      })

      it('will throw without a main race of "elf"', () => {
        const invalidRaces = races.filter(race => !(race instanceof Elf))
        invalidRaces.forEach(race => {
          character.race = race
          elfs.forEach(elf => {
            const process = () => character.subrace = elf
            expect(process).to.throw(NotSubraceOfRace)
          })
        })
      })
    })

    it('will throw without a race', () => {
      subraces.forEach(subrace => {
        const process = () => character.subrace = subrace
        expect(process).to.throw(RequiresRace)
      })
    })
  })
})

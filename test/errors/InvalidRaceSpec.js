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
const { InvalidRace } = require('../../src/errors')

describe('The invalid race error', () => {
  it('will have an error type', () => {
    expect(new InvalidRace).to.be.an('error')
  })

  it('will have a canned error message', () => {
    const error = new InvalidRace
    expect(error.message).to.equal('Invalid race.  Valid races: '
      + 'dwarf, elf, halfling, human, '
      + 'dragonborn, gnome, half-elf, half-orc, tiefling.')
  })
})

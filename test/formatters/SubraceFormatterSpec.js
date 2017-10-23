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
const { SubraceFormatter } = require('../../src/formatters')
const {
  HillDwarf, MountainDwarf,
  HighElf
} = require('../../src/entities/races')

describe('The subrace formatter', () => {
  let formatter
  const expectRaceToFormatTo = (subrace, name) =>
    expect(formatter.format(subrace)).to.equal(name)

  beforeEach(() => {
    formatter = new SubraceFormatter
  })

  it('will turn a hill dwarf into its name', () => {
    expectRaceToFormatTo(new HillDwarf, 'hill dwarf')
  })

  it('will turn a mountain dwarf into its name', () => {
    expectRaceToFormatTo(new HillDwarf, 'hill dwarf')
  })

  it('will turn a high elf into its name', () => {
    expectRaceToFormatTo(new HighElf, 'high elf')
  })

  it('will turn an invalid subrace into an empty string', () => {
    expect(formatter.format({})).to.be.empty
  })
})

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
const { RaceFormatter } = require('../../src/formatters')
const {
  Dwarf, Elf, Halfling, Human,
  Dragonborn, Gnome, HalfElf, HalfOrc, Tiefling
} = require('../../src/entities/races')

describe('The race formatter', () => {
  let formatter

  beforeEach(() => {
    formatter = new RaceFormatter
  })

  it('will format dwarfs', () => {
    expect(formatter.format(new Dwarf)).to.equal('dwarf')
  })

  it('will format elfs', () => {
    expect(formatter.format(new Elf)).to.equal('elf')
  })

  it('will format halflings', () => {
    expect(formatter.format(new Halfling)).to.equal('halfling')
  })

  it('will format humans', () => {
    expect(formatter.format(new Human)).to.equal('human')
  })

  it('will format dragonborn', () => {
    expect(formatter.format(new Dragonborn)).to.equal('dragonborn')
  })

  it('will format gnome', () => {
    expect(formatter.format(new Gnome)).to.equal('gnome')
  })

  it('will format half-elf', () => {
    expect(formatter.format(new HalfElf)).to.equal('half-elf')
  })

  it('will format half-orc', () => {
    expect(formatter.format(new HalfOrc)).to.equal('half-orc')
  })

  it('will format tiefling', () => {
    expect(formatter.format(new Tiefling)).to.equal('tiefling')
  })

  it('will format an invalid race as empty', () => {
    expect(formatter.format({})).to.be.empty
  })
})

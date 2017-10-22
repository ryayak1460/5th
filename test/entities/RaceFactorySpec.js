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
const RaceFactory = require('../../src/entities/RaceFactory')
const {
  Dwarf, Elf, Halfling, Human,
  Dragonborn, Gnome, HalfElf, HalfOrc, Tiefling
} = require('../../src/entities/races')

describe('The race factory', () => {
  let factory
  const expectNameToMake = (name, type) =>
    expect(factory.make(name)).to.be.an.instanceof(type)

  beforeEach(() => {
    factory = new RaceFactory
  })

  it('will make a dwarf', () => {
    expectNameToMake('dwarf', Dwarf)
  })

  it('will make an elf', () => {
    expectNameToMake('elf', Elf)
  })

  it('will make a halfling', () => {
    expectNameToMake('halfling', Halfling)
  })

  it('will make a human', () => {
    expectNameToMake('human', Human)
  })

  it('will make a dragonborn', () => {
    expectNameToMake('dragonborn', Dragonborn)
  })

  it('will make a gnome', () => {
    expectNameToMake('gnome', Gnome)
  })

  it('will make a half-elf', () => {
    expectNameToMake('half-elf', HalfElf)
  })

  it('will make a half-orc', () => {
    expectNameToMake('half-orc', HalfOrc)
  })

  it('will make a tiefling', () => {
    expectNameToMake('tiefling', Tiefling)
  })
})

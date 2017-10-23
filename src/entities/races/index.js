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
const Dwarf = require('./Dwarf')
const HillDwarf = require('./HillDwarf')
const MountainDwarf = require('./MountainDwarf')
const Elf = require('./Elf')
const HighElf = require('./HighElf')
const WoodElf = require('./WoodElf')
const DarkElf = require('./DarkElf')
const Halfling = require('./Halfling')
const Lightfoot = require('./Lightfoot')
const Stout = require('./Stout')
const Human = require('./Human')
const Dragonborn = require('./Dragonborn')
const Gnome = require('./Gnome')
const ForestGnome = require('./ForestGnome')
const RockGnome = require('./RockGnome')
const HalfElf = require('./HalfElf')
const HalfOrc = require('./HalfOrc')
const Tiefling = require('./Tiefling')

const standard = {
  Dwarf, HillDwarf, MountainDwarf,
  Elf, HighElf, WoodElf, DarkElf,
  Halfling, Lightfoot, Stout,
  Human
}
const rare = {
  Dragonborn,
  Gnome, ForestGnome, RockGnome,
  HalfElf,
  HalfOrc,
  Tiefling
}

module.exports = Object.assign({}, standard, rare)

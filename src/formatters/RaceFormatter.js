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
const {
  Dwarf, Elf, Halfling, Human,
  Dragonborn, Gnome, HalfElf, HalfOrc, Tiefling
} = require('../entities/races')

module.exports = class {
  format(race) {
    return race instanceof Dwarf ? 'dwarf' :
      race instanceof Elf ? 'elf' :
      race instanceof Halfling ? 'halfling' :
      race instanceof Human ? 'human' :
      race instanceof Dragonborn ? 'dragonborn' :
      race instanceof Gnome ? 'gnome' :
      race instanceof HalfElf ? 'half-elf' :
      race instanceof HalfOrc ? 'half-orc' :
      race instanceof Tiefling ? 'tiefling' : ''
  }
}

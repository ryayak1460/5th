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
const { RequiresRace, InvalidRace, InvalidNameTypeFor } = require('../errors')

module.exports = {
  validate(race) {
    if (!hasRace(race))
      throw new RequiresRace
    if (!hasValidRace(race.id))
      throw new InvalidRace
    if (hasNames(race) && !hasValidNames(race))
      throw new InvalidNameTypeFor(race.id, Object.keys(race.names).join('/'))
  }
}

const hasRace = data => data && data.hasOwnProperty('id')
const hasValidRace = name => name in races

const dwarfNames = {given: true, clan: true}
const elfNames = {child: true, adult: true, family: true}
const halflingNames = {given: true, nickname: true, family: true}
const humanNames = {given: true, surname: true}
const gnomeNames = {given: true, nickname: true, clan: true}
const races = {
  'hill dwarf': dwarfNames,
  'mountain dwarf': dwarfNames,
  'high elf': elfNames,
  'wood elf': elfNames,
  'dark elf': elfNames,
  lightfoot: halflingNames,
  stout: halflingNames,
  human: humanNames,
  dragonborn: {given: true, childhood: true, clan: true},
  'forest gnome': gnomeNames,
  'rock gnome': gnomeNames,
  'half-elf': [elfNames, humanNames],
  'half-orc': [humanNames, {orc: true}],
  tiefling: [{given: true}, {infernal: true}, {virtue: true}]
}

const hasNames = race => race.hasOwnProperty('names')
const hasValidNames = race => {
  const current = Object.keys(race.names)
  const valid = races[race.id]
  return current.every(name => valid instanceof Array ?
    valid.some(option => name in option) :
    name in valid)
}

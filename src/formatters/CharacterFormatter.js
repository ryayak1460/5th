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
const RaceFormatter = require('./RaceFormatter')
const SubraceFormatter = require('./SubraceFormatter')
const { Character } = require('../entities')
const { InvalidCharacter } = require('../errors')

const raceFormatter = new RaceFormatter
const subraceFormatter = new SubraceFormatter
const getRace = character => character.race ?
  {race: raceFormatter.format(character.race)} :
  {}

const getSubrace = character => character.subrace ?
  {subrace: subraceFormatter.format(character.subrace)} :
  {}

module.exports = class {
  format(character) {
    if (!(character instanceof Character)) {
      throw new InvalidCharacter
    }
    return Object.assign({}, getRace(character), getSubrace(character))
  }
}

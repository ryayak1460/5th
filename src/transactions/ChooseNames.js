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
const { RequiresHandlerFactory, RequiresRace, InvalidNameTypeFor } =
  require('../errors')

const invalidNameTypes = ['child', 'adult', 'family', 'nickname', 'surname',
  'childhood', 'orc', 'infernal', 'virtue']

module.exports = class {
  constructor(handlerFactory) {
    if (!handlerFactory) {
      throw new RequiresHandlerFactory
    }
    this.handler = handlerFactory.make('choose names')
  }

  process({ character, names }) {
    if (!character.race) {
      throw new RequiresRace
    }
    const hasInvalidNameType = invalidNameTypes.reduce(
      (holds, name) => holds || names.hasOwnProperty(name), false)
    if (hasInvalidNameType) {
      throw new InvalidNameTypeFor(character.race, 'child')
    }
    this.handler.handle({
      character: {
        names: Object.assign({}, character.names, names)
      }
    })
  }
}

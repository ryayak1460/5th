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
const { Character } = require('../entities')
const { RequiresHandlerFactory } = require('../errors')

module.exports = class {
  constructor(handlerFactory) {
    if (!handlerFactory) {
      throw new RequiresHandlerFactory
    }
    this.handler = handlerFactory.make('choose names')
  }

  process({ character: original, names }) {
    let character = new Character(original)
    const data = Object.assign({}, original, {
      race: {
        id: original.race.id,
        names: Object.assign({}, original.race.names, names)
      }
    })
    character = new Character(data)
    this.handler.handle({ character: character.data })
  }
}

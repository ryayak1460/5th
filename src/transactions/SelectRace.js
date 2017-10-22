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
const { RequiresFormatterFactory, RequiresHandlerFactory } =
  require('../errors')
const { Character, RaceFactory } = require('../entities')

const factory = new RaceFactory

module.exports = class {
  constructor(formatterFactory, handlerFactory) {
    if (!formatterFactory) {
      throw new RequiresFormatterFactory
    }
    if (!handlerFactory) {
      throw new RequiresHandlerFactory
    }
    this.formatter = formatterFactory.make('character')
    this.handler = handlerFactory.make('select race')
  }

  process({ character: original, race: name }) {
    let character = new Character(original)
    let race = factory.make(name)
    character.race = race
    this.handler.handle({ character: this.formatter.format(character) })
  }
}

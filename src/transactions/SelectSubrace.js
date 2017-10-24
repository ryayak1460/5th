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
const { Character, RaceFactory, SubraceFactory } = require('../entities')
const { FormatterFactory } = require('../formatters')
const {
  RequiresHandlerFactory,
  InvalidSubrace, NotSubraceOfRace, RequiresRace
} = require('../errors')

const formatterFactory = new FormatterFactory
const raceFactory = new RaceFactory
const subraceFactory = new SubraceFactory

const validate = (race, subrace) => {
  if (!race) {
    throw new RequiresRace
  }

  if (!hasChild(race, subrace)) {
    throw new NotSubraceOfRace(race, subrace)
  }
}

const hasChild = (race, subrace) => {
  const raceType = raceFactory.make(race)
  const subraceType = subraceFactory.make(subrace)
  return subraceType instanceof raceType.constructor
}

module.exports = class {
  constructor(handlerFactory) {
    if (!handlerFactory) {
      throw new RequiresHandlerFactory
    }
    this.formatter = formatterFactory.make('character')
    this.handler = handlerFactory.make('select subrace')
  }

  process({ character: original, subrace }) {
    validate(original.race, subrace)
    const character = new Character(original)
    character.race = raceFactory.make(original.race)
    character.subrace = subraceFactory.make(subrace)
    this.handler.handle({ character: this.formatter.format(character) })
  }
}

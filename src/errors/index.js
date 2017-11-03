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
const RequiresFormatterFactory = require('./RequiresFormatterFactory')
const RequiresHandlerFactory = require('./RequiresHandlerFactory')
const InvalidCharacter = require('./InvalidCharacter')
const InvalidRace = require('./InvalidRace')
const InvalidSubrace = require('./InvalidSubrace')
const NotSubraceOfRace = require('./NotSubraceOfRace')
const RequiresRace = require('./RequiresRace')
const InvalidFormatter = require('./InvalidFormatter')
const InvalidNameTypeFor = require('./InvalidNameTypeFor')

const transactions = { RequiresFormatterFactory, RequiresHandlerFactory }
const entities = {
  InvalidCharacter, InvalidRace, InvalidSubrace, NotSubraceOfRace, RequiresRace,
  InvalidNameTypeFor
}
const formatters = { InvalidFormatter }

module.exports = Object.assign({}, transactions, entities, formatters)

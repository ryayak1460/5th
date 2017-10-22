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
const { FormatterFactory, CharacterFormatter, RaceFormatter } =
  require('../../src/formatters')
const { InvalidFormatter } = require('../../src/errors')

describe('The formatter factory', () => {
  let factory

  beforeEach(() => {
    factory = new FormatterFactory
  })

  it('will generate a character factory', () => {
    expect(factory.make('character')).to.be.an.instanceof(CharacterFormatter)
  })

  it('will generate a race factory', () => {
    expect(factory.make('race')).to.be.an.instanceof(RaceFormatter)
  })

  context('with an invalid factory type', () => {
    it('will throw an exception', () => {
      const process = () => { let formatter = factory.make('wubbadubdub') }
      expect(process).to.throw(InvalidFormatter)
    })
  })
})

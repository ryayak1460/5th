const { expect } = require('chai')
const { SelectSubrace } = require('../../src/transactions')
const { FormatterFactory } = require('../../src/formatters')

describe('The select subrace transaction', () => {
  context('when successful', () => {
    let updatedCharacter, transaction
    const processSubrace = subrace => 
      transaction.process({character: { race: 'dwarf' }, subrace})
    const expectSubraceToEqual = subrace =>
      expect(updatedCharacter).to.deep.equal({race: 'dwarf', subrace})

    beforeEach(() => {
      let formatterFactory = new FormatterFactory
      let handlerFactory = {
        make(type) {
          return {
            handle({ character }) {
              updatedCharacter = character
            }
          }
        }
      }
      transaction = new SelectSubrace(formatterFactory, handlerFactory)
    })

    it('will allow hill dwarfs', () => {
      processSubrace('hill dwarf')
      expectSubraceToEqual('hill dwarf')
    })

    it('will allow mountain dwarfs', () => {
      processSubrace('mountain dwarf')
      expectSubraceToEqual('mountain dwarf')
    })

    it('will allow high elfs', () => {
      processSubrace('high elf')
      expectSubraceToEqual('high elf')
    })
  })
})

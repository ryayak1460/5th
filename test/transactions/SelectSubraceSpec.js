const { expect } = require('chai')
const { SelectSubrace } = require('../../src/transactions')
const { FormatterFactory } = require('../../src/formatters')

describe('The select subrace transaction', () => {
  context('when successful', () => {
    let updatedCharacter, transaction
    const processSubrace = (race, subrace) => 
      transaction.process({character: {race}, subrace})
    const expectSubraceToEqual = (race, subrace) =>
      expect(updatedCharacter).to.deep.equal({race, subrace})

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
      processSubrace('dwarf', 'hill dwarf')
      expectSubraceToEqual('dwarf', 'hill dwarf')
    })

    it('will allow mountain dwarfs', () => {
      processSubrace('dwarf', 'mountain dwarf')
      expectSubraceToEqual('dwarf', 'mountain dwarf')
    })

    it('will allow high elfs', () => {
      processSubrace('elf', 'high elf')
      expectSubraceToEqual('elf', 'high elf')
    })

    it('will allow wood elfs', () => {
      processSubrace('elf', 'wood elf')
      expectSubraceToEqual('elf', 'wood elf')
    })

    it('will allow dark elfs', () => {
      processSubrace('elf', 'dark elf')
      expectSubraceToEqual('elf', 'dark elf')
    })

    it('will allow lightfeet', () => {
      processSubrace('halfling', 'lightfoot')
      expectSubraceToEqual('halfling', 'lightfoot')
    })

    it('will allow stouts', () => {
      processSubrace('halfling', 'stout')
      expectSubraceToEqual('halfling', 'stout')
    })

    it('will allow forest gnomes', () => {
      processSubrace('gnome', 'forest gnome')
      expectSubraceToEqual('gnome', 'forest gnome')
    })

    it('will allow rock gnomes', () => {
      processSubrace('gnome', 'rock gnome')
      expectSubraceToEqual('gnome', 'rock gnome')
    })
  })
})

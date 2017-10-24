const { expect } = require('chai')
const { SelectSubrace } = require('../../src/transactions')
const {
  RequiresFormatterFactory, RequiresHandlerFactory,
  RequiresRace, InvalidSubrace, NotSubraceOfRace
} = require('../../src/errors')

describe('The select subrace transaction', () => {
  context('when properly constructed', () => {
    let updatedCharacter, transaction
    const processSubrace = (race, subrace) => 
      transaction.process({character: {race}, subrace})
    const expectSubraceToEqual = (race, subrace) =>
      expect(updatedCharacter).to.deep.equal({race, subrace})

    beforeEach(() => {
      let handlerFactory = {
        make(type) {
          return {
            handle({ character }) {
              updatedCharacter = character
            }
          }
        }
      }
      transaction = new SelectSubrace(handlerFactory)
    })

    context('with dwarf subraces', () => {
      it('will allow hill dwarfs', () => {
        processSubrace('dwarf', 'hill dwarf')
        expectSubraceToEqual('dwarf', 'hill dwarf')
      })

      it('will allow mountain dwarfs', () => {
        processSubrace('dwarf', 'mountain dwarf')
        expectSubraceToEqual('dwarf', 'mountain dwarf')
      })

      it('will throw with when the race is not a dwarf', () => {
        let process = () =>
          transaction.process({ character: { race: 'elf' }, subrace: 'hill dwarf' })
        expect(process).to.throw(NotSubraceOfRace)
      })
    })

    context('with elf subraces', () => {
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

      it('will throw when the race is not an elf', () => {
        let process = () =>
          transaction.process({ character: { race: 'gnome' }, subrace: 'dark elf' })
        expect(process).to.throw(NotSubraceOfRace)
      })
    })

    context('with halfling subraces', () => {
      it('will allow lightfeet', () => {
        processSubrace('halfling', 'lightfoot')
        expectSubraceToEqual('halfling', 'lightfoot')
      })

      it('will allow stouts', () => {
        processSubrace('halfling', 'stout')
        expectSubraceToEqual('halfling', 'stout')
      })

      it('will throw when the race is not a halfling', () => {
        let process = () =>
          transaction.process({ character: { race: 'human' }, subrace: 'stout' })
        expect(process).to.throw(NotSubraceOfRace)
      })
    })

    context('with gnome subraces', () => {
      it('will allow forest gnomes', () => {
        processSubrace('gnome', 'forest gnome')
        expectSubraceToEqual('gnome', 'forest gnome')
      })

      it('will allow rock gnomes', () => {
        processSubrace('gnome', 'rock gnome')
        expectSubraceToEqual('gnome', 'rock gnome')
      })

      it('will throw when the race is not a gnome', () => {
        let process = () =>
          transaction.process({ character: { race: 'dwarf' }, subrace: 'rock gnome' })
        expect(process).to.throw(NotSubraceOfRace)
      })
    })

    it('will throw an error without an existing race', () => {
      let process = () => transaction.process({ character: {}, subrace: 'hill dwarf'})
      expect(process).to.throw(RequiresRace)
    })

    it('will throw an error without a valid subrace', () => {
      let process = () => transaction.process({ character: {race: 'dwarf'}, subrace: ''})
      expect(process).to.throw(InvalidSubrace)
    })
  })

  it('will throw an error without a handler factory', () => {
    const process = () => transaction = new SelectSubrace
    expect(process).to.throw(RequiresHandlerFactory)
  })
})

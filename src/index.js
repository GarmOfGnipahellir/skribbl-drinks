import qwery from 'qwery'
import bonzo from 'bonzo'
import parse from './parser'
import { getPlayers, findPlayer } from './skribbl'
import { createStore, playerJoined, playerLeft, addDrinks } from './store'

let store

function updateState(node) {
    const event = parse(node)

    switch (event.type) {
        case 'GUESS':
            store.dispatch(addDrinks(event.name, 1))
            break

        case 'JOINED':
            const player = findPlayer(event.name)
            if (!!player) {
                store.dispatch(playerJoined(player.name, player.id))
            }
            break

        case 'LEFT':
            store.dispatch(playerLeft(event.name))
            break
    }
}

const screenGame = qwery('#screenGame')[0]
new MutationObserver(() => {
    if (bonzo(screenGame).css('display') == 'none') return

    const initialState = {}
    for (const player of getPlayers()) {
        initialState[player.name] = { drinks: 0, id: player.id }
    }

    store = createStore(initialState)

    store.subscribe(() => {
        const state = store.getState()

        for (const name in state) {
            const { drinks, id } = state[name]

            const elem = qwery('#' + id)[0]
            const infoElem = elem.children[1]
            let guessesElem = infoElem.children[2]
            if (guessesElem === undefined) {
                guessesElem = document.createElement('div')
                guessesElem.style['font-size'] = '200%'
                infoElem.appendChild(guessesElem)
            }
            guessesElem.textContent = '🍺 ' + drinks
        }
    })

    const boxMessages = qwery('#boxMessages')[0]
    new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (let node of mutation.addedNodes) {
                    if (node.tagName.toLowerCase() == 'p') {
                        updateState(node)
                    }
                }
            }
        }
    }).observe(boxMessages, { childList: true })
}).observe(screenGame, { attributes: true })

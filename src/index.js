import parse from './parser'
import { store, playerJoined, playerLeft, addDrinks } from './store'

let guessers = {}

function parseGuess(node) {
    const matches = /^(.+?): (.*)/g.exec(node.textContent)
    if (matches.length >= 3) {
        const name = matches[1]

        if (!(name in guessers)) {
            guessers[name] = 1
        } else {
            guessers[name]++
        }

        const containerGamePlayers = document.getElementById(
            'containerGamePlayers'
        )
        for (const child of containerGamePlayers.children) {
            const childInfo = child.children[1]
            const childName = childInfo.children[0].textContent

            if (childName.startsWith(name)) {
                let guessesElem = childInfo.children[2]
                if (guessesElem === undefined) {
                    guessesElem = document.createElement('div')
                    guessesElem.style['font-size'] = '200%'
                }
                guessesElem.textContent = '🍺 ' + guessers[name]
                childInfo.appendChild(guessesElem)
            }
        }
    }
}

function parseStartRound(node) {
    if (/^(.+?) is drawing now!/g.test(node.textContent)) {
        for (const child of containerGamePlayers.children) {
            const childInfo = child.children[1]

            let guessesElem = childInfo.children[2]
            if (guessesElem === undefined) {
                guessesElem = document.createElement('div')
                guessesElem.style['font-size'] = '200%'
            }
            guessesElem.textContent = '🍺 ' + 0
            childInfo.appendChild(guessesElem)
        }
        guessers = {}
    }
}

function parseEndRound(node) {
    if (/^The word was '.+?'/g.test(node.textContent)) {
        const revealContainer = document.querySelector('.revealContainer')
        for (let child of revealContainer.children) {
            const name = child.children[0].textContent

            const guessesElem = document.createElement('div')
            guessesElem.className = 'score'
            child.appendChild(guessesElem)

            let guesses = 0
            if (name in guessers) {
                guesses = guessers[name]
            }
            guessesElem.innerText = '🍺 ' + guesses
        }
    }
}

function updateState(node) {
    const event = parse(node)

    switch (event.type) {
        case 'GUESS':
            store.dispatch(addDrinks(event.name, 1))
            break

        case 'JOINED':
            store.dispatch(playerJoined(event.name))
            break

        case 'LEFT':
            store.dispatch(playerLeft(event.name))
            break
    }

    console.log(store.getState())
}

const boxMessages = document.getElementById('boxMessages')
const observer = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                if (node.tagName.toLowerCase() == 'p') {
                    updateState(node)
                }
            }
        }
    }
})
observer.observe(boxMessages, {
    childList: true,
})

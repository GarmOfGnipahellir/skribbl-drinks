import qwery from 'qwery'
import bonzo from 'bonzo'

const containerGamePlayers = qwery('#containerGamePlayers')[0]

export function getPlayers() {
    const result = []
    for (const value of containerGamePlayers.children) {
        const name = qwery('.name', value)[0].textContent.replace(' (You)', '')
        const id = bonzo(value).attr('id')

        result.push({ name, id })
    }
    return result
}

export function findPlayer(name) {
    for (const player of getPlayers()) {
        if (player.name === name) {
            return player
        }
    }
}


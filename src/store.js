import produce from 'immer'
import { createStore } from 'redux'

const PLAYER_JOINED = 'PLAYER_JOINED'
const PLAYER_LEFT = 'PLAYER_LEFT'
const ADD_DRINKS = 'ADD_DRINKS'

export function playerJoined(name) {
    return { type: PLAYER_JOINED, name }
}

export function playerLeft(name) {
    return { type: PLAYER_LEFT, name }
}

export function addDrinks(name, amount) {
    return { type: ADD_DRINKS, name, amount }
}

const reducer = produce((draft, action) => {
    switch (action.type) {
        case PLAYER_JOINED:
            draft[action.name] = { drinks: 0, id: '' }
            break

        case PLAYER_JOINED:
            delete draft[action.name]
            break

        case ADD_DRINKS:
            const { name, amount } = action
            draft[name].drinks += amount
            break
    }
})

export const store = createStore(reducer, {})

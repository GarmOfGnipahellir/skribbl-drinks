import produce from 'immer'
import { createStore as reduxCreateStore } from 'redux'

const PLAYER_JOINED = 'PLAYER_JOINED'
const PLAYER_LEFT = 'PLAYER_LEFT'
const ADD_DRINKS = 'ADD_DRINKS'

export function playerJoined(name, id) {
    return { type: PLAYER_JOINED, name, id }
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
            draft[action.name] = { drinks: 0, id: action.id }
            break

        case PLAYER_LEFT:
            delete draft[action.name]
            break

        case ADD_DRINKS:
            draft[action.name].drinks += action.amount
            break
    }
})

export function createStore(initialState) {
    return reduxCreateStore(reducer, initialState)
}

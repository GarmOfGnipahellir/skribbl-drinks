export default function(node) {
    const message = node.textContent
    const color = node.style.color
    let matches

    matches = /^(.+?): .*/g.exec(message)
    if (!!matches && color == 'rgb(0, 0, 0)') {
        // console.log(matches[1] + ' guessed')

        return {
            type: 'GUESS',
            name: matches[1],
        }
    }
    
    matches = /^The word was '.+?'/g.exec(message)
    if (!!matches) {
        // console.log('new word revealed')

        return {
            type: 'WORD_REVEALED',
        }
    }

    matches = /^(.+?) is drawing now!/g.exec(message)
    if (!!matches) {
        // console.log(matches[1] + ' started drawing')

        return {
            type: 'START_DRAWING',
            name: matches[1],
        }
    }

    matches = /^(.+?) guessed the word!/g.exec(message)
    if (!!matches) {
        // console.log(matches[1] + ' guessed the word')

        return {
            type: 'GUESS_RIGHT',
            name: matches[1],
        }
    }

    matches = /^(.+?) joined./g.exec(message)
    if (!!matches) {
        // console.log(matches[1] + ' joined')

        return {
            type: 'JOINED',
            name: matches[1],
        }
    }

    matches = /^(.+?) left./g.exec(message)
    if (!!matches) {
        // console.log(matches[1] + ' left')

        return {
            type: 'LEFT',
            name: matches[1],
        }
    }

    return {
        type: 'UNKNOWN',
    }
}

export const FETCH_BOARD = (level) => {
    return (dispacth) => {
        dispacth(SET_LOADING())
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
        .then((resp) => resp.json())
        .then(({ board }) => dispacth(SET_BOARD(board)))
        .catch(console.log)
        .finally(() => dispacth(UNSET_LOADING())) 
    }
}

export const SET_BOARD = (data) => {
    return { type: "SET_BOARD", payload: data}
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => Object.keys(params)
.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
.join('&');


export const VALIDATE = (data) => {
    return (dispacth) => {
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'post',
            body: encodeParams({ board: data }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.status)
              dispacth(SET_STATUS_VALIDATE(data.status))
            })
            .catch(err => {
              console.log(err)
            })
    }
}

export const SOLVE = (data) => {
    return (dispatch) => {
        fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => response.json())
        .then(response => dispatch(SET_BOARD(response.solution)))
        .catch(console.warn)
    }
}


function SET_LOADING() {
    return {
        type: "SET_LOADING"
    }
}

function UNSET_LOADING() {
    return {
        type: "UNSET_LOADING"
    }
}

export function SET_STATUS_VALIDATE(data) {
    return {
        type: "SET_STATUS_VALIDATE", payload: data
    }
}
const initialState = {
    board: [],
    loading: false,
    status: 'unsolved'
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case "SET_BOARD":
            return {
                ...state, board: action.payload
            }
        case "SET_LOADING":
            return {
                ...state, loading: true
            }
        
        case "UNSET_LOADING":
            return {
                ...state, loading: false
            }
        
        case "SET_STATUS_VALIDATE":
            return {
                ...state, status: action.payload
            }

        default:
            return state
    }
}
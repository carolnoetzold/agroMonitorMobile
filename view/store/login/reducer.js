const INITIAL_STATE = {
    user: null,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    const user = action.user;
    const error = action.error;
    switch (action.type) {
        case 'AUTHENTICATION':
            return {
                ...state,
                user, 
                error
            }
        default:
            return state;
    }
}
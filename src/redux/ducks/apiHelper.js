// ACTIONS
export const STATUSES = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export const METHODS = {
    CREATE: 'CREATE',
    RETRIEVE: 'RETRIEVE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LIST: 'LIST',
}

export function createApiAction(entityName, status, method, payload) {
    return {
        type: `${entityName.toUpperCase()}_${status}_${method}`,
        payload: payload
    }
}

// REDUCER
export function createApiReducer(entityName) {
    const initialState = {
        isLoading: {},
        items: []
    };

    return function reducer(state = initialState, action) {
        const actionTypePattern = /(.+)_(.+)_(.+)/;
        const match = action.type.match(actionTypePattern);

        if (!match)
            return state;

        const actionEntityName = match[1];
        const actionStatus = match[2];
        const actionMethod = match[3];

        if (actionEntityName !== entityName.toUpperCase())
            return state;

        switch (actionStatus) {
            case STATUSES.REQUEST:
                return {
                    ...state,
                    isLoading: {
                        ...state.isLoading,
                        [actionMethod]: true
                    },
                };

            case STATUSES.SUCCESS:
                switch (actionMethod) {
                    case METHODS.CREATE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: [...state.items, action.payload],
                        }

                    case METHODS.RETRIEVE:
                        let found = false;
                        let newItems = [];

                        for (let i = 0; i < state.items.length; i++) {
                            if (state.items[i].id === action.payload.id) {
                                newItems[i] = action.payload
                                found = true;
                            } else {
                                newItems[i] = state.items[i];
                            }
                        }

                        if (!found)
                            newItems.push(action.payload);

                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: newItems,
                        }
                        
                    case METHODS.UPDATE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: state.items.map(item => (item.id === action.payload.id) ? action.payload : item),
                        }

                    case METHODS.DELETE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: state.items.filter(item => item.id !== action.payload),
                        }

                    case METHODS.LIST:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: action.payload
                        }

                    default:
                        return state;
                }
            
            case STATUSES.FAILURE:
                return {
                    ...state,
                    isLoading: {
                        ...state.isLoading,
                        [actionMethod]: false
                    },
                };

            default:
                return state;
        }
    }
}
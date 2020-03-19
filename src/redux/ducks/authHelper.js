export const getTokenConfig = getState => {
    const token = getState().authReducer.user.accessToken

    const config = {
        headers: {
            Authorization: 'bearer ' + token,
        }
    };

    return config;
}
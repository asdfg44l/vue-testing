export const exchange = {
    state: () => ({
        currentName: 'binance',
        wsNotify: {}
    }),
    mutations: {
        setWsNotify(state, params) {
            state.wsNotify = {...params}
        }
    },
    getters: {
        getCurrentName: (state) => state.currentName,
        getWsNotify: (state) => state.wsNotify
    }
}
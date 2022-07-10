export default {
    install: (app, options) => {
        app.prototype.$term = function(key) {
            if(typeof key === 'string') {
                return key += options.append.north
            }
            return new Error('Input must be a String')
        }
    }
}
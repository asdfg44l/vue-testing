import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

//加密與解密
import { cryptoJS } from '@/libs/cryptoJS.js'
const crypto = new cryptoJS({ salt: 77391, iv: 78913 })
const secret = 'user-token'
const encrypted = (data) => crypto.encrypted(data, secret)
const decrypted = (ciphertext) => crypto.decrypted(ciphertext, secret)


const dataState = createPersistedState({
    //將生成的密文儲存在 sessionStorage中
    storage: {
        getItem: (key) => {
            const ciphertext = window.sessionStorage.getItem(key)
            if(ciphertext) return decrypted(ciphertext)
            // window.sessionStorage.getItem(key)
        },
        setItem: (key, value) => {
            if(typeof value !== Number) {
                window.sessionStorage.setItem(key, encrypted(value))
            }
            // window.sessionStorage.setItem(key, value)
        },
        removeItem: (key) => window.sessionStorage.removeItem(key)
    },
    reducer: vueState => ({
        testid: vueState.testid,
        name: vueState.name,
        appleId: vueState.apple.appleID
    })
})

//modules
import { apple } from './apple'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: () => ({
        testid: '',
        name: ''
    }),
    mutations: {
        TESTID: (state, payload) => {
            state.testid = payload
        },
        NAME: (state, payload) => {
            state.name = payload
        }
    },
    getters: {
        getTestID: (state) => state.testid
    },
    modules: {
        apple
    },
    plugins: [dataState]
})

export default store;
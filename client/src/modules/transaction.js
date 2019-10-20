import axios from '../config/axios'

export default {
    namespaced: true,
    state: {
        transactions: [],
        pendings: [],
        approved: [],
        singleTransaction: {}
    },
    mutations: {
        setTransactions(state, payload) {
            state.transactions = payload
        },
        setPendings(state, payload) {
            state.pendings = payload
        },
        setApproveds(state, payload) {
            state.approved = payload
        },
        setsingleTransaction(state, payload) {
            state.singleTransaction = payload
        }
    },
    actions: {
        getTransactions({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/transactions')
                    .then(({ data }) => {
                        commit('setTransactions', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        getPendingTransactions({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/transactions/pending')
                    .then(({ data }) => {
                        commit('setPendings', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        getApprovedTransactions({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/transactions/approved')
                    .then(({ data }) => {
                        commit('setApproveds', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        getSingleTransaction({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('/transactions/' + id)
                    .then(({ data }) => {
                        commit('setsingleTransaction', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        setTransactionApproved({ commit }, id) {
            return new Promise((resolve, reject) => {
                let text
                axios.patch('/transactions/approved/' + id)
                    .then(({ data: { message } }) => {
                        text = message
                        return this.dispatch('transaction/getTransactions')
                    })
                    .then(() => resolve(text))
                    .catch(reject)
            })
        },
        setTransactionDelivered({ commit }, id) {
            return new Promise((resolve, reject) => {
                let text
                axios.patch('/transactions/delivered/' + id)
                    .then(({ data: { message } }) => {
                        text = message
                        return this.dispatch('transaction/getTransactions')
                    })
                    .then(() => resolve(text))
                    .catch(reject)
            })
        },
        purchase({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/transactions/create')
                    .then(() => this.dispatch('transaction/getTransactions'))
                    .then(() => resolve())
                    .catch(reject)
            })
        },

    }
}
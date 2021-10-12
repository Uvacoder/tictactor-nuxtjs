import Vue from 'vue'
import immutable from 'object-path-immutable'

const state = {
  currentGame: {
    id: null,
    turn: null,
    done: false,
    date: null,
    arrayWithStates: null,
    winner: null,
    rows: [],
  },

  gameData: [],
}

const getters = {
  /**
   * Optionally get data
   * @param state
   * @returns {Function}
   */
  currentGameState: (state) => (id) => {
    if (!id) {
      return state.currentGame
    } else {
      return state.gameData.find((game) => game.id === id)
    }
  },
  /**
   * Get last item from history
   * @param state
   * @returns {*}
   */
  lastItemGameData: (state) => state.gameData[state.gameData.length - 1],
  /**
   * Get game history
   * @param state
   * @returns {getters.gameData|(function(*))|Array}
   */
  gameData: (state) => state.gameData,
  /**
   * Check for cells filled
   * @param state
   * @returns {boolean}
   */
  allCellsFilled: (state) => {
    // let filled
    const filled = state.currentGame.rows.find((row) =>
      row.cells.find((cell) => cell.value === null)
    )
    return !filled
  },
}

const actions = {
  /**
   * Set value to the store and convey turn
   * @param commit
   * @param turn
   * @param rowIndex
   * @param cellIndex
   * @returns {Promise<any>}
   */
  changeTurnAndValue({ commit }, { turn, rowIndex, cellIndex }) {
    return new Promise((resolve) => {
      const value = turn
      const changedTurn = turn === 'cross' ? 'circle' : 'cross'

      commit('setValue', { rowIndex, cellIndex, value })
      commit('changeTurnToAnother', changedTurn)
      resolve(changedTurn)
    })
  },
  /**
   * Check the state and define a winner
   * @param commit
   * @param state
   * @param dispatch
   * @param turn
   * @param rowIndex
   * @param cellIndex
   */
  checkWinner({ commit, state, getters }, { turn, rowIndex, cellIndex }) {
    const tableSize = 3

    // rows, columns, and 2 diagonals
    const optionsToWin = tableSize * 2 + 2
    const arrayWithStates = state.currentGame.arrayWithStates
      ? state.currentGame.arrayWithStates
      : new Array(optionsToWin).fill(0)

    const point = turn === 'circle' ? -1 : 1

    arrayWithStates[rowIndex] += point
    arrayWithStates[cellIndex + tableSize] += point

    if (rowIndex === cellIndex) {
      arrayWithStates[6] += point

      switch (rowIndex) {
        case 1:
          arrayWithStates[7] += point
      }
    }

    if (rowIndex === 0 && cellIndex === 2) {
      arrayWithStates[7] += point
    }

    if (rowIndex === 2 && cellIndex === 0) {
      arrayWithStates[7] += point
    }

    commit('setArrayWithStates', arrayWithStates)

    const circleWin = arrayWithStates.indexOf(-3)
    const crossWin = arrayWithStates.indexOf(3)
    const noWinner = getters.allCellsFilled

    if (circleWin > -1 || crossWin > -1) {
      commit('setDate')
      commit('setDoneTrue')
      const winner = circleWin > -1 ? 'circle' : 'cross'
      commit('setWinner', winner)
    } else if (noWinner) {
      commit('setDate')
      commit('setDoneTrue')
      commit('setWinner', 'No winner')
    }
  },
  /**
   * Set turn to the current component
   * @param commit
   * @param dispatch
   * @param side
   * @returns {Promise<void>}
   */
  async chooseTurn({ commit, dispatch }, side) {
    await dispatch('prepareGameData')
    commit('setTurn', side)
    commit('setDoneFalse')
  },
  /**
   * Initial component for the new game
   * @param commit
   */
  prepareGameData({ commit }) {
    commit('setEmptyGame')
  },
  /**
   * Add game to the game history
   * @param commit
   * @param getters
   * @returns {Promise<any>}
   */
  saveGame({ commit, getters }) {
    return new Promise((resolve) => {
      commit('addGameData')
      const lastItemId = getters.lastItemGameData.id
      resolve(lastItemId)
    })
  },
  /**
   * Push game to the history and initial new component
   * @param commit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async saveAndGoNext({ commit, dispatch }) {
    const savedGame = await dispatch('saveGame')
    if (savedGame) {
      commit('setEmptyGame')
    }
  },
}

const mutations = {
  /**
   * Toggle turn
   * @param state
   * @param turn
   */
  changeTurnToAnother: (state, turn) => {
    Vue.set(state.currentGame, 'turn', turn)
  },
  /**
   * Immutably set value to cell
   * @param state
   * @param rowIndex
   * @param cellIndex
   * @param value
   */
  setValue: (state, { rowIndex, cellIndex, value }) => {
    if (!state.currentGame.rows[rowIndex].cells[cellIndex].value) {
      state.currentGame = immutable.set(
        state.currentGame,
        'rows.' + rowIndex + '.cells.' + cellIndex + '.value',
        value
      )
    }
  },
  /**
   * Set state of winner
   * @param state
   * @param arrayWithStates
   */
  setArrayWithStates: (state, arrayWithStates) => {
    Vue.set(state.currentGame, 'arrayWithStates', arrayWithStates)
  },
  /**
   *
   * @param state
   */
  setDoneTrue: (state) => {
    Vue.set(state.currentGame, 'done', true)
  },
  /**
   *
   * @param state
   */
  setDoneFalse: (state) => {
    Vue.set(state.currentGame, 'done', false)
  },
  /**
   *
   * @param state
   */
  setDate: (state) => {
    Vue.set(state.currentGame, 'date', new Date().toString())
  },
  /**
   * Set a turn
   * @param state
   * @param turn
   */
  setTurn: (state, turn) => {
    Vue.set(state.currentGame, 'turn', turn)
  },
  /**
   * Initial game
   * @param state
   */
  setEmptyGame: (state) => {
    Vue.set(state.currentGame, 'id', null)
    Vue.set(state.currentGame, 'turn', null)
    Vue.set(state.currentGame, 'done', false)
    Vue.set(state.currentGame, 'date', null)
    Vue.set(state.currentGame, 'arrayWithStates', null)
    Vue.set(state.currentGame, 'winner', null)

    for (let i = 0; i < 3; i++) {
      state.currentGame.rows.splice(i, 1, {
        cells: [
          {
            value: null,
          },
          {
            value: null,
          },
          {
            value: null,
          },
        ],
      })
    }
  },
  /**
   * Push to Array of games
   * @param state
   */
  addGameData: (state) => {
    const newItemInData = Object.assign({}, state.currentGame, {
      id: state.gameData.length + 1,
    })

    const newItemDeepCopied = JSON.parse(JSON.stringify(newItemInData))

    state.gameData.push(newItemDeepCopied)
  },
  /**
   * Set a winner
   * @param state
   * @param winner
   */
  setWinner: (state, winner) => {
    Vue.set(state.currentGame, 'winner', winner)
  },
}

export default { state, getters, actions, mutations }

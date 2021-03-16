export default {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem("user"))
  }),
  actions: {
    setCurrentUser({state}, value) {
      state.currentUser = value;
    }
  },
  namespaced: true
}
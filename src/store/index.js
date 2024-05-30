import { createStore } from "vuex";

const API_BASE_URL = "http://localhost:3456";

export default createStore({
  state: {
    todos: [],
    companyNews: [],
    activeTab: "todo",
    isDataFetched: false,
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    START_TODO(state, todoId) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.inProgress = true;
      }
    },
    COMPLETE_TODO(state, todoId) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.inProgress = false;
        todo.completed = true;
      }
    },
    UNASSIGN_TODO(state, todoId) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.inProgress = false;
        todo.completed = false;
      }
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    SET_COMPANY_NEWS(state, news) {
      state.companyNews = news;
    },
    SET_ACTIVE_TAB(state, tab) {
      state.activeTab = tab;
    },
    SET_DATA_FETCHED(state) {
      state.isDataFetched = true;
    },
  },
  actions: {
    fetchTodos({ commit }) {
      fetch(`${API_BASE_URL}/todos`)
        .then((response) => response.json())
        .then((todos) => {
          commit("SET_TODOS", todos);
          commit("SET_DATA_FETCHED");
        })
        .catch((error) => console.error("Error fetching todos:", error));
    },
    fetchCompanyNews({ commit }) {
      fetch(`${API_BASE_URL}/company-news`)
        .then((response) => response.json())
        .then((news) => {
          commit("SET_COMPANY_NEWS", news);
        })
        .catch((error) => console.error("Error fetching company news:", error));
    },
    updateTodos({ state }) {
      fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.todos),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((error) => console.error("Error updating todos:", error));
    },
    updateCompanyNews({ state }) {
      fetch(`${API_BASE_URL}/company-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.companyNews),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((error) => console.error("Error updating company news:", error));
    },
    removeTodo({ commit, dispatch }, todoId) {
      commit("REMOVE_TODO", todoId);
      dispatch("updateTodos");
    },
    startTodo({ commit, dispatch }, todoId) {
      commit("START_TODO", todoId);
      dispatch("updateTodos");
    },
    completeTodo({ commit, dispatch }, todoId) {
      commit("COMPLETE_TODO", todoId);
      dispatch("updateTodos");
    },
    unassignTodo({ commit, dispatch }, todoId) {
      commit("UNASSIGN_TODO", todoId);
      dispatch("updateTodos");
    },
  },
});

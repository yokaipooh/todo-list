<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2>Todo</h2>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTodoModal"
      >
        Add Todo
      </button>
    </div>
    <div class="row mt-3">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
    </div>
    <AddTodoModal />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoItem from "./TodoItem.vue";
import AddTodoModal from "./AddTodoModal.vue";

export default {
  components: { TodoItem, AddTodoModal },
  computed: {
    ...mapState(["todos"]),
    filteredTodos() {
      return this.todos.filter((todo) => !todo.inProgress && !todo.completed);
    },
  },
  created() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

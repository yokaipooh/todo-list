<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2>Completed</h2>
    </div>
    <div class="row mt-3">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem },
  computed: {
    ...mapState(["todos"]),
    filteredTodos() {
      return this.todos.filter((todo) => todo.completed);
    },
  },
  created() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

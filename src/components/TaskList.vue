<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2>{{ title }}</h2>
      <button
        v-if="showAddButton"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTodoModal"
      >
        Add Todo
      </button>
    </div>
    <div class="row mt-3">
      <div
        class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
        v-for="todo in filteredTodos"
        :key="todo.id"
      >
        <TodoItem :todo="todo" />
      </div>
    </div>
    <AddTodoModal v-if="showAddButton" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoItem from "./TodoItem.vue";
import AddTodoModal from "./AddTodoModal.vue";

export default {
  components: { TodoItem, AddTodoModal },
  props: {
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showAddButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["todos"]),
    filteredTodos() {
      if (this.status === "todo") {
        return this.todos.filter((todo) => !todo.inProgress && !todo.completed);
      } else if (this.status === "inProgress") {
        return this.todos.filter((todo) => todo.inProgress && !todo.completed);
      } else if (this.status === "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return [];
    },
  },
  created() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

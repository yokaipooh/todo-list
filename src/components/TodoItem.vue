<template>
  <div
    class="card h-100 d-flex flex-column p-1 m-auto"
    style="max-width: 336px"
  >
    <img
      v-if="todo.image"
      :src="todo.image"
      class="card-img-top"
      alt="Todo Image"
      style="width: 100%; height: 200px; object-fit: cover"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ todo.title }}</h5>
      <div class="card-text flex-grow-1 d-flex flex-column">
        <p class="mb-1">Task description</p>
        {{ todo.description }}
        <small class="text-muted pt-1">Created At: {{ formattedDate }}</small>
      </div>

      <div class="mt-3 d-flex gap-2">
        <button
          v-if="!todo.inProgress && !todo.completed"
          @click="startTodoItem"
          class="btn btn-primary"
        >
          Start
        </button>
        <button
          v-if="todo.inProgress && !todo.completed"
          @click="completeTodoItem"
          class="btn btn-success"
        >
          Complete
        </button>
        <button
          v-if="todo.inProgress && !todo.completed"
          @click="unassignTodoItem"
          class="btn btn-warning"
        >
          Un-assign
        </button>
        <button
          v-if="!todo.inProgress && !todo.completed"
          @click="removeTodoItem"
          class="btn btn-danger"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    todo: Object,
  },
  computed: {
    formattedDate() {
      const date = new Date(this.todo.dateAdded);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    },
  },
  methods: {
    ...mapActions(["removeTodo", "startTodo", "completeTodo", "unassignTodo"]),
    startTodoItem() {
      this.startTodo(this.todo.id);
    },
    completeTodoItem() {
      this.completeTodo(this.todo.id);
    },
    unassignTodoItem() {
      this.unassignTodo(this.todo.id);
    },
    removeTodoItem() {
      this.removeTodo(this.todo.id);
    },
  },
};
</script>

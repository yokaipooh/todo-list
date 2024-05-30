<template>
  <div
    class="modal fade"
    id="addTodoModal"
    tabindex="-1"
    aria-labelledby="addTodoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTodoModalLabel">Add New Todo</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTodo">
            <div class="mb-3">
              <label for="todoTitle" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="todoTitle"
                v-model="title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="todoDescription" class="form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="todoDescription"
                v-model="description"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="todoImage" class="form-label"
                >Image URL (optional)</label
              >
              <input
                type="text"
                class="form-control"
                id="todoImage"
                v-model="image"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      image: "",
    };
  },
  methods: {
    ...mapMutations(["ADD_TODO"]),
    addTodo() {
      const newTodo = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        image: this.image || null,
        completed: false,
        inProgress: false,
        dateAdded: new Date(),
      };
      this.ADD_TODO(newTodo);
      this.$store.dispatch("updateTodos");
      this.title = "";
      this.description = "";
      this.image = "";
    },
  },
};
</script>

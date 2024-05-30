<template>
  <header
    class="d-flex justify-content-between align-items-center p-3 bg-dark text-white"
  >
    <div class="d-flex align-items-center">
      <span class="fw-bold me-3 text-grey">Stark</span>
      <nav class="d-none d-md-flex align-items-center">
        <a
          href="#"
          class="nav-link"
          :class="{ active: isActiveTab('todo') }"
          @click.prevent="setActiveTab('todo')"
        >
          Todo <span class="badge bg-danger">{{ todoCount }}</span>
        </a>
        <a
          href="#"
          class="nav-link"
          :class="{ active: isActiveTab('inProgress') }"
          @click.prevent="setActiveTab('inProgress')"
        >
          In Progress <span class="badge bg-danger">{{ inProgressCount }}</span>
        </a>
        <a
          href="#"
          class="nav-link"
          :class="{ active: isActiveTab('completed') }"
          @click.prevent="setActiveTab('completed')"
        >
          Completed <span class="badge bg-danger">{{ completedCount }}</span>
        </a>
      </nav>
    </div>
    <div class="d-none d-md-flex align-items-center">
      <span class="me-3 text-grey">Tony Stark</span>
      <button @click="logout" class="btn btn-logout">Log Out</button>
    </div>
    <div class="d-md-none">
      <button
        @click="toggleMenu"
        class="btn btn-light bg-dark p-2 ms-2 border-0"
      >
        <i class="bi bi-list text-white"></i>
      </button>
      <div
        v-if="menuOpen"
        class="dropdown-menu dropdown-menu-end show position-absolute"
      >
        <a
          href="#"
          class="dropdown-item"
          :class="{ active: isActiveTab('todo') }"
          @click.prevent="setActiveTab('todo')"
        >
          Todo <span class="badge bg-danger">{{ todoCount }}</span>
        </a>
        <a
          href="#"
          class="dropdown-item"
          :class="{ active: isActiveTab('inProgress') }"
          @click.prevent="setActiveTab('inProgress')"
        >
          In Progress <span class="badge bg-danger">{{ inProgressCount }}</span>
        </a>
        <a
          href="#"
          class="dropdown-item"
          :class="{ active: isActiveTab('completed') }"
          @click.prevent="setActiveTab('completed')"
        >
          Completed <span class="badge bg-danger">{{ completedCount }}</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item" @click="logout">Log Out</a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(["todos", "activeTab"]),
    todoCount() {
      return this.todos.filter((todo) => !todo.inProgress && !todo.completed)
        .length;
    },
    inProgressCount() {
      return this.todos.filter((todo) => todo.inProgress && !todo.completed)
        .length;
    },
    completedCount() {
      return this.todos.filter((todo) => todo.completed).length;
    },
  },
  methods: {
    ...mapMutations(["SET_ACTIVE_TAB"]),
    setActiveTab(tab) {
      this.SET_ACTIVE_TAB(tab);
      this.menuOpen = false; // Close menu after selecting a tab
    },
    isActiveTab(tab) {
      return this.activeTab === tab;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      // Handle logout logic
      alert("Logged out");
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: grey;
  margin-right: 15px;
}
.nav-link.active {
  color: white;
  background-color: black;
  border-radius: 5px;
}
.text-grey {
  color: grey;
}
.btn-logout {
  color: grey;
  border: none;
}
.btn-logout:hover {
  color: white;
  background-color: #6c757d;
}
.dropdown-menu.show {
  display: block;
  position: absolute;
  right: 0;
  top: 100%;
}
.bi-list {
  font-size: 1.5rem;
  color: black;
}
@media (max-width: 768px) {
  .d-md-none .dropdown-menu {
    right: 0;
    left: auto;
    top: 3.5rem;
  }
}
</style>

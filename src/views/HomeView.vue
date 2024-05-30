<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12">
        <TodoList v-if="isActiveTab('todo')" />
        <InProgressList v-if="isActiveTab('inProgress')" />
        <CompletedList v-if="isActiveTab('completed')" />
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-12">
        <h2>Company News</h2>
        <div v-if="companyNews.length">
          <div
            v-for="(news, index) in companyNews"
            :key="news.id"
            class="news-item mb-4 row"
          >
            <div
              :class="[
                'col-lg-6 col-md-6 col-sm-12',
                index % 2 === 0
                  ? 'order-lg-1 order-md-1'
                  : 'order-lg-2 order-md-2',
              ]"
            >
              <img
                :src="news.image"
                alt="News Image"
                class="img-fluid mb-3"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </div>
            <div
              :class="[
                'col-lg-6 col-md-6 col-sm-12',
                index % 2 === 0
                  ? 'order-lg-2 order-md-2'
                  : 'order-lg-1 order-md-1',
              ]"
            >
              <h3>{{ news.title }}</h3>
              <p>{{ news.content }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading news...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoList from "../components/TodoList.vue";
import InProgressList from "../components/InProgressList.vue";
import CompletedList from "../components/CompletedList.vue";

export default {
  components: { TodoList, InProgressList, CompletedList },
  computed: {
    ...mapState(["companyNews", "activeTab"]),
  },
  methods: {
    isActiveTab(tab) {
      return this.activeTab === tab;
    },
  },
  created() {
    this.$store.dispatch("fetchCompanyNews");
    this.$store.dispatch("fetchTodos"); // Ensure todos are fetched once on creation
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding-top: 16px;
}
.news-item {
  display: flex;
  flex-wrap: wrap;
}
.news-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.news-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.news-item p {
  font-size: 1rem;
  line-height: 1.5;
}
@media (max-width: 576px) {
  .news-item {
    flex-direction: column;
  }
  .container {
    max-width: 336px;
  }
}
</style>

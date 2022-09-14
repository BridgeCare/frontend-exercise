<!--
A fully spec-compliant TodoMVC implementation
https://todomvc.com/
-->

<script>
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
const STORAGE_KEY = "vue-todomvc";

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
};

export default defineComponent({
  name: 'TodoHome',
  setup() {
    let todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
    let editedTodo = ref(null)
    let visibility = ref("all")
    let newTag = ref("")
    let tags = ref([])

    const filteredTodos = computed(() => {
      return filters[visibility.value](todos.value);
    })

    const remaining = computed(() => {
      return filters.active(todos.value).length;
    })

    watch(
      todos,
      list => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      },
      { immediate: true }
    )

    const toggleAll = (e) => {
      todos.value.forEach((todo) => (todo.completed = e.target.checked));
    }

    const addTodo = (e) => {
      const value = e.target.value.trim();
      if (!value) {
        return;
      }

      todos.value.push({
        id: Date.now(),
        title: value,
        completed: false,
        tag: newTag.value,
      });

      if (!tags.value.find(tag => tag === newTag.value)) {
        tags.value.push(newTag.value)
      }
      e.target.value = "";
      newTag.value = "";
    }

    const removeTodo = (todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    }

    const editTodo = (todo) => {
      // this.beforeEditCache = todo.title;
      editedTodo.value = todo;
    }

    const doneEdit = (todo) => {
      if (!editedTodo.value) {
        return;
      }
      editedTodo.value = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        removeTodo(todo);
      }
    }

    const cancelEdit = (todo) => {
      editedTodo.value = null;
      // todo.title = this.beforeEditCache;
    }

    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    }

    const onHashChange = () => {
      const newVisibility = window.location.hash.replace(/#\/?/, "");
      if (filters[newVisibility]) {
        visibility.value = newVisibility;
      } else {
        window.location.hash = "";
        visibility.value = "all";
      }
    }

    const handleChangeNewTag = (event) => {
      event.preventDefault()
      newTag.value = event.target.value;
    }

    onMounted(() => {
      window.addEventListener("hashchange", onHashChange);
      onHashChange();
    })

    return {
      todos,
      tags,
      filteredTodos,
      remaining,
      toggleAll,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted,
      handleChangeNewTag
    }
  }
})
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <div class="new-todo-container">
        <input
          class="new-todo"
          autofocus
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
        />
        <input
          class="new-todo-tag"
          placeholder="Tag"
          :value="newTag"
          @keyup="handleChangeNewTag"
        />
    </div>
    </header>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label class="label" @dblclick="editTodo(todo)">{{ todo.title }}<span class="tag">{{ todo.tag }}</span></label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vnode-mounted="({ el }) => el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? "item" : "items" }} left</span>
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility === 'completed' }"
            >Completed</a
          >
        </li>

      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";

.new-todo-container {
  display: flex;
  justify-content: space-between;
}

.new-todo-tag {
  width: 70px;
}

.label {
  display: flex;
  justify-content: space-between;
}

.tag {
  font-size: 12px;
  margin-left: 10px;
}
</style>

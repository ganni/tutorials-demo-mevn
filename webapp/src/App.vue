<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <RouterLink to="/" class="navbar-brand">Demo Tutorial</RouterLink>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <RouterLink to="/tutorials" class="nav-link">Tutorials</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/add" class="nav-link">Add</RouterLink>
      </li>
    </div>
  </nav>
  <div class="container mt-3">
    <RouterView />
  </div>
</template>

<style>
body,
#app {
  display: block;
}
</style>

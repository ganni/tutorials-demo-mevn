<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Fuzzy Search" v-model="searchQuery" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List ({{ tutorials?.length }})</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <div class="d-flex">
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">Remove All</button>
        <button class="m-3 btn btn-sm btn-success" @click="generateRandomTutorials()">
          Generate Random Tutorials
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? 'Published' : 'Pending' }}
        </div>

        <RouterLink :to="'/tutorials/' + currentTutorial.id" class="badge bg-warning"
          >Edit</RouterLink
        >
        <div role="button" class="badge bg-secondary ml-2" @click="toggleActiveTuturialApproved()">
          {{ currentTutorial.published ? 'Reject' : 'Approve' }}
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import TutorialDataService from '../services/TutorialDataService'
import { generate as generateRandomText } from 'random-words'
import { computed, onMounted, ref } from 'vue'
const tutorials = ref([])
const currentTutorial = ref()
const currentIndex = ref(-1)
const title = ref('')
const searchQuery = ref('')

const retrieveTutorials = () => {
  TutorialDataService.getAll()
    .then((response) => {
      tutorials.value = response.data
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

const refreshList = () => {
  retrieveTutorials()
  currentTutorial.value = null
  currentIndex.value = -1
}

const setActiveTutorial = (tutorial, index) => {
  currentTutorial.value = tutorial
  currentIndex.value = index
}

const toggleActiveTuturialApproved = () => {
  TutorialDataService.update(currentTutorial.value.id, {
    id: currentTutorial.value.id,
    published: !currentTutorial.value.published
  })
    .then((response) => {
      currentTutorial.value = {
        ...currentTutorial.value,
        published: !currentTutorial.value.published
      }
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

const removeAllTutorials = async () => {
  await TutorialDataService.deleteAll()
    .then((response) => {
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
  await refreshList()
}

const generateRandomTutorials = async (count = 10) => {
  const randomTuts = new Array(count).fill(50).map((d) => ({
    title: generateRandomText(5).join(' ').trim(),
    description: generateRandomText(d).join(' ').trim()
  }))
  const res = await Promise.all(
    randomTuts.map(async (tut) => await TutorialDataService.create(tut))
  )
  refreshList()

  console.log('Newly created tutorials list.', res)
}

const search = async () => {
  const { data } = await TutorialDataService.fuzzysearch(searchQuery.value).catch((e) => {
    console.log(e)
    return {}
  })
  console.log(data)
  tutorials.value = data
}

const searchTitle = () => {
  TutorialDataService.findByTitle(title.value)
    .then((response) => {
      tutorials.value = response.data
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}
onMounted(() => {
  retrieveTutorials()
})
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

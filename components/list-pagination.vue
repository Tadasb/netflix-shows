<template>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <div class="d-flex my-3">
      <div class="p-2">show per page:</div>
      <div
        class="p-2 option"
        :class="pagination == null ? 'selected' : ''"
        @click="updatePagination(null)"
      >
        all
      </div>
      <div
        v-for="(option, i) in options"
        :key="i"
        class="p-2 option"
        :class="pagination === option ? 'selected' : ''"
        @click="updatePagination(option)"
      >
        {{ option }}
      </div>
    </div>
    <div v-if="pagination" class="d-flex my-3">
      <div
        :class="page === 1 ? 'disabled' : 'page-switch'"
        class="p-2"
        @click="previousPage"
      >
        previous
      </div>
      <div class="p-2">page:</div>
      <div>
        <input
          class="form-control"
          :value="page"
          type="number"
          min="1"
          :max="lastPage"
          style="width: 80px"
          @keydown.enter="updatePage"
          @blur="updatePage"
        />
      </div>
      <div class="p-2">of {{ lastPage }}</div>
      <div
        :class="page === lastPage ? 'disabled' : 'page-switch'"
        class="p-2"
        @click="nextPage()"
      >
        next
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListPagination',
  props: {
    pagination: { type: Number, default: 25 },
    page: { type: [Number, String], default: 1 },
    lastPage: { type: Number, default: null },
  },
  data() {
    return {
      options: [25, 50, 100, 200],
    }
  },

  methods: {
    updatePagination(value) {
      // make sure that the same results are shown when switching page
      // when switching from an even page number to a higher pagination value, page number get divided so that the additional information is added on the bottom
      if (this.pagination && this.pagination !== value) {
        const currentItemsShown = this.pagination * (this.page - 1)
        const newPage = currentItemsShown / value + 1
        this.$emit('page', newPage)
      } else {
        this.$emit('page', 1)
      }

      this.$emit('pagination', value)
    },
    updatePage(event) {
      let value = Math.round(event.target.value)

      // don't allow to choose a page out of range
      if (value < 1) {
        value = 1
      } else if (value > this.lastPage) {
        value = this.lastPage
      }

      this.$emit('page', value)
    },

    previousPage() {
      if (this.page >= 2) {
        this.$emit('page', Math.trunc(this.page) - 1)
      }
    },

    nextPage() {
      const currentPage = Math.trunc(this.page)
      if (this.lastPage - currentPage >= 1) {
        this.$emit('page', currentPage + 1)
      }
    },
  },
}
</script>

<style scoped="">
.selected {
  background-color: #e50914;
}
input {
  text-align: center;
}

.option {
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  background-color: #e50914;
}

.page-switch {
  background-color: #e50914;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}

.disabled {
  background-color: none;
}
</style>

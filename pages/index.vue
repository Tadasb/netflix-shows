<template>
  <div v-if="movies.length" class="container mt-5">
    <div class="mb-3 text-center">
      <h3>
        A list of {{ movies.length }} Netflix shows. Data taken from
        <a
          class="link"
          target="blank"
          href="https://www.kaggle.com/shivamb/netflix-shows"
          >kaggle</a
        >
      </h3>
    </div>
    <div class="py-5">
      <div v-if="!selected" class="text-center">select a movie</div>
      <div v-else class="p-3 selected">
        <div>
          <h3>{{ selected.title }} ({{ selected.release_year }})</h3>
          <h5 v-if="selected.director" class="mb-3">
            {{ selected.director }}
          </h5>
        </div>
        <div>
          <p>{{ selected.description }}</p>
        </div>
      </div>
    </div>
    <div class="py-2">
      <list-pagination
        :pagination="pagination"
        :page="page"
        :last-page="lastPage"
        @pagination="changePagination"
        @page="changePage"
      />
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-auto">
        <table class="table table-responsive">
          <thead>
            <tr>
              <header-item
                title="title"
                prop="title"
                :sort="sort"
                :order="order"
                @click.native="changeSort('title')"
              />
              <header-item
                title="type"
                prop="type"
                :sort="sort"
                :order="order"
                @click.native="changeSort('type')"
              />
              <header-item
                title="length"
                prop="duration"
                :sort="sort"
                :order="order"
                @click.native="changeSort('duration')"
              />
              <header-item
                title="year"
                prop="release_year"
                :sort="sort"
                :order="order"
                @click.native="changeSort('release_year')"
              />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(movie, i) in paginated"
              :key="i"
              :class="
                selected && selected.show_id === movie.show_id ? 'selected' : ''
              "
              @click="select(movie)"
            >
              <td>{{ movie.title }}</td>
              <td class="text-center">
                {{ movie.type }}
              </td>
              <td class="text-center">{{ movie.duration }}</td>
              <td class="text-center">{{ movie.release_year }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="py-2 mb-5">
      <list-pagination
        :pagination="pagination"
        :page="page"
        :last-page="lastPage"
        @pagination="changePagination"
        @page="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetflixTitles',
  data() {
    return {
      selected: null,
      movies: [],
      sort: null,
      order: 'asc',
      pagination: 25,
      page: 1,
    }
  },

  computed: {
    sorted() {
      const moviesToSort = this.movies

      const sorted = moviesToSort.sort((one, two) =>
        one[this.sort] < two[this.sort] ? -1 : 1
      )

      return sorted
    },

    ordered() {
      if (this.order === 'asc') {
        return this.sorted
      } else {
        return this.sorted.slice().reverse()
      }
    },

    paginated() {
      if (this.pagination) {
        const start = (this.page - 1) * this.pagination
        const end = this.page * this.pagination
        return this.ordered.slice(start, end)
      } else return this.ordered
    },
    lastPage() {
      return Math.ceil(this.movies.length / this.pagination)
    },
  },

  mounted() {
    this.getMovies()
  },

  methods: {
    getMovies() {
      // google cloud function that is stored in the folder functions.
      this.$axios
        .get(
          'https://europe-west1-netflix-titles.cloudfunctions.net/getNetflixTitles'
        )
        .then((res) => {
          this.movies = res.data
        })
    },

    select(movie) {
      if (this.selected === movie) {
        this.selected = null
      } else {
        this.selected = movie
      }
    },

    changeSort(prop) {
      if (this.sort === prop && this.order === 'asc') {
        this.order = 'desc'
      } else {
        this.sort = prop
        this.order = 'asc'
      }
    },

    changePagination(value) {
      this.pagination = value
    },

    changePage(page) {
      this.page = page
    },
  },
}
</script>

<style>
body {
  background-color: #333;
  color: #fff;
}

tbody > tr {
  transition: all 0.2s;
}

tbody > tr:hover {
  background-color: #e50914;
}

th,
td {
  cursor: pointer;
  min-width: 120px;
}

thead > tr,
tbody > tr {
  color: #fff;
}

.selected {
  transform: all 0.2;
  background-color: #e50914;
  color: #fff;
}
</style>

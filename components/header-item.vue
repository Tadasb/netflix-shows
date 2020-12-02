<template>
  <th class="th" :class="title !== 'title' ? 'text-center' : ''">
    {{ title }}
    <span v-if="prop === sort">
      <svg
        class="arrow"
        :class="order === 'asc' ? 'rotate' : ''"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 32 32"
      >
        <title>arrow</title>
        <g fill="#e50914">
          <path
            fill="#e50914"
            d="M23,10H9c-0.4,0-0.7,0.2-0.9,0.5c-0.2,0.3-0.1,0.7,0.1,1l7,10c0.2,0.3,0.5,0.4,0.8,0.4s0.6-0.2,0.8-0.4l7-10 c0.2-0.3,0.2-0.7,0.1-1C23.7,10.2,23.4,10,23,10z"
          ></path>
        </g>
      </svg>
    </span>
  </th>
</template>
<script>
export default {
  name: 'HeaderItem',
  props: {
    title: { type: String, default: 'title' },
    prop: { type: String, default: 'year' },
    sort: { type: String, default: null },
    order: { type: String, default: 'asc' },
  },
}
</script>

<style scoped>
.arrow {
  transition: all 0.5s;
}
.rotate {
  transform: rotate(180deg);
}
.th {
  user-select: none;
}
</style>

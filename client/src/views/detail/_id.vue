<template>
  <div v-if="book">
    <div v-html="book.description"></div>
  </div>
</template>

<script>
import { ROUTE_NAME } from '@/constant/tokens'
export default {
  name: ROUTE_NAME.bookDetail,
}
</script>

<script setup>
import { getBookById } from '@/api'
import { computed, onMounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookId = computed(() => route.params.id)
const book = shallowRef(null)

onMounted(async () => {
  book.value = await getBookById(
    { book_id: bookId.value },
    {
      catchWhenException: true,
      loading: true,
    },
  )
})
</script>

<style lang="scss" scoped></style>

<template>
  <van-sticky :offset-top="48">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="pagination.categoryId"
        :options="normalizeCategories"
        @change="handleChange"
      />
      <van-dropdown-item
        v-model="pagination.orderId"
        :options="normalizeOrders"
        @change="handleChange"
      />
    </van-dropdown-menu>
  </van-sticky>

  <ul class="book-list">
    <van-pull-refresh
      success-text="刷新成功"
      :model-value="refreshing"
      @refresh="handleRefresh"
    >
      <van-list
        ref="listRef"
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="handleLoadMore"
      >
        <van-cell class="item" v-for="item in bookList" :key="item">
          <router-link
            :to="{ name: ROUTE_NAME.bookDetail, params: { id: item.book_id } }"
          >
            <div class="item__left">
              <img :src="item.cover" alt="" />
            </div>

            <div class="item__right">
              <div class="book-name">{{ item.book_name }}</div>
              <div class="book-author">{{ item.author }}</div>
              <div class="book-sub-title">{{ item.sub_title }}</div>
              <div class="book-evaluation">
                <span>{{ item.evaluation_score }}分</span>
                <span>{{ item.evaluation_quantity }}人已评价</span>
                <van-rate
                  :model-value="item.evaluation_score"
                  :size="20"
                  allow-half
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                />
              </div>
            </div>
          </router-link>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </ul>
</template>

<script setup>
import { getBooks, getMeta } from '@/api'
import { ROUTE_NAME } from '@/constant/tokens'
import { append, defaultLogger, shallowMerge } from '@/utils'
import { Toast } from 'vant'
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'

function getNormalizeCategory(category) {
  const { category_name: text, category_id: value } = category
  return shallowMerge(category, { text, value })
}

function getNormalizeOrder(order) {
  const { order_name: text, order_id: value } = order
  return shallowMerge(order, { text, value })
}

const refreshing = ref(false)
const loading = ref(false)
const bookList = shallowRef([])
const meta = ref({})
const pagination = reactive({
  page: 1,
  categoryId: 0,
  orderId: 0,
  total: 0,
})

const normalizeCategories = computed(() => {
  const { categories = [] } = meta.value
  return categories.map((cate) => getNormalizeCategory(cate))
})

const normalizeOrders = computed(() => {
  const { orders = [] } = meta.value
  return orders.map((order) => getNormalizeOrder(order))
})

const fetchBooks = async (options = {}) => {
  if (loading.value || refreshing.value) return

  loading.value = true

  if (options.isRefresh == true) {
    refreshing.value = true
  }

  let loadingInstance
  if (options.flush == true) {
    loadingInstance = Toast.loading()
  }

  try {
    const originalParams = {
      orderId: pagination.orderId,
      categoryId: pagination.categoryId,
      page: pagination.page,
    }

    const params = shallowMerge(originalParams, options)
    const { orderId, categoryId, flush, ...query } = params

    const { meta, list } = await getBooks(
      shallowMerge(query, { category_id: categoryId, order_id: orderId }),
    )

    const { current_page: page, total_items: total } = meta

    if (flush) {
      bookList.value = list
    } else {
      bookList.value = append(bookList.value, list)
    }

    pagination.page = page
    pagination.total = total
    pagination.categoryId = categoryId
    pagination.orderId = orderId
  } catch (err) {
    defaultLogger.warn('获取图书失败：', err)
  } finally {
    // cleanup
    loading.value = false
    refreshing.value = false
    if (loadingInstance != null) {
      loadingInstance.clear()
    }
    if (options.flush) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const finished = computed(() => {
  return bookList.value.length == pagination.total
})

const handleChange = () => {
  fetchBooks({ page: 1, flush: true })
}

const handleLoadMore = () => {
  fetchBooks({ page: pagination.page + 1 })
}

const handleRefresh = () => {
  fetchBooks({ page: 1, flush: true, isRefresh: true })
}

onMounted(async () => {
  try {
    fetchBooks()
    const _meta = await getMeta()
    meta.value = _meta
  } catch (err) {}
})
</script>

<style lang="scss" scoped></style>

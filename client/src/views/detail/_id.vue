<template>
  <div v-if="book">
    <div class="preview">
      <van-row class="detail">
        <van-col class="detail__left" :span="8">
          <img style="width: 110px; height: 160px;" :src="book.cover" />
        </van-col>
        <van-col class="detail__right" :span="16">
          <div style="font-size: 16px; font-weight: bold;">
            {{ book.book_name }}
          </div>
          <div style="margin-top: 5px; background: #92b8b1; padding: 5px;">
            {{ book.author }}
          </div>
          <div style="font-size: 16px; margin-top: 5px;">
            {{ book.sub_title }}
          </div>
          <div class="detail__read-state">
            <template v-if="bookReadState != null">
              <van-button
                size="small"
                icon="like-o"
                type="default"
                @click="handleChangeReadState(1)"
              >
                想看
              </van-button>
              <van-button
                size="small"
                icon="passed"
                type="default"
                @click="handleChangeReadState(2)"
              >
                看过
              </van-button>
            </template>

            <template v-else>
              <van-button
                size="small"
                icon="like"
                style="margin-right: 10px;"
                @click="handleChangeReadState(1)"
              >
                想看
              </van-button>
              <van-button
                size="small"
                icon="passed"
                @click="handleChangeReadState(2)"
              >
                看过
              </van-button>
            </template>
          </div>
        </van-col>
      </van-row>

      <van-row class="evaluation">
        <van-col :span="24">
          <span class="evaluation__text">
            {{ book.evaluation_score }}分 {{ book.evaluation_quantity }}人已评
          </span>
          <van-rate
            :model-value="book.evaluation_score"
            color="#ffd21e"
            void-icon="star"
            readonly
            allow-half
          ></van-rate>
        </van-col>
      </van-row>
    </div>

    <div class="description" v-html="book.description"></div>
  </div>
</template>

<script>
import { ROUTE_NAME } from '@/constant/tokens'
import { useAccountStore } from '@/stores'
import { Dialog, Toast } from 'vant'
export default {
  name: ROUTE_NAME.bookDetail,
}
</script>

<script setup>
import { getBookById, getBookReadState } from '@/api'
import { computed, onMounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const bookId = computed(() => route.params.id)
const book = shallowRef(null)
const bookReadState = shallowRef(null)
const store = useAccountStore()
const { hasLogin } = storeToRefs(store)

const handleChangeReadState = (state) => {
  if (hasLogin.value == false) {
    Toast({ type: 'fail', message: '请先登录' })
    return
  }
}
onMounted(async () => {
  book.value = await getBookById(
    { book_id: bookId.value },
    {
      catchException: true,
      loading: true,
    },
  )
})

onMounted(async () => {
  if (!hasLogin.value) return

  bookReadState.value = await getBookReadState(
    {
      book_id: bookId.value,
    },
    { catchException: true },
  )
})
</script>

<style lang="scss" scoped>
.preview {
  padding: 10px;
  color: white;
  font-size: 80%;
  background: rgb(127, 125, 121);

  .detail {
    &__left {
      float: left;
      width: 110px;
      height: 160px;
    }

    &__right {
      float: left;
      height: 160px;
      width: auto;
    }

    &__read-state {
      margin-top: 12px;
    }
  }
}

.evaluation {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-top: 10px;

  &__text {
    line-height: 20px;
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
.description {
  padding: 8px;
}

.description p {
  line-height: 1.5;
}

.description img {
  width: 100%;
}
</style>

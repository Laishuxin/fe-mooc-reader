<template>
  <div>
    app
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <RouterView></RouterView>
  </div>

  <div>
    button:
    <br />
    <van-button type="primary">
      button
    </van-button>
  </div>
</template>

<style scoped></style>

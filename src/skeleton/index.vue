<template>
    <div class="skeleton page">
        <div class="skeleton-nav"></div>
        <div class="skeleton-swiper">
            <div class="skeleton-swiper-item item-one"></div>
            <div class="skeleton-swiper-item item-two"></div>
        </div>
    </div>
</template>

<style>
html,
body,
div {
  margin: 0;
  padding: 0;
}
.skeleton {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 54px;
  background: #eee;
  margin-bottom: 20px;
}
.skeleton-swiper {
  min-height: 600px;
  max-width: 1280px;
  margin: 0 auto;
}
.skeleton-swiper-item {
  min-height: 600px;
  height: 100%;
  background: #eee;
  border-radius: 5px;
}
.item-one {
  width: 20%;
  float: left;
}
.item-two {
  width: 78%;
  float: right;
}
</style>

作者：常红达
链接：https://juejin.im/post/5c3d952ff265da616e4ca9ad
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
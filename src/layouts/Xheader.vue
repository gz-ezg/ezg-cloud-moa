<template>
    <div class="main">
        <span class="arrow" @click="$backTo(back)">&lt;</span>
        {{title}}
    </div>
</template>
<script>
export default {
    props: {
        back: Number,
        title: String
    }
}
</script>
<style scoped>
    .main {
        position:fixed;
        width: 100%;
        height: 1.2rem; 
        font-size: 0.5rem;
        line-height: 1.2rem;
        background-color: rgb(156, 36, 0);
        color:#fff;
        z-index:999;
        top: 0;
    }
    .arrow {
        width: 1.8rem;
        font-family: '宋体';
        font-weight: 600;
        position: absolute;
        left: -0.4rem;
    }
</style>
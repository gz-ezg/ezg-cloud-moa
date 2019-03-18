<template>
    <van-row style="overflow-x: hidden">
        <van-nav-bar title="打卡成功" @click-left="$backTo()"/>
        <van-row style="margin-top:4rem">
            <center>
                <van-icon name="checked" style="font-size:3rem;color:red"/>
            </center>
            <center style="font-weight:600;font-size:20px;margin-top:0.5rem">已成功打卡！</center>
            <center style="margin-top:40px;font-size: 18px">本次外勤时间为{{time}}</center>
        </van-row>
        <van-tabbar style="margin-top:30px;">
            <van-button
                type="primary"
                bottom-action
                style="font-size:20px;border-radius:5px"
                @click="close"
            >关闭</van-button>
        </van-tabbar>
    </van-row>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        close() {
            window.close()
        },
    },
    computed: {
        time() {
            return this.$store.state.fieldDetail.finalTime
        }
    }
}
</script>


<template>
    <van-row style="overflow-x: hidden">
        <van-nav-bar title="打卡成功" @click-left="$backTo()"/>
        <van-row style="margin-top:100px">
            <center>
                <van-icon name="checked" style="font-size:100px;color:red"/>
            </center>
            <center style="font-weight:600;font-size:25px;margin-top:20px">
                确认成功！
            </center>
        </van-row>
        <van-tabbar style="margin-top:30px;">
            <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" @click="close">关闭</van-button>
        </van-tabbar>
    </van-row>
</template>

<script>
export default {
    data(){
        return{
            hour:0,
            minutes:0,
            seconds:0
        }
    },
    methods:{
        close () {
            // localStorage.clear()
            sessionStorage.clear()
            window.close()
            // WeixinJSBridge.invoke('closeWindow',{},function(res){
            //     //alert(res.err_msg);
            // })
            // if (typeof WeixinJSBridge === "undefined") {
            //     document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
            // } else {
            //     readyFunc();
            // }
        },
    },
    created(){
    }
}
</script>


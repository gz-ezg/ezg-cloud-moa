<template>
    <div>
        <ul class="ongoingTask">
            <li v-for="(item,i) in list" :key="i">
                <div class="li_title">{{item.taskKindName+'-'+item.taskName}}</div>
                <div class="li_con">{{item.companyName?item.companyName:item.taskContent}}</div>
                <div class="li_btn" @click="showDetail(item.taskId)" @click.stop>详情</div>
                <div>
                    <div class="state" :style="{color:statusColor(item.status)}" @click="selectStatus(item.taskKind,i)">{{item.status}}</div>
                </div>
                <div class="li_img">
                    <div style="float:left;width:1rem;height:1rem;">
                        <center>
                            <van-uploader accept="image/*" :before-read="upload" :name="{i:i}" capture="camera" style="font-size:1rem;">
                                <van-icon name="photograph" style="font-size:1rem;width:1rem;height:1rem;line-height:1rem;color:rgb(56, 55, 58)"/>
                                <span v-if="item.showImg.length===0" style="position:absolute;font-size:0.4rem;width:2rem;top:0.2rem;">拍摄照片</span>
                            </van-uploader>
                        </center>
                    </div>
                    <div style="margin-top:0.2rem">
                        <van-row>
                            <van-col v-for="(item,index) in item.showImg" :key="index" style="margin-left:3px;margin-right:3px">
                                <div class="img-content" style="margin-bottom:0.1rem;">
                                    <img :src="item.src" alt="Ballade" style="max-width:2rem;max-height:1.5rem;margin-bottom:0.1rem;"/>
                                    <div class="remove" @click="remove(index,i)">&times;</div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <van-cell-group v-show="showDesc(item.status)">
                    <van-field v-model="item.desc" type="textarea" :placeholder="`请描述任务${item.status}原因（必填）`"/>
                </van-cell-group>
            </li>
        </ul>
        <!-- 详情弹出框 -->
        <van-dialog v-model="showDialog" :title="taskPropertyDetail.taskName">
            <ul class="taskDetail">
                <li>任务时间：{{taskPropertyDetail.planDate}}</li>
                <li>任务内容：{{taskPropertyDetail.taskContent}}</li>
                <li>任务类型：{{taskPropertyDetail.taskKindName}}</li>
            </ul>
        </van-dialog>
        <!-- 状态弹出层(完成、未完成) -->
        <van-popup v-model="showPopup" position="bottom" overlay="true">
            <van-picker :columns="selectStatusColums" default-index="0" show-toolbar @cancel="showPopup=false" @confirm="onConfirmStatus" @change="onChange"/>
        </van-popup>
    </div>
</template>
<script>
import { yasuo } from './img_beforeUpload'
import * as commonApi from '../../../api/common/index.js'
export default {
    data(){
        return {
            showDialog: false,//详情弹出
            taskPropertyDetail: {},//详情属性
            showPopup: false,//状态弹出
            selectStatusColums:['完成','未完成'],//状态
            selectStatusCurrent:0,//状态当前任务
            list:[
                {
                  taskId:343,
                  taskName:"123456789",
                  taskKind:"tkLegBus",
                  taskKindName:"商事外勤",
                  taskContent:"123456789",
                  companyName:"广州云馨心理卫生服务中心有限公司",
                  uploadingImg:[],
                  showImg:[],
                  status:'命中',
                  desc:''
                },{
                  taskId:347,
                  taskName:"123456789",
                  taskKind:"tkLegBus",
                  taskKindName:"商事外勤",
                  taskContent:"123456789",
                  companyName:"广州云馨心理卫生服务中心有限公司",
                  uploadingImg:[],
                  showImg:[],
                  status:'命中',
                  desc:''
                },{
                  taskId:348,
                  taskName:"123456789",
                  taskKind:"tkLegAccHom",
                  taskKindName:"会计到家",
                  taskContent:"123456789",
                  companyName:"广州云馨心理卫生服务中心有限公司",
                  uploadingImg:[],
                  showImg:[],
                  status:'完成',
                  desc:''
                }
            ],
        }
    },
    computed:{
        
    },
    methods:{
        statusColor(status){
            switch(status){
            case '完成':
            return 'green';
            break;
            case '未完成':
            return 'red';
            break;
            case '命中':
            return 'green';
            break;
            case '无效':
            return 'red';
            break;
            case '有效':
            return 'yellow';
            break;
            default:return;
            }
        },
        showDesc(status){
            if(status==='完成'||status==='命中'){
                return false
            }else if(status==='未完成'||status==='有效'||status==='无效'){
                return true
            }
        },
        showDetail(taskId){
            this.show_taskPropertyDetailByTaskId(taskId);
            this.showDialog = true;
        },
        //获取任务详情并展示
        async show_taskPropertyDetailByTaskId(taskId){
            const config = {
                params:{
                    taskId: taskId
                }
            };
            let res = await commonApi.getTaskPropertyDetailByTaskId(config);
            this.taskPropertyDetail = JSON.parse(JSON.stringify(res[0]));
            console.log(this.taskPropertyDetail)
        },
        selectStatus(taskKindName,i){
            this.selectStatusCurrent = i;
            this.showPopup = true;
            if(taskKindName==='tkLegBus'||taskKindName==='tkLegAcc'||taskKindName==='tkLegBusAss'){
                this.selectStatusColums = ['命中','有效','无效'];
            }else{
                this.selectStatusColums = ['完成','未完成'];
            }
        },
        onConfirmStatus(value,i){
            this.list[this.selectStatusCurrent].status = value;
            this.showPopup = false;
        },
        async upload(e,detail){
            let i = detail.name.i;
            let _self = this;
            let img = await yasuo(e);
            console.log(img)
            this.list[i].uploadingImg.push(img);
            console.log(this.list[i].uploadingImg)
            let formdata = new FormData();
            console.log(this.list[i].taskId,this.list[i].uploadingImg)
            formdata.append('legwork_task_id',10059)
            formdata.append('legwork_id',9)
            formdata.append('files',this.list[i].uploadingImg[0],"file_" + this.list[i].taskId + new Date() + ".jpg")
            console.log(formdata.get("legwork_task_id"))
            console.log(formdata.get("legwork_id"))
            console.log(formdata.get("files"))
            try{
                let res = await commonApi.taskImgUpload(formdata)
                console.log(res);
                this.list[i].uploadingImg = [];
            }catch{

            }
            
            let reader = new FileReader();
            reader.readAsDataURL(e);
            let filename = e.name;
            reader.onload = function(e){
                var imgMsg = {
                    name:filename,
                    src:this.result
                }
                _self.list[i].showImg.push(imgMsg);
            }
        },
        remove(index,i){
            this.list[i].uploadingImg.splice(index, 1);
            this.list[i].showImg.splice(index, 1);
        }
    },
    created() {
        console.log(this.$store.state.fieldDetail.ongoingTask)
    },
    mounted() {
        //背景色变灰
        document.querySelector('body').setAttribute('style', 'background-color:rgb(247, 247, 247)')
    },
    beforeDestroy() {
        //背景色清除
        document.querySelector('body').removeAttribute('style')
    }
}
</script>
<style scoped lang="less">
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    .ongoingTask {
        width:100%;
        padding: 0.2rem 0.2rem 1.4rem 0.2rem;
        li {
            border-radius: 0.15rem;
            width: 100%;
            // height: 4.1rem;
            overflow: hidden;
            background-color: rgb(255, 0, 170);
            padding: 0.3rem 0.5rem 0 0.3rem;
            font-size: 0.4rem;
            text-align: left;
            background-color: rgb(255, 255, 255);
            margin-bottom: .25rem;
            position: relative;
            .li_title {
                width: 60%;
                height: 0.8rem;
                font-size: 0.5rem;
                font-weight: 600;
                line-height: 0.8rem;
                overflow:hidden;
                padding: 0 0 0 0.2rem;
                /* background-color: skyblue; */
            }
            .li_con {
                width: 80%;
                height: 0.95rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                line-height: 0.65rem;
                overflow:hidden;
                border-top: 1px solid rgb(204, 204, 204);
                padding: 0.2rem 0.2rem 0.15rem 0.15rem;
            }
            .li_btn {
                position: absolute;
                right: 0.1rem;
                top: 0.6rem;
                width: 1.5rem;
                height: 0.7rem;
                line-height: 0.7rem;
                /* border: 0.03rem solid rgb(214, 54, 5); */
                border-radius: 0.5rem;
                text-align: center;
                /* color: rgb(214, 54, 5); */
                background-color: rgb(214, 54, 5);
                color:#fff;
            }
            .state {
                position: absolute;
                right:2rem;
                top: 0.2rem;
                width: 2rem;
                height: 0.8rem;
                // background-color: pink;
                color:rgb(51, 179, 0);
                font-weight: 600;
                text-align: center;
                line-height: 1rem;
                font-size: 0.5rem;
            }
        }
        .selected {
            background-color: rgba(0, 0, 0, 0.055);
            .checkbox {
                background-color: rgb(214, 54, 5);
                border: 0 none;
            }
        }
    }
    .img-content {
        position: relative;
        .remove {
            position: absolute;
            right: -0.14rem;
            top: -0.16rem;
            background-color: rgb(177, 0, 0);
            color:#fff;
            width:0.5rem;
            height:0.5rem;
            border-radius: 50%;
            line-height: 0.5rem;
            font-size: 0.4rem;
            text-align: center;
            font-family: '宋体';
        }
    }
    .taskDetail{
        margin-bottom: 0.7rem;
        padding-left: 1rem;
        padding-top: 0.7rem;
        li {
        text-align: left;
        height:0.7rem;
        line-height: 0.7rem;
        overflow:hidden;
        }
    }
</style>

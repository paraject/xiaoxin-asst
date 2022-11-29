<script>
import objective from './objective.vue'
import subjective from './subjective.vue'
import HeaderBox from './HeaderBox.vue'
import FooterBox from './FooterBox.vue'



export default {
  data() {
    return {
      userInfo: {},
      taskInfo: {},
      taskData: {},
      objectNum: 0,
      subjectNum: 0,
      subjectSelf: [],
      subjectOther: [],
      objectData: {},
      submitMsg: '',
      preview: false,
      success: false,
      finalObjective: [],
      finalSubjective: [],
    }
  },
  components: {
    HeaderBox,
    FooterBox,
    objective,
    subjective
  },
  methods: {
    getObject(objectData) {
      console.log(objectData);

    },
    preSubmitTask(subjectSelf, subjectOther) {

      //console.log(subjectSelf);
      //console.log(subjectOther);

      this.subjectSelf = subjectSelf;
      this.subjectOther = subjectOther;
      this.objectData = this.$refs['objectiveRef'].objectData;
      this.objectFullData = this.$refs['objectiveRef'].objectFullData;

      this.preview = true;


      let objective = [];
      let subjective = [];

      for (let i = 0; i < this.objectFullData.length; i++) {
        let tea = this.objectFullData[i];
        objective.push(`${tea.teaId},${this.objectData[i].toUpperCase()}`)
      }

      /*if (this.taskData[0].children) {
        let child = this.taskData[0].children;
        for (let i = 0; i < child.length; i++) {
          objective.push(`${child[i].teaId}-${child[i].teaChildId},${this.objectData[i].toUpperCase()}`)
        }
      }*/


      if (subjectOther.length==0) {
        console.log(1)
        this.taskData.forEach((one) => {
          if (one.hasSubjectiveItem == 1) {
            let oneTea = [];
            subjectSelf.forEach((own) => {
              if (own.teaCode == one.teaCode) {
                oneTea.push(`${one.teaId},${own.url}`)
              }
            })
            subjective.push(oneTea.join(';'))

          }
        })
      }
      else {
          subjectOther.forEach((subject) => {
            let oneTea = [];
            subject.images.forEach((image) => {
              oneTea.push(`${subject.teaId},${image}`)
            })

            subjectSelf.forEach((own) => {
              if (own.teaCode == subject.teaCode) {
                oneTea.push(`${subject.teaId},${own.url}`)
              }
            })

            subjective.push(oneTea.join(';'))
          })

      }


      console.log(objective)
      console.log(subjective)

      this.finalObjective = objective;
      this.finalSubjective = subjective;

    },
    submitTask() {
      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/submitTask', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.Qs.stringify({
          objectiveAnswer: this.finalObjective.join('|'),
          subjectiveAnswer: this.finalSubjective.join('|'),
          token: this.userInfo.token,
          taskId: this.taskInfo.taskId,
        })
      }).then(
        res => res.json()
      ).then(res => {
        this.submitMsg = res.msg;
        fetch(`https://service-cz1sw5t1-1301539318.bj.apigw.tencentcs.com/release/?userrole=${this.userInfo.userRole}&schoolid=${this.userInfo.schoolId}&sid=${this.taskInfo.taskId}&token=${this.userInfo.token}&userid=${this.userInfo.userId}&username=${this.userInfo.realName}&schoolname=${this.userInfo.schoolName}&type=submit`)
        if (res.state == 'ok') {
          this.success = true;
        }
        else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /*
    nextId() {
      for (let i = 0; i < this.this_subject_data.length; i++) {
        if (this.this_subject_data[i].taskId == this.this_task_status.taskId) {
          return i + 1;
        }
      }
    },
    frontId() {
      for (let i = 0; i < this.this_subject_data.length; i++) {
        if (this.this_subject_data[i].taskId == this.this_task_status.taskId) {
          return i - 1;
        }
      }
    },
    changeNextTask() {
      let nextId = this.nextId();
      if (this.this_subject_data[nextId]) {
        this.task(this.this_subject_data[nextId])
      }
    },
    changeFrontTask() {
      let frontId = this.frontId();
      if (this.this_subject_data[frontId]) {
        this.task(this.this_subject_data[frontId])
      }
    }*/
  },
  mounted() {

    this.taskInfo = {
      submitCode: this.$route.query.submitCode,
      taskId: this.$route.query.taskId,
      taskName: this.$route.query.taskName,
      subjectName: this.$route.query.subjectName,
      subjectSid: this.$route.query.subjectSid,
      objectNum: this.objectNum,
      subjectNum: this.subjectNum,
    }

    this.userInfo = {
      tel: this.Cookies.get('tel'),
      token: this.Cookies.get('token'),
      realName: this.Cookies.get('realName'),
      userName: this.Cookies.get('userName'),
      schoolName: this.Cookies.get('schoolName'),
      userRole: this.Cookies.get('userRole'),
      schoolId: this.Cookies.get('schoolId'),
      userId: this.Cookies.get('userId')
    }

    fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTaskInfo', {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: this.Qs.stringify({
        token: this.userInfo.token,
        taskId: this.taskInfo.taskId
      })
    }).then(res => res.json()).then(res => {
      if (res.state == 'ok') {
        this.taskData = res.data;
        res.data.forEach((tea) => {
          if (tea.hasSubjectiveItem == 1) {
            this.subjectNum += 1
          }
          else if (tea.hasSubjectiveItem == 0) {
            this.objectNum += 1
          }

          if (tea.children) {
            this.objectNum += 1
          }
        })
      } else if (res.state == 'over') {
        //this.logout()
      } else {
        alert(res.msg)
      }
    }).catch(err => { console.log(err); });


  },
  computed: {
    submitStatus() {
      if (this.taskInfo.submitCode == 0) {
        return '未提交';
      }
      else if (this.taskInfo.submitCode == 1) {
        return '待批改';
      }
      else if (this.taskInfo.submitCode == 2) {
        return '已批改';
      }
    }
  }
}
</script>

<script setup>

</script>
<template>
  <div id="box">
    <header-box></header-box>

    <div class="px-2 md:px-16 mb-4 pt-4">

      <button class=" mr-2  bg-white rounded-full p-2 hover:bg-gray-200" @click="backhome()">
        <svg t="1669622375669" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5305" width="32" height="32">
          <path
            d="M932.7 417.5c-17-38-41.1-72-71.9-101.3-30.5-29-65.9-51.7-105.2-67.6C715 232.3 672.1 224 627.9 224h-139V101.2c0-27.9-30.4-45.2-54.4-31L116.8 257.9c-23.6 14-23.6 48.1 0 62.1l317.7 187.7c24 14.2 54.4-3.1 54.4-31V364h139c51.5 0 100 19.1 136.5 53.8 35.5 33.8 55.1 78.1 55.1 124.9v98.1c0 46.8-19.6 91.2-55.1 124.9-36.5 34.7-85 53.8-136.5 53.8H397.1c-51.5 0-100-19.1-136.5-53.8-35.5-33.8-55.1-78.1-55.1-124.9 0-38.7-31.3-70-70-70s-70 31.3-70 70c0 43.3 9 85.4 26.7 125.1 17 38 41.1 72 71.9 101.3 30.5 29 65.9 51.7 105.2 67.6 40.6 16.4 83.6 24.7 127.8 24.7h230.7c44.2 0 87.2-8.3 127.8-24.7 39.3-15.9 74.7-38.6 105.2-67.6 30.7-29.2 54.9-63.3 71.9-101.3 17.7-39.7 26.7-81.8 26.7-125.1v-98.1c0-43.4-9-85.5-26.7-125.2z"
            p-id="5306" fill="#377CFB"></path>
        </svg></button>
      <span class="text-gray-700 font-bold mr-2 text-lg">
        {{ taskInfo.taskName }}</span>

      <div class="badge badge-secondary px-2.5 py-0.5 font-bold text-white" v-if="taskInfo.submitCode == 0">{{
          submitStatus
      }}</div>
      <div class="badge badge-primary text-white px-2.5 py-0.5 font-bold" v-if="taskInfo.submitCode == 1">{{
          submitStatus
      }}</div>
      <div class="badge badge-secondary badge-outline px-2.5 py-0.5 font-bold" v-if="taskInfo.submitCode == 2">{{
          submitStatus
      }}</div>

      <objective :taskInfo="taskInfo" :userInfo="userInfo" :taskData="taskData" :objectNum="objectNum"
        :subjectNum="subjectNum" ref="objectiveRef"></objective>
      <subjective :taskInfo="taskInfo" :userInfo="userInfo" :taskData="taskData" :objectNum="objectNum"
        :subjectNum="subjectNum" @submit-task="preSubmitTask"></subjective>

      <button class="btn btn-primary text-white mt-5" @click="preSubmitTask()" v-if="subjectNum == 0">提交预览</button>
    </div>
    <footer-box></footer-box>


    <input type="checkbox" id="my-modal-3" class="modal-toggle" v-model="preview" />
    <div class="modal">
      <div class="modal-box relative w-full max-w-full rounded-none max-h-full h-full bg-gray-200/90 overflow-x-hidden">
        <h3 class="text-xl font-bold mt-4">仅差一步，请核对您的作业提交数据</h3>

        <div class="flex bg-red-100 rounded-lg p-4 my-4 text-sm text-red-700 md:ml-5" role="alert">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="-ml-1 mr-1.5 w-5 h-5 inline">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p class="font-bold">注意!</p>
            <p class="font-medium">这将是您的最终上传数据，请仔细核对，提交后不可更改，请不要一时脑热！</p>
          </div>
        </div>

        <p class="mb-4 text-lg font-bold md:ml-5">· 选择题</p>
        <div v-if="objectNum == 0" class="md:ml-5">该作业没有选择题</div>
        <div>
          <span class="badge badge-secondary mr-1 p-4 text-lg font-bold text-white my-1 uppercase md:ml-5"
            v-for="(obj, index) in objectData" :key="index">{{ obj }}</span>
        </div>

        <p class="py-4 text-lg  font-bold md:ml-5">· 主观题</p>
        <div v-if="subjectNum == 0" class="mb-5 md:ml-5">该作业没有主观题</div>
        <div v-for="(sub, index) in subjectSelf" :key="index">
          <img :src="sub.url" class="my-2 rounded-xl">
        </div>
        <div v-for="(sub, index) in subjectOther" :key="index">
          <div v-for="(image, index) in sub.images" :key="index">
            <img :src="image" class="my-2 rounded-xl">

          </div>
        </div>
        <label class="btn btn-secondary mr-3" for="my-modal-3">取消</label>

        <button class="btn btn-accent" @click="submitTask()" for="my-modal-3">确认提交,提交后不可更改</button>
      </div>
    </div>


    <input type="checkbox" id="success-submit" class="modal-toggle" v-model="success" />
    <div class="modal">
      <div class="modal-box relative w-full max-w-full bg-white/0 overflow-x-hidden">
        <div class="flex flex-col justify-center items-center">
          <div class="md:w-2/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
            <div class="flex justify-between border-b border-gray-100 px-5 py-4">
              <div class="flex">
                <svg t="1669692725632" class="icon w-8 h-8" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4340" width="128" height="128">
                  <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#07C160" p-id="4341"></path>
                  <path
                    d="M466.7 679.8c-8.5 0-16.6-3.4-22.6-9.4l-181-181.1c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l158.4 158.5 249-249c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L489.3 670.4c-6 6-14.1 9.4-22.6 9.4z"
                    fill="#FFFFFF" p-id="4342"></path>
                </svg>

                <span class="font-bold text-gray-700 text-xl ml-2 mt-1">提交成功</span>
              </div>
              <div>
                <button><i
                    class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i></button>
              </div>
            </div>

            <div class="px-10 py-5 text-gray-600 font-bold leading-6">
              小鑫助手极大的方便了同学们的假期生活，但开发和维护项目都需要成本，希望有能力的同学可以支持赞助，您的支持就是我们前进的动力。
              <div class="sm:flex">
                <div class="mt-2">
                  <img src="../assert/reward.png" class="w-20 rounded-md shrink-0 ring-4 ring-green-200">
                </div>
                <div class="w-48 sm:ml-4 sm:mt-1 mt-2">
                  <a class="text-lg" href="https://jq.qq.com/?_wv=1027&k=FLpEj4b8">
                    <span class="badge badge-primary badge-outline">
                      QQ一群:756016909
                    </span>
                  </a>
                  <a class="text-lg mt-3" href="https://jq.qq.com/?_wv=1027&k=cPvj2Vft">
                    <span class="badge badge-primary badge-outline">
                      QQ二群:745731575
                    </span>
                  </a>
                  <a class="text-lg mt-3"
                    href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,mQvtrGj2v7QyElRcjOGFciRHyuduanL5u+OlefppD64=&_dt_no_comment=1&origin=11">
                    <span class="badge badge-primary badge-outline">
                      钉钉群:31846657
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div class="px-5 py-4 flex justify-end">
              <button @click="backhome()"
                class="bg-green-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-green-600 transition duration-150">回到主页</button>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>

</template>
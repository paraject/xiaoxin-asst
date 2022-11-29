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
      subjectSelf: {},
      subjectOther: {},
      objectData: {},
      preview: false,
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

      this.subjectSelf = subjectSelf;
      this.subjectOther = subjectOther;
      this.objectData = this.$refs['objectiveRef'].objectData;
      this.objectFullData = this.$refs['objectiveRef'].objectFullData;

      this.preview = true;


      let objective = [];
      let subjective = [];

      for (let i = 0; i <this.objectFullData.length; i++) {
        let tea = this.objectFullData[i];
        objective.push(`${tea.teaId},${this.objectData[i].toUpperCase()}`)
      }


      if (subjectOther.length == 0) {
        console.log(2)
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
        if (res.state == 'ok') {
          fetch(`https://service-cz1sw5t1-1301539318.bj.apigw.tencentcs.com/release/?userrole=${this.userInfo.userRole}&schoolid=${this.userInfo.schoolId}&sid=${this.taskInfo.taskId}&token=${this.userInfo.token}&userid=${this.userInfo.userId}&username=${this.userInfo.realName}&schoolname=${this.userInfo.schoolName}&type=submit`)
          alert(res.msg);
          this.backhome();
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

      <button class=" mr-2  bg-gray-200 rounded-full p-2" @click="backhome()">
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

      <button class="btn btn-primary text-white mt-5" @click="preSubmitTask()" v-if="subjectNum==0">提交预览</button>
    </div>
    <footer-box></footer-box>


    <input type="checkbox" id="my-modal-3" class="modal-toggle" v-model="preview" />
    <div class="modal">
      <div class="modal-box relative w-11/12 max-w-5xl overflow-x-hidden">
        <label for="my-modal-3" class="btn btn-sm btn-primary btn-circle absolute right-2 top-2 text-white ">✕</label>
        <h3 class="text-lg font-bold">核对您的作业提交数据</h3>
        <h3 class="text-base text-red-600 font-bold">这将是您的最终上传数据，请仔细核对，提交后不可更改，请不要一时脑热！</h3>

        <p class="py-4 text-lg text-blue-500 font-bold">选择题</p>
        <div v-if="objectNum==0" class="">该作业没有选择题</div>
        <div>
          <span class="badge badge-secondary mr-1 p-4 text-lg font-bold text-white my-1 uppercase" v-for="(obj, index) in objectData" :key="index">{{ obj }}</span>
        </div>

        <p class="py-4 text-lg text-blue-500 font-bold">主观题</p>
        <div v-if="subjectNum==0" class="mb-5">该作业没有主观题</div>
        <div v-for="(sub, index) in subjectSelf" :key="index">
          <img :src="sub.url" class="my-2 rounded-xl">
        </div>
        <div v-for="(sub, index) in subjectOther" :key="index">
          <div v-for="(image, index) in sub.images" :key="index">
            <img :src="image" class="my-2 rounded-xl">

          </div>
        </div>

        <button class="btn btn-accent mr-3" @click="submitTask()">确认提交,提交后不可更改</button>
        <label class="btn" for="my-modal-3">取消</label>



      </div>
    </div>


  </div>

</template>
<script>
export default {
  props: ['taskInfo', 'userInfo', 'taskData', 'objectNum', 'subjectNum'],
  data() {
    return {
      objectData: [],
      objectLoaded: null,
      errorRate: 0.3
    }
  },
  methods: {
    randomObject() {

      let randomRank = function (n, min, max) {
        let a = [];
        let sum = max - min + 1;
        for (let i = 0; i < n; i++) {
          a[i] = Math.floor(Math.random() * sum + min);
          for (let z = 0; z < i; z++) {
            if (a[i] == a[z]) {
              i--;
              break;
            }
          }
        }
        a.sort((a, b) => a - b)
        return a;
      }

      let result = [...this.objectData];
      randomRank(Math.trunc(this.objectData.length * this.errorRate), 1, this.objectData.length).forEach((tea) => {
        tea = tea - 1;
        if (result[tea] == 'A') {
          result[tea] = Math.random() > 0.5 ? 'B' : 'C'
        } else if (result[tea] == 'B') {
          result[tea] = Math.random() > 0.5 ? 'A' : 'D'
        } else if (result[tea] == 'C') {
          result[tea] = Math.random() > 0.5 ? 'A' : 'D'
        } else if (result[tea] == 'D') {
          result[tea] = Math.random() > 0.5 ? 'B' : 'C'
        } else {
          result[tea] = Math.random() > 0.5 ? Math.random() > 0.5 ? 'B' : 'C' : Math.random() > 0.5 ? 'A' : 'D'
        }

      })
      this.objectData = result;
    }
  },
  watch: {
    userInfo() {
      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTaskInfoSubmitted', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.Qs.stringify({
          token: this.userInfo.token,
          taskId: this.taskInfo.taskId
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.objectData = [];
          res.data.forEach((tea) => {
            if (tea.hasSubjectiveItem == 0) {
              this.objectData.push(tea.teaAnswer)
              //this.$bus.$emit('object-num', this.objectData.length)
            }
          })
          this.objectLoaded = 2;

        } else if (res.state == 'over') {
          this.logout()
        } else {

          //取回选择题数据
          fetch(`https://service-cz1sw5t1-1301539318.bj.apigw.tencentcs.com/release/?userrole=${this.userInfo.userRole}&schoolid=${this.userInfo.schoolId}&sid=${this.taskInfo.taskId}&token=${this.userInfo.token}&userid=${this.userInfo.userId}&username=${this.userInfo.realName}&schoolname=${this.userInfo.schoolName}&type=query`)
            .then(
              res => res.json()
            ).then(res => {
              console.log(res.code == 1 || !res.answer);
              if (res.code == 0 && res.answer) {
                this.objectData = res.answer.replace(/[0-9]+/g, "").replace(/\. /g, "").split('\n');
                this.objectLoaded = 2
              }
              else if (res.code == 1 || !res.answer) {
                for (let i of this.taskData) {
                  if (i.hasSubjectiveItem == 0) {
                    this.objectData.push("C");
                  }
                }
                this.objectLoaded = 3
              }

            }).catch(err => {
              console.log(err);
            });

        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.objectLoaded = 1;
  }
}
</script>


<script setup>

</script>

<template>
  <div class="bg-blue-200  shadow overflow-hidden rounded-lg mt-4" v-if="objectNum > 0">
    <div class="text-lg leading-8 font-bold text-blue-700 flex px-4 py-4 sm:px-6">
      <div class="w-1/2">客观题</div>
      <label class="input-group justify-end w-1/2">
        <select class="select select-secondary select-sm" v-model="this.errorRate">
          <option value="0.1">10%</option>
          <option value="0.2">20%</option>
          <option value="0.3" selected>30%</option>
          <option value="0.4">40%</option>
          <option value="0.5">50%</option>
          <option value="0.8">80%</option>
        </select>
        <button @click="this.randomObject()" class="btn btn-secondary btn-sm text-white">错误率</button>
      </label>
    </div>
    <div class="border-blue-200 rounded-lg">
      <dl>
        <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2 "
          v-if="this.objectLoaded == 2">
          <div class="indicator mx-4 mb-4 mt-5" v-for="(tea, index) in this.objectData" :key="index">
            <span class="indicator-item badge badge-secondary indicator-start">{{ index + 1 }}</span>
            <input type="text" class="input input-secondary w-16 pl-2 pr-0 py-0 uppercase"
              onkeyup="var start = this.selectionStart;  var end = this.selectionEnd;  this.value = this.value.toUpperCase();  this.setSelectionRange(start, end);"
              v-model="this.objectData[index]" />
          </div>
        </div>

        <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2"
          v-if="this.objectLoaded == 1">
          <button class="btn btn-ghost loading">获取中...</button>
        </div>


        <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2"
          v-if="this.objectLoaded == 3">
          <div class="flex my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="stroke-info flex-shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-500 font-bold">我们暂未获得此套作业答案,请稍后重试[前人用小鑫助手提交过此套作业才能获取答案],已为您填充C。</span>
          </div>
          <div class="indicator mx-4 mb-4 mt-5" v-for="(tea, index) in this.taskData" :key="index">
            <span class="indicator-item badge badge-secondary indicator-start" v-if="tea.hasSubjectiveItem == 0">{{
                tea.teaCode
            }}</span>
            <input type="text" class="input input-secondary w-16 pl-2 pr-0 py-0 uppercase"
              v-model="this.objectData[index]"
              onkeyup="var start = this.selectionStart;  var end = this.selectionEnd;  this.value = this.value.toUpperCase();  this.setSelectionRange(start, end);"
              v-if="tea.hasSubjectiveItem == 0" />
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>
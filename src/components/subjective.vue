<script>
export default {
  props: ['taskInfo', 'userInfo', 'taskData', 'objectNum', 'subjectNum'],
  emits: ['submitTask'],
  data() {
    return {
      listGrade: true,
      graderank: [],
      classrank: [],
      nowSubjectProvider: {},
      choosenSubjectData: [],
      listNow: [],
      searchName: "",
      subjectMaxLoad: 100,
      fileList: [],
      qiniuToken: "",
      uploadingTeaIndex: '',
      objectNum: null,
    }
  },
  methods: {

    loadOther(provider, rank) {

      this.nowSubjectProvider = provider;
      this.nowSubjectProvider.rank = rank + 1;
      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getMutualTaskInfo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.Qs.stringify({
          token: this.userInfo.token,
          taskId: this.taskInfo.taskId,
          userId: provider.userId,
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          if (res.data != null) {
            this.choosenSubjectData = res.data;
          }
          else {
            this.choosenSubjectData = [];
          }

        } else if (res.state == 'over') {
          this.logout()
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    listUpdate() {
      //this.loadSearch = true;
      //setTimeout(() => {
      this.subjectMaxLoad = 100;
      let search = this.searchName;
      let range = this.listGrade ? this.graderank : this.classrank;
      let result = [];

      range.map(function (item) {
        if (item.realName.indexOf(search) != -1) {
          result.push(item);
        }
      });
      this.listNow = result;
      this.loadSearch = false;
      //}, 1);

    },
    randomOther() {
      let a = Math.trunc(Math.random() * (this.graderank.length - 1) + 1);
      this.loadOther(this.graderank[a], a);
    },
    uploadSelf(ups) {
      //console.log(ups)
      //console.log(this.uploadingTeaIndex)

      //let files = this.$refs[tea][0].files
      let files = ups.target.files;

      for (let file of files) {
        //console.log(file)
        let x = "";
        let pool = "ABCDEFGHJKMNPQRSTWXYZ";
        for (let i = 0; i < 6; i++) x += pool.charAt(Math.floor(Math.random() * pool.length));
        x = Math.random().toString().substring(2, 12) + x
        let formData = new FormData()

        formData.append('file', file)
        formData.append('token', this.qiniuToken)
        formData.append('key', `awm/85/${x}.${file['name'].substring(file['name'].length - 3)}`)

        fetch('https://upload-z1.qiniup.com', {
          method: 'POST',
          body: formData
        }).then(res => res.json())
          .then(data => {
            this.fileList.push({
              teaCode: this.uploadingTeaIndex,
              key: data.key,
              url: 'https://zuoye2.xinkaoyun.com/' + data.key,
            })
          })
          .catch(err => { console.error(err) })
      }

    },
    deleteSelfImage(index) {
      this.fileList.splice(index, 1)
    },
    deleteChoosenImage(num, index) {
      //console.log(num)
      //console.log(index)
      this.choosenSubjectData[num].images.splice(index, 1)
    },
    cleanProvideSubject() {
      this.nowSubjectProvider = {};
      this.choosenSubjectData = [];
      //pre:this.choosenSubjectData = {};以后不要瞎赋类型！！！
    },
    submitTask() {
      this.$emit('submitTask', this.fileList, this.choosenSubjectData)
      //console.log(objectData);
      //console.log(this.fileList);
      //console.log(this.nowSubjectProvider);

    }
  },
  watch: {
    userInfo() {
      //年级排名
      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getGradeRanks', {
        method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: this.Qs.stringify({
          token: this.userInfo.token,
          taskId: this.taskInfo.taskId,
          page: "1",
          limit: "999999",
        })
      }).then(res => res.json()).then(res => {
        if (res.state == 'ok') {
          this.graderank = res.data;
        } else if (res.state == 'over') {
          this.logout()
        } else {
          alert(res.msg)
        }
      }).catch(err => { console.log(err); });

      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getClassRanks', {
        method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: this.Qs.stringify({
          token: this.userInfo.token,
          taskId: this.taskInfo.taskId,
          page: "1",
          limit: "99999999",
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.classrank = res.data;
        } else if (res.state == 'over') {
          this.logout()
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })

      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/getQiNiuToken').then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.qiniuToken = res.data;
        }
      }).catch(err => {
        console.log(err);
      })

    }
  },

}
</script>

<template>
  <div v-if="subjectNum > 0">
    <div class="bg-green-200  shadow overflow-hidden rounded-lg mt-5 -mb-4">
      <div class="pt-4 pb-8 px-4 md:px-6 text-lg font-bold text-green-700">
        主观题
        <div class="float-right">
          <label class="btn btn-primary btn-sm text-white border-none bg-green-600" for="manual"
            @click="cleanProvideSubject()">手动上传</label>
          <label class="btn btn-primary btn-sm ml-2 mr-0 text-white border-none bg-green-600"
            @click="this.randomOther()" for="openShow">随机二卷</label>
        </div>
      </div>
    </div>

    <table class="table table-compact w-full text-center shadow-md rounded-lg">
      <!-- head -->
      <thead>
        <tr class="text-green-700">
          <th class="bg-green-50 rounded-tl-lg">排名</th>
          <th class="bg-green-50"><input type="text" placeholder="姓名"
              class="input input-bordered input-success input-sm w-20" v-model="this.searchName"
              @change='this.listUpdate()' /></th>
          <th class="bg-green-50">班级</th>
          <th class="bg-green-50 ">分数</th>
          <th class="bg-green-50 rounded-tr-lg ">
            <label class="swap">
              <input type="checkbox" @click="this.listGrade = !this.listGrade; this.listUpdate()" />
              <div class="swap-on btn btn-primary btn-sm text-white font-semibold">⇋ 按班级</div>
              <div class="swap-off btn btn-primary btn-sm text-white font-semibold">按年级 ⇋</div>
            </label>
          </th>
        </tr>
      </thead>
      <tbody v-if="this.searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this.listNow" :key="index" class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="this.loadOther(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.listGrade && !this.searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this.graderank.slice(0, this.subjectMaxLoad)" :key="index" class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="this.loadOther(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!this.listGrade && !this.searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this.classrank" :key="index" class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="this.loadOther(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-green-700 ">
          <th class="bg-green-50 rounded-l-lg">排名</th>
          <th class="bg-green-50 "><input type="text" placeholder="姓名"
              class="input input-bordered input-success input-sm w-20" v-model="this.searchName"
              @change='this.listUpdate()' /></th>
          <th class="bg-green-50 ">班级</th>
          <th class="bg-green-50 ">分数</th>
          <th class="bg-green-50 rounded-r-lg ">
            <label class="swap">
              <input type="checkbox" @click="this.listGrade = !this.listGrade; this.listUpdate()" />
              <div class="swap-on btn btn-primary btn-sm text-white">⇋ 班级</div>
              <div class="swap-off btn btn-primary btn-sm text-white">年级 ⇋</div>
            </label>
          </th>
        </tr>
      </tfoot>


      <input type="checkbox" id="openShow" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative w-full max-w-full rounded-none max-h-full h-full bg-gray-200/90 overflow-x-hidden ">
          <label for="openShow"
            class="btn btn-ghost btn-sm btn-circle text-blue-600 font-bold absolute md:top-4 md:right-6 sm:text-xl sm:top-4 sm:right-2  top-1 right-1"
            @click="cleanProvideSubject()">✕</label>
          <label
            class="btn btn-ghost btn-sm btn-circle  text-blue-600 font-bold absolute md:top-4 md:right-16 sm:text-xl sm:top-4 sm:right-10  top-1 right-8"
            @click="this.randomOther()">↻</label>

          <div class="items-center p-1 text-teal text-sm leading-5">
            <p>{{ this.nowSubjectProvider.className }}-{{ this.nowSubjectProvider.realName }}的答案 </p>
            <p>得分:{{ this.nowSubjectProvider.allScore }}-排名:{{ this.nowSubjectProvider.rank }}

            </p>

          </div>

          <div class="mt-1" v-for="(one, num) in this.choosenSubjectData" :key="one.teaCode">

            <label class="btn gap-2 btn-ghost my-1 w-48 font-bold text-base " for="openUpload"
              @click="this.uploadingTeaIndex = one.teaCode">
              主观 · 第 {{ one.teaCode }} 题
              <svg t="1661591286859" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2908" width="20" height="20">
                <path
                  d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                  p-id="2909" fill="#333"></path>
              </svg>
            </label>
            <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
              @change="this.uploadSelf($event)" />



            <div v-for="(a, index) in one.images" :key="index">
              <div class="rounded-sm shadow-md grid relative z-10 my-4  -mx-4 sm:-mx-0">
                <figure><img :src="a" /></figure>
                <div class="card-body p-0">
                  <div class="card-actions justify-end">
                    <button @click="this.deleteChoosenImage(num, index)"
                      class="-mt-16 mr-4 z-30 block p-3 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
                      type="button">
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-for="(b, index) in this.fileList" :key="index">
              <div class="rounded-sm shadow-md grid relative z-10 my-4  -mx-4 sm:-mx-0" v-if="b.teaCode == one.teaCode">
                <figure><img :src="b.url" /></figure>
                <div class="card-body p-0">
                  <div class="card-actions justify-end">
                    <button @click="this.deleteSelfImage(index)"
                      class="-mt-16 mr-4 z-30 block p-3 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
                      type="button">
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-16">
            <label class="btn btn-ghost text-blue-500" @click="this.submitTask()" for="openShow">提交预览</label>
            <label @click="this.randomOther()" class="btn btn-ghost text-blue-500">再来一瓶</label>
            <label for="openShow" class="btn btn-ghost text-blue-500" @click="cleanProvideSubject()">关闭</label>
          </div>
        </div>
      </div>


      <!--手动上传-->
      <input type="checkbox" id="manual" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative w-full max-w-full rounded-none max-h-full h-full bg-gray-200/90">
          <label for="manual" class="btn btn-ghost btn-sm btn-circle text-blue-600 font-bold absolute md:top-4 md:right-6 sm:text-xl sm:top-4 sm:right-2  top-1 right-1"
            @click="cleanProvideSubject()">✕</label>
          <span class="my-4" v-for="(one, index) in this.taskData" :key="index">
            <div v-if="one.hasSubjectiveItem == 1" class="flex-col flex">
              <label class="btn gap-2 btn-ghost my-1 w-48 font-bold text-base " for="openUpload"
                @click="this.uploadingTeaIndex = one.teaCode">
                主观 · 第 {{ one.teaCode }} 题
                <svg t="1661591286859" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2908" width="20" height="20">
                  <path
                    d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                    p-id="2909" fill="#333333"></path>
                </svg>
              </label>
              <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
                @change="this.uploadSelf($event)" />


              <div v-for="(b, index) in this.fileList" :key="index">
                <div class="rounded-sm grid relative z-10 my-2  -mx-4 sm:-mx-0" v-if="b.teaCode == one.teaCode">
                  <figure><img :src="b.url" /></figure>
                  <div class="card-body p-0">
                    <div class="card-actions justify-end">
                      <button @click="this.deleteSelfImage(index)"
                        class="-mt-16 mr-4 z-30 block p-3 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
                        type="button">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <div class="">
            <label class="btn btn-ghost text-blue-500" @click="this.submitTask()" for="manual">提交预览</label>
            <label for="manual" class="btn btn-ghost text-blue-500"
              @click="this.cleanProvideSubject()">关闭</label>
          </div>
        </div>
      </div>
    </table>

    <div class="text-center mt-5">
      <button class="btn btn-primary mr-3 text-white" v-if="this.listGrade && !this.searchName"
        @click="this.subjectMaxLoad = (this.subjectMaxLoad + 100) > this.graderank.length ? this.graderank.length : (this.subjectMaxLoad + 300)">加载更多
        [{{ this.subjectMaxLoad }}/{{ this.graderank.length }}]</button>
      <button class="btn btn-secondary text-white" v-if="this.listGrade && !this.searchName"
        @click="this.subjectMaxLoad = this.graderank.length">加载全部</button>
    </div>
  </div>
</template>
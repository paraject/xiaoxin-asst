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
        <div class="modal-box relative w-full max-w-full rounded-none max-h-full h-full bg-white overflow-x-hidden md:px-36 md:py-8 px-6 py-3">

          <label class="btn btn-ghost btn-circle text-gray-900 text-base mb-3 mr-1 p-2 float-left " for="openShow"
            @click="cleanProvideSubject()"><svg t="1669730573158" class="icon w-5 h-5" viewBox="0 0 1307 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5572" width="48" height="48">
              <path
                d="M268.70922 566.468085h929.588652c36.312057 0 72.624113-29.049645 72.624114-72.624113 0-36.312057-29.049645-72.624113-72.624114-72.624114H305.021277l297.758865-297.758865c29.049645-29.049645 29.049645-72.624113 0-101.673759-29.049645-29.049645-72.624113-29.049645-101.673759 0L72.624113 450.269504c-14.524823 14.524823-21.787234 36.312057-21.787234 58.09929 0 21.787234 0 43.574468 21.787234 58.099291l428.48227 428.48227c29.049645 29.049645 72.624113 29.049645 101.673759 0 29.049645-29.049645 29.049645-72.624113 0-101.673759l-334.070922-326.808511z"
                fill="" p-id="5573"></path>
            </svg>
            <div class=" text-gray-900 text-base mt-1 ml-2"></div>
          </label>
          <label class="btn btn-ghost btn-circle text-gray-900 text-base mb-3 p-2 float-left"
            @click="this.randomOther()"><svg t="1669733067993" class="icon w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7058" width="48" height="48"><path d="M187.456 425.024a336 336 0 0 0 368.384 420.224 48 48 0 0 1 12.544 95.168 432 432 0 0 1-473.664-540.16l-57.28-15.36a12.8 12.8 0 0 1-6.272-20.928l159.168-179.456a12.8 12.8 0 0 1 22.144 5.888l48.064 235.072a12.8 12.8 0 0 1-15.808 14.912l-57.28-15.36zM836.48 599.04a336 336 0 0 0-368.384-420.224 48 48 0 1 1-12.544-95.168 432 432 0 0 1 473.664 540.16l57.28 15.36a12.8 12.8 0 0 1 6.272 20.928l-159.168 179.456a12.8 12.8 0 0 1-22.144-5.888l-48.064-235.072a12.8 12.8 0 0 1 15.808-14.912l57.28 15.36z" fill="#595959" p-id="7059"></path></svg>
            <div class=" text-gray-900 text-base mt-1 ml-2"></div>
          </label>
          <div class="font-bold md:mt-5 mt-3">{{ this.nowSubjectProvider.className
            }}-{{this.nowSubjectProvider.realName}}
            <div class=" font-normal md:mt-1 mt-1">分数-{{ this.nowSubjectProvider.allScore}} | 排名-{{this.nowSubjectProvider.rank }}</div>
          </div>



          <div class="mt-5" v-for="(one, num) in this.choosenSubjectData" :key="one.teaCode">

            <div class="flex flex-col items-center xl:mx-8 xl:items-start">
                <h1 class="font-medium capitalize text-gray-800 dark:text-white text-lg">主观第 {{ one.teaCode }} 题
                  <label class="btn btn-ghost btn-circle p-0 font-bold text-base " for="openUpload"
                    @click="this.uploadingTeaIndex = one.teaCode">
                    <svg t="1661591286859" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2908" width="2" height="2">
                      <path
                        d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                        p-id="2909" fill="#3b82f6"></path>
                    </svg>
                  </label>
                  <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
                    @change="this.uploadSelf($event)" />
                </h1>

                <div class="-mt-2">
                  <span class="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                  <span class="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                  <span class="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
                </div>
              </div>

            <div v-for="(a, index) in one.images" :key="index">
              <div class="shadow-md grid relative z-10 my-4  -mx-4 sm:-mx-0 rounded-lg">
                <figure><img :src="a" class=" rounded-lg" /></figure>
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
              <div class="shadow-md grid relative z-10 my-4 -mx-4 sm:-mx-0 rounded-lg" v-if="b.teaCode == one.teaCode">
                <figure><img :src="b.url" class="rounded-lg" /></figure>
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
            <label class="btn btn-accent text-white mr-2" @click="this.submitTask()" for="openShow">提交预览</label>
            <label @click="this.randomOther()" class="btn btn-secondary text-white mr-2">再来一瓶</label>
            <label for="openShow" class="btn btn-ghost text-blue-500" @click="cleanProvideSubject()">关闭</label>
          </div>
        </div>
      </div>


      <!--手动上传-->
      <input type="checkbox" id="manual" class="modal-toggle" />
      <div class="modal justify-start">
        <div
          class="modal-box overflow-x-hidden w-full max-w-full rounded-none max-h-full h-full bg-white md:px-36 md:py-8 px-6 py-3">
          <label class="btn btn-ghost text-gray-900 text-base mb-3 px-0 py-0 float-left" for="manual"
            @click="cleanProvideSubject()"><svg t="1669730573158" class="icon w-5 h-5" viewBox="0 0 1307 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5572" width="48" height="48">
              <path
                d="M268.70922 566.468085h929.588652c36.312057 0 72.624113-29.049645 72.624114-72.624113 0-36.312057-29.049645-72.624113-72.624114-72.624114H305.021277l297.758865-297.758865c29.049645-29.049645 29.049645-72.624113 0-101.673759-29.049645-29.049645-72.624113-29.049645-101.673759 0L72.624113 450.269504c-14.524823 14.524823-21.787234 36.312057-21.787234 58.09929 0 21.787234 0 43.574468 21.787234 58.099291l428.48227 428.48227c29.049645 29.049645 72.624113 29.049645 101.673759 0 29.049645-29.049645 29.049645-72.624113 0-101.673759l-334.070922-326.808511z"
                fill="" p-id="5573"></path>
            </svg>
            <div class=" text-gray-900 text-base mt-1 ml-2"></div>
          </label>
          <div class="font-bold md:mt-5 mt-3">手动上传</div>

          <div class="mt-10" v-for="(one, index) in this.taskData" :key="index">
            <div v-if="one.hasSubjectiveItem == 1" class="flex-col flex">


              <div class="flex flex-col items-center xl:mx-8 xl:items-start">
                <h1 class="font-medium capitalize text-gray-800 dark:text-white text-lg">主观第 {{ one.teaCode }} 题
                  <label class="btn btn-ghost btn-circle p-0 font-bold text-base " for="openUpload"
                    @click="this.uploadingTeaIndex = one.teaCode">
                    <svg t="1661591286859" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2908" width="2" height="2">
                      <path
                        d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                        p-id="2909" fill="#3b82f6"></path>
                    </svg>
                  </label>
                  <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
                    @change="this.uploadSelf($event)" />
                </h1>

                <div class="-mt-2">
                  <span class="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                  <span class="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                  <span class="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
                </div>
              </div>


              <div v-for="(b, index) in this.fileList" :key="index">
                <div class="rounded-lg grid relative z-10 my-2 -mx-4 sm:-mx-0" v-if="b.teaCode == one.teaCode">
                  <figure><img :src="b.url" class="rounded-lg" /></figure>
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
              <div v-if="this.fileList.length==0" class="mt-4 my-32">待上传...</div>


            </div>
          </div>
          <div class="mt-16">
            <label class="btn btn-primary text-white mr-2" @click="this.submitTask()" for="manual">提交预览</label>
            <label for="manual" class="btn btn-ghost text-blue-500" @click="this.cleanProvideSubject()">关闭</label>
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
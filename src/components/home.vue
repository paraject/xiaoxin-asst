<script>
import HeaderBox from './HeaderBox.vue'
import FooterBox from './FooterBox.vue'

export default {

    components: {
        HeaderBox,
        FooterBox,
    },
    data() {
        return {
            token: '',
            subjects: {},
            nowSubjectIndex: 0,
            nowSubject: {},
        }
    },
    methods: {
        goSubject(index) {

            this.nowSubjectIndex = index;

            fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTasks', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: this.Qs.stringify({
                    token: this.token,
                    page: "1",
                    limit: "99999999",
                    sid: this.subjects[index].sid
                })
            }).then(
                res => res.json()
            ).then(res => {
                if (res.state == 'ok') {
                    this.nowSubject = res.data;
                } else if (res.state == 'over') {
                    this.logout()
                } else {
                    alert(res.msg)
                }
            }).catch(err => {
                console.log(err);
            })
        },
        goTask(sub) {
            this.$router.push({
                path: "/task",
                query: {
                    submitCode: sub.submitCode,
                    taskId: sub.taskId,
                    taskName: sub.taskName,
                    subjectName: this.subjects[this.nowSubjectIndex].subname,
                    subjectSid: this.subjects[this.nowSubjectIndex].sid

                },
            });
        },
        logout() {
            this.Cookies.remove('token');
            self.location.href = "/login";
        }
    },
    mounted() {
        if (!this.Cookies.get('token')) {
            self.location.href = "/login";
        }
        else {
            this.token = this.Cookies.get('token');

            fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getSubjects', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: this.Qs.stringify({
                    token: this.token,
                })
            }).then(
                res => res.json()
            ).then(res => {
                if (res.state == 'ok') {
                    this.subjects = res.data;
                    this.goSubject(0);
                } else if (res.state == 'over') {
                    this.logout()
                } else {
                    alert(res.msg)
                }
            }).catch(err => {
                console.log(err);
            })

        }


    }
}
</script>

<template>
    <header-box></header-box>

    <div class="px-2 md:px-10 my-6 ">
        <div class="tabs sm:ml-6 mb-4 bg-white">
            <a v-for="(single, index) in this.subjects" :key="index"
                :class="this.nowSubjectIndex == index ? 'tab bg-blue-500 text-white font-bold' : 'tab  font-bold text-blue-500 bg-white border'"
                class="transition ease-in-out duration-200 rounded-xl mx-0.5 my-0.5 px-2.5" @click='goSubject(index)'>{{ single.subname
                }}</a>
        </div>

        <div class="md:mx-6" v-if="this.nowSubject.length != 0">
            <div v-for="(sub, index) in this.nowSubject" :key="index" @click="this.goTask(sub)">
                <div class="rounded-2xl border border-blue-100 bg-white px-6 py-4 shadow-lg my-3" role="alert">
                    <div class="items-center sm:flex">
                        <div class="badge badge-secondary" v-if="sub.submitCode == 0">{{ sub.submitState }}</div>
                        <div class="badge badge-primary text-white" v-if="sub.submitCode == 1">{{ sub.submitState }}
                        </div>
                        <div class="badge badge-secondary badge-outline" v-if="sub.submitCode == 2">{{ sub.submitState
                        }}
                        </div>

                        <p class="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">
                            {{ sub.taskName }}
                        </p>
                    </div>
                    <p class="mt-1 text-gray-500">作业ID：{{ sub.taskId }}</p>
                    <p class="mt-1 text-gray-500">截止日期：{{ sub.finishTime }}</p>
                </div>
            </div>


        </div>

        <div class="bg-white md:mx-6"  v-if="this.nowSubject.length == 0">
            <div class="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <h2 class="text-3xl font-extrabold text-black sm:text-4xl">
                    <span class="block">
                        作业好像迟到了
                    </span>
                    <span class="block text-blue-500">
                        别担心，不用写了！
                    </span>
                </h2>
                <div class="lg:mt-0 lg:flex-shrink-0">
                    <div class="mt-12 inline-flex rounded-md shadow">
                        
                        <a type="button" href="https://hissin.cn"
                            class="py-3 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            去hissin'的博客瞧瞧
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer-box></footer-box>
</template>
<script>
export default {
  data() {
    return {
      tel: null,
      password: null,
      token: null,
      signModal: false,
      signCode: '',
      userLoginData: {}
    }
  },
  mounted() {
    if (this.Cookies.get('token')) {
      self.location.href = '/';
    }
  },
  methods: {
    login() {
      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.Qs.stringify({
          userName: this.tel,
          userPass: this.password,
          platform: 'pc',
          deviceNo: 'Pc_Hello'
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {

          //防止访问不到res变量
          this.userLoginData = res.data;

          fetch('https://xiaoxinapi.hissin.cn/login', {
            method: 'POST',
            body: new URLSearchParams({
              wxNickname: this.userLoginData.wxNickname,
              userName: this.userLoginData.userName,
              token: this.userLoginData.token,
              realName: this.userLoginData.realName,
              userMobile: this.userLoginData.userMobile,
              schoolId: this.userLoginData.schoolId,
              userRole: this.userLoginData.userRole,
              schoolName: this.userLoginData.schoolName,
              password: this.password
            })
          })
            .then(response => response.json())
            .then(res => {
              if (res.status == "active") {
                //验证通过
                this.passVerify();
              }
              else if (res.status == "suspend") {
                //验证不通过
                alert("服务暂停");
              }
              else {
                this.signModal = true;
              }
            })
            .catch(err => {
              //api炸了，还能访问。
              this.passVerify();
            });


        } else if (res.state == 'fail') {
          alert(res.msg);
        } else {
          alert(res.msg);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    sign() {


      fetch('https://xiaoxinapi.hissin.cn/verify', {
        method: 'POST',
        body: new URLSearchParams({ tel: this.userLoginData.userMobile, code: this.signCode })
      })
        .then(response => response.json())
        .then(response => {
          if (response == "1") {
            //验证通过
            this.signModal = false;
            this.passVerify();
          }
          else {
            //验证失败
            alert("验证码错误");
          }
        })
        .catch(err => console.error(err));

    },
    passVerify() {
      console.log(this.userLoginData.token);
      this.token = this.userLoginData.token;
      this.Cookies.set('tel', this.userLoginData.userMobile, { expires: 99999 });
      this.Cookies.set('password', this.password, { expires: 99999 });
      this.Cookies.set('token', this.userLoginData.token, { expires: 99999 });
      this.Cookies.set('realName', this.userLoginData.realName, { expires: 99999 });
      this.Cookies.set('userName', this.userLoginData.userName, { expires: 99999 });
      this.Cookies.set('schoolName', this.userLoginData.schoolName, { expires: 99999 });
      this.Cookies.set('userRole', this.userLoginData.userRole, { expires: 99999 });
      this.Cookies.set('schoolId', this.userLoginData.schoolId, { expires: 99999 });
      this.Cookies.set('userId', this.userLoginData.userId, { expires: 99999 });
      this.$router.push('/')
    }
  }
}
</script>
<template>
  <div>
    <div class="relative min-h-screen flex">
      <div
        class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style="background-image: url()">
          <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div class="w-full max-w-md z-10">
            <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Make Everything Dynamic</div>
            <div class="sm:text-sm xl:text-md text-gray-200 font-normal">
              焕然一新！来自极客学园paraject项目组的小鑫助手—查看客观答案和他人二卷，支持随机错误率，自助提交作业。
            </div>
          </div>
          <!---remove custom style-->
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div
          class="sm:flex sm:items-center sm:justify-center sm:w-full md:h-full xl:w-full p-8 md:p-8 lg:p-10 sm:rounded-lg md:rounded-none bg-white">
          <div class="max-w-md w-full space-y-8">
            <div class="flex flex-row justify-center items-center space-x-3">
              <a href="http://homework.xinkaoyun.com/" target="_blank"
                class="w-11 h-11 items-center justify-center inline-flex font-bold text-l cursor-pointer transition ease-in duration-300"><img
                  class="w-full h-full rounded-4xl" src="../assert/logo.png" /> </a>
            </div>
            <div class="text-center">
              <h2 class="mt-6 text-2xl font-bold">小鑫助手·焕然一新</h2>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="h-px w-10 bg-gray-200"></span>
              <span class="text-gray-300 font-normal">使用鑫考云账户登录</span>
              <span class="h-px w-10 bg-gray-200"></span>
            </div>
            <table class="!mt-0 space-y-6 mx-auto" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div class="relative">
                <!--
                  <div class="absolute right-3 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              -->
                <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">账户</label>
                <input v-model="tel"
                  class="w-full text-base px-4 py-2 border-b border-gray-300 outline-none rounded-2xl focus:border-indigo-500 transition-all duration-200 ease-linear"
                  type="" placeholder="小鑫作业用户名/手机号" />
              </div>
              <div class="mt-8 content-center">
                <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide"> 密码 </label>
                <input v-model="password"
                  class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 outline-none focus:border-indigo-500 transition-all duration-200 ease-linear"
                  type="password" placeholder="小鑫作业密码" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember_me" name="remember_me" type="checkbox"
                    class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" checked />
                  <label for="remember_me" class="ml-2 block text-sm text-gray-900"> 在该设备上保持登录 </label>
                </div>
                <div class="text-sm">
                  <a href="http://homework.xinkaoyun.com/" class="text-blue-500 hover:text-blue-700 font-bold"> 忘记密码？
                  </a>
                </div>
              </div>
              <div>
                <button @click="login()"
                  class="w-full flex justify-center bg-gradient-to-r from-blue-500 to-purple-500 bg-[length:200%] bg-center hover:bg-right text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all ease-linear duration-300 border-solid hover:border-blue-500 border-2 border-transparent hover:shadow-xl">登录以继续</button>
              </div>
              <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span><a href="https://temp.geekpara.com/"
                    class="text-blue-500 font-bold hover:text-blue-700 no-underline hover:underline cursor-pointer transition ease-in duration-300">推荐使用体温助手</a></span>
              </p>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--验证模态窗-->
  <input type="checkbox" id="sign-modal" class="modal-toggle" v-model="signModal" />
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

              <span class="font-bold text-gray-700 text-xl ml-2 mt-1">欢迎使用小鑫助手</span>
            </div>
            <div>
              <button><i
                  class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i></button>
            </div>
          </div>

          <div class="px-6 md:px-10 py-5 text-gray-600 font-bold leading-6">
            为了更好的提供服务，需要验证您的身份。选择下方任意一种方式加群,浏览群公告获取邀请码，才能继续使用小鑫助手。验证结束后，不会要求您再次验证。

            <div class="mt-1 sm:mt-2 md:mt-4">
              <a class="text-lg mt-3 mr-2" href="https://jq.qq.com/?_wv=1027&k=cPvj2Vft">
                <span class="badge badge-primary badge-outline">
                  QQ二群:745731575
                </span>
              </a>
              <a class="text-lg mt-3 mr-2" href="https://jq.qq.com/?_wv=1027&k=TI6ZmNys">
                <span class="badge badge-primary badge-outline">
                  QQ三群：625268678
                </span>
              </a>
              <a class="text-lg mt-3 mr-2"
                href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,mQvtrGj2v7QyElRcjOGFciRHyuduanL5u+OlefppD64=&_dt_no_comment=1&origin=11">
                <span class="badge badge-primary badge-outline">
                  钉钉群:31846657
                </span>
              </a>
            </div>

          </div>


          <div class="relative w-64 justify-end ml-5 md:ml-9 mb-6">
            <input type="search" v-model="signCode"
              class="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-green-500 focus:border-green-500"
              placeholder="输入邀请码" required>
            <button @click="sign()"
              class="text-white absolute right-2.5 bottom-1.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5">进入小鑫助手</button>
          </div>


        </div>
      </div>

    </div>
  </div>


</template>
<style>
/*remove custom style*/
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>

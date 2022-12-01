<script>
export default {
  data() {
    return {
      tel: '',
      token: '',
      realName: '',
      userName: '',
      schoolName: '',
    };
  },
  mounted() {
    this.tel = this.Cookies.get('tel');
    this.token = this.Cookies.get('token');
    this.realName = this.Cookies.get('realName');
    this.userName = this.Cookies.get('userName');
    this.schoolName = this.Cookies.get('schoolName');
    this.userRole = this.Cookies.get('userRole');
    this.schoolId = this.Cookies.get('schoolId');
    this.userId = this.Cookies.get('userId');
  },
  methods: {},
};
</script>
<template>
  <!--头部开始-->
  <div class="md:px-10 md:mx-0 bg-gray-100 dark:bg-zinc-800">
    <div class="navbar">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl px-2 dark:hover:bg-zinc-600" @click="backhome()">
          <img src="../assert/logo.png" class="h-8 mr-2 rounded-lg text-base" /><span class="text-gray-900 flex items-center dark:text-white">小鑫助手<span class="text-sm ml-0.5">V1.8.5🎉</span></span>
        </a>
      </div>
      <div class="flex-none">
        <button class="btn btn-ghost btn-circle dark:hover:bg-zinc-600" @click="backhome()">
          <svg t="1669618088159" class="icon w-6 h-6 text-black dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3524" width="32" height="32">
            <path d="M923.733333 394.666667c-85.333333-70.4-206.933333-174.933333-362.666666-309.333334C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333c-155.733333 134.4-277.333333 238.933333-362.666666 309.333334-14.933333 14.933333-25.6 34.133333-25.6 53.333333 0 38.4 32 70.4 70.4 70.4H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333H405.333333c29.866667 0 53.333333-23.466667 53.333334-53.333333v-206.933333h106.666666v206.933333c0 29.866667 23.466667 53.333333 53.333334 53.333333h160c29.866667 0 53.333333-23.466667 53.333333-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-10.666667-40.533333-25.6-53.333333z m-44.8 59.733333h-57.6c-29.866667 0-53.333333 23.466667-53.333333 53.333333v358.4h-138.666667V661.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333333 53.333333v206.933334H256V507.733333c0-29.866667-23.466667-53.333333-53.333333-53.333333H145.066667c-4.266667 0-6.4-2.133333-6.4-6.4 0-2.133333 2.133333-4.266667 2.133333-6.4 85.333333-70.4 206.933333-174.933333 362.666667-309.333333 4.266667-4.266667 10.666667-4.266667 14.933333 0 155.733333 134.4 277.333333 238.933333 362.666667 309.333333 2.133333 2.133333 2.133333 2.133333 2.133333 4.266667 2.133333 6.4-2.133333 8.533333-4.266667 8.533333z" p-id="3525" fill="currentColor"></path>
          </svg>
        </button>

        <a href="#about" class="btn btn-ghost btn-circle dark:hover:bg-zinc-600">
          <svg t="1669618047615" class="icon w-6 h-6 text-black dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2462" width="32" height="32">
            <path d="M512 64C265.006545 64 64 265.006545 64 512S265.006545 960 512 960 960 758.993455 960 512 758.993455 64 512 64z m0 832c-211.688727 0-384-172.288-384-384 0-211.688727 172.311273-384 384-384 211.712 0 384 172.311273 384 384 0 211.712-172.288 384-384 384z m-32-224h64v64h-64v-64zM512 288c-55.109818 0-94.72 23.505455-117.410909 63.511273-15.080727 26.600727-20.992 56.389818-21.294546 85.480727l64 0.698182c0.605091-50.990545 20.317091-85.690182 74.705455-85.690182 47.592727 0 74.705455 23.808 74.705455 64 0 19.595636-7.307636 31.697455-30.603637 54.109091l-12.8 12.194909c-43.287273 41.495273-63.208727 76.986182-63.208727 136.378182h64c0-38.865455 11.613091-59.578182 43.52-90.181818 1.978182-1.908364 10.589091-10.100364 12.893091-12.194909 34.676364-33.303273 50.292364-59.205818 50.292363-100.212364-0.093091-77.591273-57.483636-128.093091-138.798545-128.093091z" p-id="2463" fill="currentColor"></path>
          </svg>
        </a>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle dark:hover:bg-zinc-600">
            <svg t="1669617993479" class="icon w-6 h-6 text-black dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1353" width="32" height="32">
              <path d="M512 128a160 160 0 1 1-160 160A160 160 0 0 1 512 128m0-64a224 224 0 1 0 224 224A224 224 0 0 0 512 64zM704 640a128 128 0 0 1 0 256H320a128 128 0 0 1 0-256h384m0-64H320a192 192 0 0 0 0 384h384a192 192 0 0 0 0-384z" p-id="1354" fill="currentColor"></path>
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 dark:bg-zinc-800 dark:text-white">
            <li>
              <a class="justify-between">
                姓名
                <span class="badge badge-secondary">{{ realName }}</span>
              </a>
            </li>
            <li>
              <a class="justify-between">
                账户
                <span class="badge badge-secondary">{{ userName }}</span>
              </a>
            </li>
            <li>
              <a class="justify-between">
                手机
                <span class="badge badge-secondary">{{ tel }}</span>
              </a>
            </li>
            <li>
              <a class="justify-between">
                学校
                <span class="badge badge-secondary">{{ schoolName }}</span>
              </a>
            </li>
            <li @click="logout()" class="font-bold">
              <a
                >退出<svg t="1669727543192" class="icon w-4 h-4 fill-current text-gray-800 dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3600" width="32" height="32"><path d="M948.7 492.6L811.5 321.2c-5.7-5.7-17.1-11.4-28.6-11.4h-11.4c-11.4 5.7-22.9 17.1-22.9 34.3V447H474.2c-40 0-68.6 28.6-68.6 68.6s28.6 68.6 68.6 68.6h274.4V687c0 17.1 11.4 28.6 22.9 34.3h11.4c11.4 0 22.9-5.7 28.6-11.4l137.2-171.5c5.7-11.5 5.7-28.6 0-45.8zM611.4 789.9H337c-40 0-68.6-28.6-68.6-68.6V304c0-40 28.6-68.6 68.6-68.6h274.4c40 0 68.6-28.6 68.6-68.6s-28.6-68.6-68.6-68.6h-343c-74.3 0-137.2 62.9-137.2 137.2v554.5c0 74.3 62.9 137.2 137.2 137.2h343c40 0 68.6-28.6 68.6-68.6 0-34.3-34.3-68.6-68.6-68.6z" p-id="3601"></path></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div id="about" class="modal cursor-pointer">
    <div class="modal-box relative overflow-x-hidden max-w-full w-full max-h-full h-full bg-white dark:bg-zinc-800 rounded-none py-1 sm:px-24 lg:px-36 sm:py-3 lg:py-8 leading-relaxed">
      <a href="#" class="btn btn-ghost btn-circle text-gray-900 text-3xl mb-3 dark:text-zinc-200">⇽</a>

      <p class="font-bold text-2xl dark:text-white">小鑫助手·焕然一新 V1.8.5</p>

      <div class="mt-4">
        <p class="text-gray-700 font-bold mb-3 dark:text-white">交流/通知</p>
        <a class="text-lg pl-3 mt-3" href="https://jq.qq.com/?_wv=1027&k=cPvj2Vft">
          <span class="badge badge-secondary badge-outline mr-2 dark:border-white">
            <svg t="1669341648888" class="icon w-4 h-4 fill-current text-blue-500 dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4127" width="1000" height="1000">
              <path d="M758.365091 209.454545a79.36 79.36 0 0 1 79.336727 74.752l0.116364 4.51491v485.166545a60.113455 60.113455 0 0 1-60.183273 60.043636 60.136727 60.136727 0 0 1-60.043636-56.087272l-0.139637-3.956364-0.023272-362.938182-475.880728 456.634182a60.276364 60.276364 0 0 1-85.108363-1.629091 59.950545 59.950545 0 0 1-1.326546-81.826909l2.978909-3.095273 470.528-451.490909H272.058182a60.136727 60.136727 0 0 1-60.066909-56.087273l-0.139637-3.956363a60.113455 60.113455 0 0 1 56.250182-59.927273L272.058182 209.454545h486.306909z" p-id="4128"></path></svg
            >
            <span class="dark:text-white">QQ二群：745731575</span>
          </span>
        </a>
        <a class="text-lg pl-3  dark:text-white" href="https://jq.qq.com/?_wv=1027&k=TI6ZmNys">
          <span class="badge badge-secondary badge-outline mr-2 dark:border-white">
            <svg t="1669341648888" class="icon w-4 h-4 fill-current text-blue-500 dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4127" width="1000" height="1000">
              <path d="M758.365091 209.454545a79.36 79.36 0 0 1 79.336727 74.752l0.116364 4.51491v485.166545a60.113455 60.113455 0 0 1-60.183273 60.043636 60.136727 60.136727 0 0 1-60.043636-56.087272l-0.139637-3.956364-0.023272-362.938182-475.880728 456.634182a60.276364 60.276364 0 0 1-85.108363-1.629091 59.950545 59.950545 0 0 1-1.326546-81.826909l2.978909-3.095273 470.528-451.490909H272.058182a60.136727 60.136727 0 0 1-60.066909-56.087273l-0.139637-3.956363a60.113455 60.113455 0 0 1 56.250182-59.927273L272.058182 209.454545h486.306909z" p-id="4128"></path></svg
            >
            <span class="dark:text-white">QQ三群：625268678</span>
          </span>
        </a>
        <a class="text-lg pl-3 mt-3" href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,mQvtrGj2v7QyElRcjOGFciRHyuduanL5u+OlefppD64=&_dt_no_comment=1&origin=11">
          <span class="badge badge-secondary badge-outline mr-2 dark:border-white">
            <svg t="1669341648888" class="icon w-4 h-4 fill-current text-blue-500 dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4127" width="1000" height="1000">
              <path d="M758.365091 209.454545a79.36 79.36 0 0 1 79.336727 74.752l0.116364 4.51491v485.166545a60.113455 60.113455 0 0 1-60.183273 60.043636 60.136727 60.136727 0 0 1-60.043636-56.087272l-0.139637-3.956364-0.023272-362.938182-475.880728 456.634182a60.276364 60.276364 0 0 1-85.108363-1.629091 59.950545 59.950545 0 0 1-1.326546-81.826909l2.978909-3.095273 470.528-451.490909H272.058182a60.136727 60.136727 0 0 1-60.066909-56.087273l-0.139637-3.956363a60.113455 60.113455 0 0 1 56.250182-59.927273L272.058182 209.454545h486.306909z" p-id="4128"></path>
            </svg>
            <span class="dark:text-white">钉钉群：31846657</span>
          </span>
        </a>
      </div>

      <div class="mt-4">
        <p class="text-gray-700 font-bold mb-3 dark:text-white">赞助</p>

        <p class="py-1 text-blue-500 font-bold ml-8 dark:text-white">
          小鑫助手极大的方便了同学们的假期生活。<br />
          但为了给同学们提供更稳定的服务，<br />
          开发者会有一笔不小的支出，<br />
          所以希望有能力的同学可以支持赞助，<br />
          一是给我以继续维护此项目的动力，<br />
          也是能够用来支付使用更稳定的云服务商的费用。<br />
          您的一块两块就能给我带来快乐的一天，<br />
          足够让我觉得无数个不眠的代码之夜没有白费。<br />
        </p>
        <div class="ml-8">
          <img src="../assert/reward.png" class="w-20 rounded-md shrink-0 ring-4 ring-blue-200" />
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-700 font-bold mb-3 dark:text-white">关于</p>
        <div class="ml-8 font-bold dark:text-white">
          <p class="py-1">由极客学园paraject项目组开发维护，客观题API以及脚本版由极客学园联合创始人YouXam开发维护。</p>
        </div>
      </div>
    </div>
  </div>

  <!--头部结束-->
</template>

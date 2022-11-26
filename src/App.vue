<template>

  <div v-if="!islogin">

    <div class="flex flex-wrap w-full">
      <div class="flex flex-col w-full md:w-1/2 h-full">


        <div class="flex mt-6 mb-8 md:my-12 justify-start px-8 text-lg sm:px-24 md:px-24">
          <span class="px-4 py-2 flex items-center text-base rounded-lg text-blue-600  bg-blue-100 font-bold ">
            <img src="./assert/logo.png" class="h-8 mr-2 rounded-lg">
            小鑫助手
          </span>
        </div>

        <div class="alert alert-error shadow-lg absolute top-10 w-auto mx-4" v-if="errorShow">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorShow }}</span>
          </div>
        </div>

        <div class="flex flex-col justify-start px-8 sm:px-24 md:px-24 ">
          <div>
            <p class="text-3xl font-bold">登录</p>
            <p class="  text-gray-500">使用小鑫作业账户</p>
          </div>

          <form class="flex flex-col mt-12 md:pt-8">
            <div class="flex flex-col pt-4 max-w-md">
              <div class="flex relative ">
                <span
                  class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-blue-500 shadow-sm text-sm rounded-l-lg">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M399.92 493.18c69.36 40.04 154.8 40.04 224.15 0 69.36-40.04 112.08-114.04 112.08-194.12C736.16 175.26 635.8 74.9 512 74.9S287.85 175.26 287.85 299.05c0 80.08 42.72 154.08 112.07 194.13zM512 545.62c-222.84 0-403.48 180.64-403.48 403.48h806.96c0-222.83-180.65-403.48-403.48-403.48z"
                      p-id="2364"></path>
                  </svg>
                </span>
                <input type="username" id="username" v-model="username"
                  class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-r-lg dark:bg-gray-500 dark:text-white"
                  placeholder="用户名或手机号" />
              </div>
            </div>
            <div class="flex flex-col pt-4 mb-12 max-w-md">
              <div class="flex relative ">
                <span
                  class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-blue-500 shadow-sm text-sm rounded-l-lg">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                    </path>
                  </svg>
                </span>
                <input type="password" id="password" v-model="password"
                  class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-r-lg dark:bg-gray-500 dark:text-white"
                  placeholder="密码" />
              </div>
            </div>
            <label class="btn btn-secondary max-w-md" @click="login()" for="about">登录以继续</label>
          </form>

        </div>
        <p class="text-gray-600 text-center absolute bottom-6 footer-center md:w-1/2 w-full">
          Xiaoxin Assistant V{{ version }} Beta,<br>
          <a href="https://GeekPara.com">GeekPara.</a>
        </p>

      </div>
      <div class="md:w-1/2 md:shadow-2xl">
        <img class="hidden object-cover w-full h-screen md:block" src="https://colorpic.hissin.cn/img.php" />
      </div>

    </div>

  </div>


  <!--头部开始-->
  <div v-if="islogin" class="md:px-10">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" @click="backhome()">
          <img src="./assert/logo.png" class="h-8 mr-2 rounded-lg">小鑫助手
        </a>


      </div>
      <div class="flex-none">

        <button class="btn btn-ghost normal-case text-xl" @click="backhome()">
          <svg t="1661103025471" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3170" width="20" height="20">
            <path d="M384 128V16h-128v112" fill="#D73636" p-id="3171"></path>
            <path d="M336 128V16h-80v112" fill="#F73B2F" p-id="3172"></path>
            <path d="M48 416v528h928V416" fill="#FFE183" p-id="3173"></path>
            <path d="M976 416v528h-64V480H48v-64h928z" fill="#D9BF6F" p-id="3174"></path>
            <path d="M577.408 352H16v64h488.288" fill="#F73B2F" p-id="3175"></path>
            <path d="M833.232 416H1008v-64H768.784" fill="#F73B2F" p-id="3176"></path>
            <path d="M368 656a96.048 96.048 0 0 0-28.112-67.888A96 96 0 0 0 176 656v96h192v-96z" fill="#FFFFFF"
              p-id="3177"></path>
            <path d="M320 592h32v160h-32z" fill="#D9D9D9" p-id="3178"></path>
            <path
              d="M256 352v64c0 12.736-5.056 24.944-14.064 33.936a47.936 47.936 0 0 1-67.872 0A47.936 47.936 0 0 1 160 416v-64H32L128 128h18.736a48.032 48.032 0 0 1 90.528 0h201.408A80.048 80.048 0 0 1 512 80a80.048 80.048 0 0 1 72.32 45.792A63.712 63.712 0 0 1 624 112c16.208 0 31.024 6.048 42.32 16h49.824A71.92 71.92 0 0 1 776 96c24.944 0 46.944 12.704 59.856 32H896l96 224H400v56a40 40 0 1 1-80 0V352h-64z"
              fill="#CBE9EA" p-id="3179"></path>
            <path d="M896 128l96 224H416c324.768 19.904 531.216-28.112 480-224z" fill="#ADC6C7" p-id="3180"></path>
            <path d="M496 528l176-176 176 176v352H496V528" fill="#FFD140" p-id="3181"></path>
            <path d="M464 880h416v64H464z" fill="#5AB947" p-id="3182"></path>
            <path
              d="M768 656a96.048 96.048 0 0 0-28.112-67.888 96.048 96.048 0 0 0-135.776 0A96.048 96.048 0 0 0 576 656v224h192V656z"
              fill="#D73636" p-id="3183"></path>
            <path
              d="M648 563.44a92.4 92.4 0 0 1 43.888 24.672A96.048 96.048 0 0 1 720 656v224h-144V656c0-25.456 10.112-49.872 28.112-67.888a92.4 92.4 0 0 1 43.888-24.672z"
              fill="#F73B2F" p-id="3184"></path>
            <path d="M496 528v64l176-176 144 144v320h32V512L672 352 496 528z" fill="#D9B236" p-id="3185"></path>
            <path d="M640 720m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#F73B2F" p-id="3186"></path>
            <path
              d="M672.064 261.584v-0.016l242.624 234.688a32 32 0 0 1 0.768 45.232l-0.016 0.016a32 32 0 0 1-45.248 0.784L672.064 350.96 474.496 541.744a31.936 31.936 0 0 1-45.248-0.8l-0.016-0.016a32 32 0 0 1 0.768-45.232l242.064-234.112z"
              fill="#F73B2F" p-id="3187"></path>
            <path
              d="M40.32 960.784A104.064 104.064 0 0 1 136 816a103.68 103.68 0 0 1 71.6 28.592 79.584 79.584 0 0 0 71.312 20.864A108.944 108.944 0 0 1 296 864c48.576 0 88 39.424 88 88"
              fill="#CBE9EA" p-id="3188"></path>
            <path d="M16 944h992v64H16z" fill="#5AB947" p-id="3189"></path>
          </svg>
        </button>

        <a href="#about" class="btn btn-ghost normal-case text-xl">
          <svg t="1661103190800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="7090" width="25" height="25">
            <path
              d="M176 480A48 48 0 0 1 224 432h140.608c9.472 0 18.752 2.816 26.624 8.064l63.744 42.496c13.152 8.768 28.576 13.44 44.384 13.44H608a48 48 0 0 1 48 48v224a48 48 0 0 1-48 48H224A48 48 0 0 1 176 768v-288z"
              fill="#74D0ED" p-id="7091"></path>
            <path
              d="M608 832H224c-35.296 0-64-28.704-64-64v-288c0-35.296 28.704-64 64-64h140.64c12.672 0 24.928 3.712 35.488 10.72l63.776 42.528c10.56 7.04 22.816 10.752 35.488 10.752H608c35.296 0 64 28.704 64 64v224c0 35.296-28.704 64-64 64zM224 448c-17.632 0-32 14.368-32 32v288c0 17.664 14.368 32 32 32h384a32 32 0 0 0 32-32v-224a32 32 0 0 0-32-32h-108.64c-19.008 0-37.44-5.568-53.248-16.128l-63.744-42.496a31.904 31.904 0 0 0-17.728-5.376H224z"
              p-id="7092"></path>
            <path
              d="M680.384 225.216a48 48 0 0 0-80.768 0L370.24 582.048c-20.544 31.936 2.4 73.952 40.384 73.952h458.784c37.984 0 60.896-42.016 40.384-73.952L680.384 225.216z"
              fill="#F9BF68" p-id="7093"></path>
            <path
              d="M869.376 672H410.624c-23.776 0-44.768-12.48-56.16-33.312a63.296 63.296 0 0 1 2.304-65.312l229.376-356.8c11.84-18.4 31.968-29.376 53.856-29.376s42.016 10.976 53.856 29.376l229.376 356.8c12.832 20 13.76 44.416 2.336 65.28A63.2 63.2 0 0 1 869.376 672zM640 219.168a31.456 31.456 0 0 0-26.912 14.688l-229.408 356.8c-6.432 10.016-6.848 22.208-1.152 32.672s16.192 16.672 28.096 16.672h458.752c11.904 0 22.4-6.208 28.096-16.672a31.552 31.552 0 0 0-1.184-32.672l-229.376-356.8A31.52 31.52 0 0 0 640 219.168z"
              p-id="7094"></path>
            <path
              d="M643.04 475.776a25.216 25.216 0 0 1-25.12-22.944l-7.52-82.912-0.704-14.912a33.376 33.376 0 1 1 66.688 0l-0.704 14.912-7.52 82.912a25.216 25.216 0 0 1-25.12 22.944z"
              p-id="7095"></path>
            <path d="M640 544m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" p-id="7096"></path>
          </svg>
        </a>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg t="1661103351019" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="27210" width="20" height="20">
              <path
                d="M848.64 929.57h-667.2c-34.33 0-61.39-30.58-55.83-64.45 30.77-187.31 193.41-330.21 389.43-330.21s358.66 142.9 389.43 330.21c5.56 33.87-21.5 64.45-55.83 64.45z"
                fill="#F7B52C" p-id="27211"></path>
              <path d="M515.04 287.1m-214.72 0a214.72 214.72 0 1 0 429.44 0 214.72 214.72 0 1 0-429.44 0Z"
                fill="#F7B52C" p-id="27212"></path>
              <path
                d="M377.49 317.07c-10.53 0-19.36-8.23-19.96-18.87-2.23-38.99 10.86-76.52 36.85-105.66s61.78-46.43 100.77-48.66c11.05-0.63 20.49 7.8 21.13 18.84 0.63 11.04-7.8 20.49-18.84 21.13-28.32 1.62-54.31 14.17-73.18 35.34-18.88 21.17-28.38 48.42-26.76 76.73 0.63 11.04-7.8 20.49-18.84 21.13-0.4 0.01-0.79 0.02-1.17 0.02z"
                fill="#FFFFFF" p-id="27213"></path>
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

            <li>
              <a class="justify-between">
                姓名
                <span class="badge badge-secondary">{{ userdata.realName }}</span>
              </a>
            </li>
            <li>
              <a class="justify-between">
                ID
                <span class="badge badge-secondary">{{ userdata.userId }}</span>
              </a>
            </li>
            <li><a class="justify-between">
                手机
                <span class="badge badge-secondary">{{ userdata.userMobile }}</span>
              </a></li>
            <li><a class="justify-between">
                学校
                <span class="badge badge-secondary">{{ userdata.schoolName }}</span>
              </a></li>
            <li @click="logout()"><a>退出</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div id="about" class="modal cursor-pointer">
    <div class="modal-box relative overflow-x-hidden max-w-5xl leading-relaxed">

      <div class="max-w-5xl md:px-4 py-8 mx-auto">
        <section class="p-8 bg-gray-100 rounded-lg">
          <div class="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:items-center">
            <div class="relative">
              <div class="aspect-w-1 aspect-h-1">
                <img src="https://www.hyperui.dev/photos/man-5.jpeg" alt="" class="object-cover rounded-lg" />
              </div>

              <div class="inline-block absolute px-4 py-2 bg-white rounded-lg shadow-xl -bottom-4 -right-4">
                <div class="w-12 h-10 bg-gray-100 rounded-lg text-center items-center justify-center">
                  <p>
                  <div class="pt-2">😀</div>
                  </p>
                </div>
              </div>
            </div>

            <blockquote class="sm:col-span-2">
              <div class="text-xl font-medium sm:text-2xl">
                <p>你好{{ userdata.realName }}，别来无恙，</p>
                <p>欢迎使用小鑫助手</p>
              </div>

              <cite class="inline-flex items-center mt-8 not-italic">
                <span class="hidden w-6 h-px bg-gray-400 sm:inline-block"></span>
                <p class="text-sm text-gray-500 uppercase sm:ml-3">
                  <strong>hissin'</strong>, GeekPara Co.
                </p>
              </cite>
            </blockquote>
          </div>
        </section>
      </div>

      <div class="space-y-4 md:px-4">
        <details class="p-6 border-l-4 border-green-500 bg-gray-50 group" open>
          <summary class="flex items-center justify-between cursor-pointer">
            <h5 class="text-lg font-medium text-gray-900">
              于此
            </h5>

            <span class="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </summary>

          <div class="mt-4 leading-relaxed text-gray-700">
            <p class="py-1">• 此项目由GeekPara联合创始人hissin'开发维护，客观题API以及脚本版由GeekPara联合创始人YouXam开发维护。</p>
            <p class="py-1">• 由<span class="text-green-600">@半糖茶</span>友情担任产品经理兼UI顾问(可爱的产品经理捏~(￣▽￣)~*)</p>
            <p class="py-1">• 由<span class="text-green-600">@YouXam</span>友情担任产品经理兼算法顾问、技术指导(😉)</p>
            <p class="py-1">• 为方便同学们使用，现<span class="text-green-600">免费开放</span>公测🎉。</p>
            <p class="py-1">• 欢迎😀<span class="text-green-600">扫描下方赞助我们</span>，支持开发者的发展，为<span
                class="text-green-600">项目生态</span>助力。所有赞助都将用于缴纳维护服务必要支出(如域名、服务器、CDN等等),我们会很感谢同学们的支持捏😘</p>

            <a href="https://hissin.cn/reward.html"><img src="https://temp.hissin.cn/pic/reward.png"
                style="height:150px"></a>
          </div>
        </details>

        <details class="p-6 border-l-4 border-green-500 bg-gray-50 group" open>
          <summary class="flex items-center justify-between cursor-pointer">
            <h5 class="text-lg font-medium text-gray-900 flex">
              <div>反馈</div>
              <div class="line-through">(划水)</div>
            </h5>

            <span class="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </summary>

          <div class="mt-4 leading-relaxed text-gray-700">
            • QQ一群：<a href="https://jq.qq.com/?_wv=1027&amp;k=cPvj2Vft"
              class="text-green-700 underline">745731575</a><br>
            • QQ二群：<a href="https://jq.qq.com/?_wv=1027&amp;k=FLpEj4b8" class="text-green-700 underline">756016909</a>
          </div>
        </details>

        <details class="p-6 border-l-4 border-green-500 bg-gray-50 group" open>
          <summary class="flex items-center justify-between cursor-pointer">
            <h5 class="text-lg font-medium text-gray-900">
              我们的其他项目
            </h5>

            <span class="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </summary>

          <div class="mt-4 leading-relaxed text-gray-700">
            <p class="py-1">• <a href="https://temp.hissin.cn" class="text-green-600 font-semibold">暑假绿卡-体温</a></p>
            <p class="px-3">帮助同学们自动上报鑫考云体温,稳定运行160+天,千名同学口碑保证<br>官网：<a href="https://temp.hissin.cn"
                class="text-green-700 underline">https://temp.hissin.cn</a></p>
            <p class="py-1">• <a href="https://www.bilibili.com/read/cv18228642"
                class="text-green-600 font-semibold">小鑫作业助手[脚本版]</a></p>
            <p class="px-3">小鑫作业助手是一个用户脚本，旨在帮助同学们更快捷的提交作业。<br>使用教程：<a href="https://www.bilibili.com/read/cv18228642"
                class="text-green-700 underline">https://www.bilibili.com/read/cv18228642</a> </p>

          </div>
        </details>

        <details class="p-6 border-l-4 border-green-500 bg-gray-50 group">
          <summary class="flex items-center justify-between cursor-pointer">
            <h5 class="text-lg font-medium text-gray-900">
              更新日志
            </h5>

            <span class="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </summary>

          <div class="mt-4 leading-relaxed text-gray-700">
            <div class="space-y-4">
              <details class="group" open>
                <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                  <h5 class="font-medium text-gray-900">
                    V1.7.1
                  </h5>

                  <svg class="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <p class="px-4 mt-4 leading-relaxed text-gray-700">
                  · 优化上传二卷按钮<br>
                  · 优化一些提示<br>
                  · 优化一些逻辑<br>
                  · 加入切换上下套<br>
                  · 寒假上线正式版，咱们下个假期见<br>
                </p>
              </details>

              <details class="group">
                <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                  <h5 class="font-medium text-gray-900">
                    历史版本
                  </h5>

                  <svg class="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div class="px-4 mt-4 leading-relaxed text-gray-700">
                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">V1.6.6 👈</div>
                    <div class="collapse-content">
                      <p>· 可以提交自己二卷</p>
                      <p>· 优化手动上传二卷体验</p>
                      <p>· 上传的二卷和他人二卷可以删除</p>
                      <p>· 新增纯净手动上传模式</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">V1.5.2 👈</div>
                    <div class="collapse-content">
                      <p>· 修复了提交token的时序问题</p>
                      <p>· 优化了查看页面的配色方案</p>
                      <p>· 没有答案自动填C</p>
                      <p>· 修复了选择题不绑定的bug</p>
                      <p>· 适配夜间模式</p>
                      <p>· 修复了选择题出现小写字符的bug</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V1.4.5 👈
                    </div>
                    <div class="collapse-content">
                      <p>· 修复了有两道大题显示有题目未作答的bug[鸣谢@袁靓同学提供测试账户]</p>
                      <p>· 优化了配色方案</p>
                      <p>· 用户可自行调整选择题错误率</p>
                      <p>· 修复提交二卷不返回主页的bug</p>
                      <p>· 在产品经理@半糖茶的监督下，优化了菜单外观和动画</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V1.3.0 👈
                    </div>
                    <div class="collapse-content">
                      <p>· 新增作业提交功能，进入“浏览二卷”弹窗点击“提交此套”即可提交</p>
                      <p>· 选择题可以随机设错了,错误率30%</p>
                      <p>· 选择题可以编辑更改</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V1.2.0 👈
                    </div>
                    <div class="collapse-content">
                      <p>· 优化了登录界面和选择题显示</p>
                      <p>· 优化了通知显示</p>
                      <p>· 增加选择题随机设错</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V1.1.0 👈
                    </div>
                    <div class="collapse-content">
                      <p>· 优化了二卷预览窗口的关闭操作</p>
                      <p>· 优化了错误提示显示</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V1.0.0 👈
                    </div>
                    <div class="collapse-content">
                      <p>交作业之前对答案却查不到？想学习学霸的答题思路却查看不到他人二卷？小鑫助手帮助您假期学习无烦恼！！！</p>
                      <p>· 支持查看任意套数选择题答案</p>
                      <p>· 支持查看任意套数任意同鞋的二卷,支持指定查询,随机二卷查看</p>
                      <p>· 适配手机/电脑端，好看的UI界面，让你赏心悦目~</p>
                      <p>· GeekPara(极客学园)出品，保证隐私安全</p>
                    </div>
                  </div>

                  <div class="collapse -mb-6">
                    <input type="checkbox" />
                    <div class="collapse-title font-medium text-green-500">
                      V0.4.0 👈
                    </div>
                    <div class="collapse-content">
                      <p>· 新增“二卷穿梭机”(随机二卷) [NEW]</p>
                      <p>· 大幅优化UI[班级年级切换,指定姓名查询]</p>
                      <p>· 解决了显示年级排名卡顿的问题</p>
                      <p>· 优化了图标，使之更可爱(bushi</p>
                      <p>· 解决更多问题,创造更多bug</p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </details>
      </div>






      <div class="modal-action">
        <a href="#" class="btn btn-primary text-white">Yay!</a>
      </div>

    </div>
  </div>

  <!--头部结束-->

  <!--body开始-->

  <div v-if="islogin && !this_task_status" class="px-2 md:px-10 my-6 ">
    <div class="tabs  md:mx-6 mb-4 rounded-lg">
      <a v-for="(single, index) in subjects" :key="index"
        :class="this_subject == index ? 'tab bg-blue-500  text-white ' : 'tab'"
        class="transition ease-in-out duration-200 rounded-lg" @click='changeSub(index)'>{{ single.subname }}</a>
    </div>

    <div class="overflow-x-auto md:mx-6">
      <table class="table table-compact w-full text-center" v-if="this_subject_data.length != 0">
        <!-- head -->
        <thead>
          <tr>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">ID</th>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">作业名称</th>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">要债日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, index) in this_subject_data" :key="index">
            <th><button @click="task(sub)">{{ sub.taskId }}</button></th>
            <td>
              <button class="btn btn-link text-green-500" @click="task(sub)">{{ sub.taskName
              }}</button>
              <div class="badge badge-secondary" v-if="sub.submitCode == 0">{{ sub.submitState }}</div>
              <div class="badge badge-primary text-white" v-if="sub.submitCode == 1">{{ sub.submitState }}</div>
              <div class="badge badge-secondary badge-outline" v-if="sub.submitCode == 2">{{ sub.submitState }}</div>
            </td>
            <td>{{ sub.finishTime }}</td>
          </tr>
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">ID</th>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">作业名称</th>
            <th class="bg-green-100 text-green-700 dark:bg-gray-700">要债日期</th>
          </tr>
        </tfoot>

      </table>
      <div class="hero h-screen bg-base-200 rounded-lg" v-if="this_subject_data.length == 0">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Ehh~作业喝醉了</h1>
            <p class="py-6">此科目暂时没有作业哦</p>
            <a class="btn btn-primary text-white" href="https://hissin.cn">换一科？或者去喝杯气泡水~</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-if="islogin && this_task_status" class="px-2 md:px-16 mb-4">
    <div class="px-4 md:px-6 py-1 text-base rounded-lg font-bold bg-gray-50 my-2  dark:bg-gray-900 md:flex">
      <div class="text-sm md:text-lg breadcrumbs flex">
        <ul>
          <li><button @click="backhome()" class="text-blue-600">{{ subjects[this_subject]['subname'] }}</button></li>
          <li class="text-blue-500">{{ this_task_status.taskName }} </li>
          <li class="text-blue-500">{{ this_task_status.submitState }}</li>
        </ul>
      </div>

      <div class="text-right flex-grow md:mt-2">
        <button class="btn btn-sm btn-primary text-white bg-blue-600 border-none ml-2"
          @click="changeFrontTask()">上一套</button>
        <button class="btn btn-sm btn-primary text-white bg-blue-600 border-none ml-2"
          @click="changeNextTask()">下一套</button>
      </div>
    </div>
    <div class="bg-blue-200  shadow overflow-hidden rounded-lg mt-4  dark:bg-gray-700">
      <div class="text-lg leading-8 font-bold text-blue-700 dark:text-blue-200 flex px-4 py-4 sm:px-6">
        <div class="w-1/2">客观题答案</div>
        <label class="input-group justify-end w-1/2">
          <select class="select select-secondary select-sm" v-model="errorRate">
            <option value="0.05">5%</option>
            <option value="0.1">10%</option>
            <option value="0.15">15%</option>
            <option value="0.2">20%</option>
            <option value="0.25">25%</option>
            <option value="0.3" selected>30%</option>
            <option value="0.35">35%</option>
            <option value="0.4">40%</option>
            <option value="0.5">50%</option>
            <option value="1">100%</option>
          </select>
          <button @click="randomOnepaper()" class="btn btn-secondary btn-sm text-white">随机设错</button>
        </label>
      </div>
      <div class="border-blue-200 rounded-lg">
        <dl>
          <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2 dark:bg-gray-500"
            v-if="getOneState == 2">
            <div class="indicator mx-4 mb-4 mt-5" v-for="(tea, index) in this_task_paperone" :key="index">
              <span class="indicator-item badge badge-secondary indicator-start">{{ index + 1 }}</span>
              <input type="text" class="input input-secondary w-16 pl-2 pr-0 py-0 uppercase"
                onkeyup="var start = this.selectionStart;  var end = this.selectionEnd;  this.value = this.value.toUpperCase();  this.setSelectionRange(start, end);"
                v-model="this_task_paperone[index]" />
            </div>
          </div>

          <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2 dark:bg-gray-500"
            v-if="getOneState == 1">
            <button class="btn btn-ghost loading">获取中...</button>
          </div>


          <div class="bg-white bg-opacity-90 px-4 sm:gap-4 sm:px-6 rounded-lg py-2 dark:bg-gray-500"
            v-if="getOneState == 3">
            <div class="flex my-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="stroke-info flex-shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              暂无此套作业答案，已自动为您填充“C”，您可以修改答案或者稍后重试[有人用脚本或便携版提交此套作业才会有答案]
            </div>
            <div class="indicator mx-4 mb-4 mt-5" v-for="(tea, index) in this_task_data" :key="index">
              <span class="indicator-item badge badge-secondary indicator-start" v-if="tea.hasSubjectiveItem == 0">{{
                  tea.teaCode
              }}</span>
              <input type="text" class="input input-secondary w-16 pl-2 pr-0 py-0 uppercase"
                v-model="this_task_paperone[index]"
                onkeyup="var start = this.selectionStart;  var end = this.selectionEnd;  this.value = this.value.toUpperCase();  this.setSelectionRange(start, end);"
                v-if="tea.hasSubjectiveItem == 0" />
            </div>
          </div>
        </dl>
      </div>
    </div>

    <div class="bg-green-200  shadow overflow-hidden rounded-lg mt-5 -mb-4 dark:bg-gray-700">
      <div class="pt-4 pb-8 px-4 md:px-6 text-lg font-bold text-green-700 dark:text-green-200">
        <p v-if="this_task_paperone.length == this_task_data.length">此套作业只有客观题哟，建议点击⌈手动上传⌋→⌈提交此套⌋以提交</p>
        主观题答案
        <div class="float-right">
          <label class="btn btn-primary btn-sm text-white border-none bg-green-600" for="manual">手动上传</label>
          <label class="btn btn-primary btn-sm ml-2 mr-0 text-white border-none bg-green-600" @click="randomTwopaper()"
            for="openShow">🤖 穿梭机</label>
        </div>
      </div>
    </div>

    <table class="table table-compact w-full text-center shadow-md rounded-lg" v-if="this_subject_data.length != 0">
      <!-- head -->
      <thead>
        <tr class="text-green-700 dark:text-green-100">
          <th class="bg-green-50 rounded-tl-lg dark:bg-gray-500">排名</th>
          <th class="bg-green-50  dark:bg-gray-500"><input type="text" placeholder="姓名"
              class="input input-bordered input-success input-sm w-20" v-model="searchName"
              @change='changeTwoPaper()' /></th>
          <th class="bg-green-50 dark:bg-gray-500">班级</th>
          <th class="bg-green-50 dark:bg-gray-500">分数</th>
          <th class="bg-green-50 rounded-tr-lg dark:bg-gray-500">
            <label class="swap">
              <input type="checkbox"
                @click="this_task_papertwo_options = !this_task_papertwo_options; changeTwoPaper()" />
              <div class="swap-on btn btn-primary btn-sm text-white font-semibold">⇋ 按班级</div>
              <div class="swap-off btn btn-primary btn-sm text-white font-semibold">按年级 ⇋</div>
            </label>
          </th>
        </tr>
      </thead>
      <tbody v-if="searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this_task_papertwo_showSearch" :key="index" class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="getPaperTwo(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tbody v-if="this_task_papertwo_options && !searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this_task_papertwo_graderank.slice(0, maxloadTwo)" :key="index"
          class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="getPaperTwo(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!this_task_papertwo_options && !searchName" class="rounded-b-lg">
        <tr v-for="(paper, index) in this_task_papertwo_classrank" :key="index" class="rounded-b-lg">
          <th>{{ index + 1 }}</th>
          <td>{{ paper.realName }}</td>
          <td>{{ paper.className.substring(0, 5) }}</td>
          <td>{{ paper.allScore }}</td>
          <td><label class="btn btn-outline btn-primary btn-sm" @click="getPaperTwo(paper, index)"
              for="openShow">浏览二卷</label>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-green-700 dark:text-green-100">
          <th class="bg-green-50 rounded-l-lg dark:bg-gray-500">排名</th>
          <th class="bg-green-50  dark:bg-gray-500"><input type="text" placeholder="姓名"
              class="input input-bordered input-success input-sm w-20" v-model="searchName"
              @change='changeTwoPaper()' /></th>
          <th class="bg-green-50 dark:bg-gray-500">班级</th>
          <th class="bg-green-50 dark:bg-gray-500">分数</th>
          <th class="bg-green-50 rounded-r-lg dark:bg-gray-500">
            <label class="swap">
              <input type="checkbox"
                @click="this_task_papertwo_options = !this_task_papertwo_options; changeTwoPaper()" />
              <div class="swap-on btn btn-primary btn-sm text-white">⇋ 班级</div>
              <div class="swap-off btn btn-primary btn-sm text-white">年级 ⇋</div>
            </label>
          </th>
        </tr>
      </tfoot>


      <input type="checkbox" id="openShow" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative w-11/12 max-w-5xl">
          <label for="openShow" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
          <label class="btn btn-secondary btn-sm btn-circle absolute right-12 top-2" @click="randomTwopaper()">↻</label>
          <h3 class="text-lg font-bold my-3 md:mt-0 mb-4 text-start">
            {{ this_task_papertwo_chosen_provider.className }}-{{ this_task_papertwo_chosen_provider.realName }}<br>
            得分:{{ this_task_papertwo_chosen_provider.allScore }} · 排名:{{ this_task_papertwo_chosen_provider.rank }}
          </h3>

          <span class="my-4" v-for="(one, num) in this_task_papertwo_chosen_data" :key="one.teaCode">

            <label class="btn gap-2 btn-secondary my-2 w-48" for="openUpload" @click="this_upload_tea = one.teaCode">
              第 {{ one.teaCode }} 题
              <svg t="1661591286859" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2908" width="20" height="20">
                <path
                  d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                  p-id="2909" fill="#ffffff"></path>
              </svg>
            </label>
            <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
              @change="uploadTwopaper($event)" />



            <div v-for="(a, index) in one.images" :key="index">
              <div class="card shadow-md grid relative z-10 my-4">
                <figure><img :src="a" /></figure>
                <div class="card-body p-0">
                  <div class="card-actions justify-end">
                    <button @click="deleteChoosenImage(num, index)"
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
            <div v-for="(b, index) in fileList" :key="index">
              <div class="card shadow-md grid relative z-10 my-4" v-if="b.teaCode == one.teaCode">
                <figure><img :src="b.url" /></figure>
                <div class="card-body p-0">
                  <div class="card-actions justify-end">
                    <button @click="deleteSelfImage(index)"
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

          </span>
          <div class="modal-action mt-16">
            <label class="btn btn-primary" @click="submitTask()">提交此套</label>
            <label @click="randomTwopaper()" class="btn btn-secondary text-white">再来一瓶</label>
            <label for="openShow" class="btn btn-outline btn-secondary text-white">关闭</label>
          </div>
        </div>
      </div>



      <input type="checkbox" id="manual" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative w-11/12 max-w-5xl">
          <label for="manual" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
          <span class="my-4" v-for="(one, index) in this_task_data" :key="index">
            <div v-if="one.hasSubjectiveItem == 1" class="flex-col flex">
              <label class="btn gap-2 btn-secondary my-2 w-48" for="openUpload" @click="this_upload_tea = one.teaCode">
                第 {{ one.teaCode }} 题
                <svg t="1661591286859" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2908" width="20" height="20">
                  <path
                    d="M669.553493 952.874667H118.214827C52.934827 952.874667 0.02816 905.728 0.02816 847.786667V147.797333C0.02816 89.770667 53.062827 42.752 118.214827 42.752h787.626666C971.121493 42.752 1024.02816 89.898667 1024.02816 147.797333V637.866667c0 19.370667-17.621333 34.986667-39.381333 34.986666s-39.381333-15.616-39.381334-34.986666V147.797333c0-19.370667-17.749333-34.986667-39.381333-34.986666H118.17216c-21.76 0-39.381333 15.701333-39.381333 34.986666V847.786667c0 19.370667 17.749333 34.986667 39.381333 34.986666h551.381333c21.76 0 39.381333 15.658667 39.381334 35.029334 0 19.370667-17.578667 34.986667-39.381334 34.986666zM39.366827 742.826667a41.429333 41.429333 0 0 1-27.818667-10.282667 32.384 32.384 0 0 1 0-49.578667l196.224-174.250666c35.925333-32 90.709333-39.936 136.234667-19.712l213.674666 94.976a42.581333 42.581333 0 0 0 45.312-6.570667l353.706667-314.453333c15.402667-13.653333 40.405333-13.653333 55.808 0 15.36 13.696 15.36 35.925333 0 49.578666l-353.749333 314.453334c-35.968 31.914667-90.709333 39.893333-136.277334 19.626666L308.806827 551.68a42.581333 42.581333 0 0 0-45.269334 6.570667L67.185493 732.586667a41.429333 41.429333 0 0 1-27.818666 10.24z m275.754666-350.08a105.173333 105.173333 0 0 1-105.045333-105.045334 105.173333 105.173333 0 0 1 105.045333-105.002666 105.173333 105.173333 0 0 1 105.002667 105.002666 105.173333 105.173333 0 0 1-105.002667 105.045334z m0-140.032c-19.285333 0-34.986667 15.744-34.986666 34.986666 0 19.242667 15.701333 34.986667 34.986666 34.986667 19.2 0 34.986667-15.744 34.986667-34.986667 0-19.242667-15.786667-34.986667-34.986667-34.986666z m533.845334 700.16a34.986667 34.986667 0 0 1-34.986667-34.986667v-210.090667a34.986667 34.986667 0 1 1 69.973333 0v210.048a34.986667 34.986667 0 0 1-34.986666 34.986667z m140.032-140.032a34.858667 34.858667 0 0 1-23.936-9.514667l-116.053334-108.970667-116.096 109.056a34.944 34.944 0 1 1-47.914666-50.986666l122.752-115.285334a53.12 53.12 0 0 1 82.474666 0l122.752 115.285334a34.986667 34.986667 0 0 1-23.978666 60.416z"
                    p-id="2909" fill="#ffffff"></path>
                </svg>
              </label>
              <input type="file" id="openUpload" :name="one.teaCode" class="hidden" multiple="multiple"
                @change="uploadTwopaper($event)" />


              <div v-for="(b, index) in fileList" :key="index">
                <div class="card shadow-md grid relative z-10 my-2" v-if="b.teaCode == one.teaCode">
                  <figure><img :src="b.url" /></figure>
                  <div class="card-body p-0">
                    <div class="card-actions justify-end">
                      <button @click="deleteSelfImage(index)"
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
          <div class="modal-action">
            <label class="btn btn-primary" @click="submitTask()">提交此套</label>
            <label for="manual" class="btn btn-outline btn-secondary text-white">关闭</label>
          </div>
        </div>
      </div>


    </table>
    <div class="text-center mt-5">
      <button class="btn btn-primary mr-3" v-if="this_task_papertwo_options && !searchName"
        @click="maxloadTwo = (maxloadTwo + 100) > this_task_papertwo_graderank.length ? this_task_papertwo_graderank.length : (maxloadTwo + 300)">加载更多
        [{{ maxloadTwo }}/{{ this_task_papertwo_graderank.length }}]</button>
      <button class="btn btn-secondary " v-if="this_task_papertwo_options && !searchName"
        @click="maxloadTwo = this_task_papertwo_graderank.length">加载全部</button>
    </div>


  </div>
  <!--body结束-->

  <!--脚脚开始-->
  <footer class="footer p-10 bg-neutral text-neutral-content" v-if="islogin">
    <div>
      <img src="./assert/logo.png" class="h-12 rounded-lg">
      <p>
        Xiaoxin Assistant V{{ version }} Beta,<br>
        Created by <a href="https://hissin.cn">hissin',</a><br>
        <a href="https://GeekPara.com">GeekPara.</a>
      </p>
    </div>
    <div>
      <span class="footer-title">About</span>
      <div class="grid grid-flow-col gap-4">
        <a href="https://hissin.cn">
          <svg t="1660962005433" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1403" width="24" height="24">
            <path
              d="M970.46 871.28h-30.94V371.26c0-41.9-34.1-76-76-76h-77.44v-36.02h108.6c5.52 0 10-4.48 10-10V128.92c0-0.1-0.02-0.2-0.04-0.3-0.14-36.86-29.22-67.02-65.66-68.88a9.78 9.78 0 0 0-3.6-0.7h-548.8c-38.2 0-69.28 31.08-69.28 69.28v166.94H164.48c-11.8 0-22.96 2.7-32.92 7.52-9.96 4.8-18.72 11.74-25.7 20.18-0.66 0.8-1.3 1.62-1.94 2.44-0.1 0.14-0.22 0.28-0.32 0.42a75.574 75.574 0 0 0-15.14 45.46v500H57.54c-5.52 0-10 4.46-10 10v40.94c0 3.82 2.18 7.32 5.64 8.98l67.54 32.76c1.36 0.66 2.86 1 4.36 1h777.84c1.5 0 3-0.34 4.36-1l67.54-32.76a9.954 9.954 0 0 0 5.64-8.98v-40.94c0-5.54-4.48-10-10-10zM835.38 79.64c27.16 0 49.28 22.1 49.28 49.28 0 0.08 0.02 0.16 0.02 0.24v110.08h-98.6V129.02c0-0.04 0.02-0.06 0.02-0.1 0-27.18 22.1-49.28 49.28-49.28zM237.3 128.32c0-27.16 22.1-49.28 49.28-49.28h500.8c-13.08 12.58-21.24 30.22-21.28 49.76 0 0.04-0.02 0.08-0.02 0.12v643.86l-528.78-0.02V128.32z m-10 664.44l548.78 0.02c2.66 0 5.2-1.06 7.08-2.92 1.88-1.88 2.92-4.42 2.92-7.08V367.26h88.42v463.08H153.5V367.26h63.8v415.5c0 5.54 4.48 10 10 10zM108.46 371.3c0-0.02 0.02-0.02 0.02-0.04 0-14.46 5.52-27.68 14.56-37.62 0.06-0.06 0.12-0.12 0.16-0.18 0.56-0.6 1.12-1.2 1.7-1.78 10.14-10.14 24.14-16.42 39.58-16.42h52.82v32h-73.8c-5.52 0-10 4.48-10 10v483.08c0 5.52 4.48 10 10 10h741c5.52 0 10-4.48 10-10V357.26c0-5.52-4.48-10-10-10h-98.42v-32h77.44c30.88 0 56 25.12 56 56v500.02H108.46V371.3z m852 544.64l-59.84 29.02H127.38l-59.84-29.02v-24.66h892.92v24.66z"
              fill="#23130D" p-id="1404"></path>
            <path
              d="M67.54 891.28v24.66l59.84 29.02h773.24l59.84-29.02v-24.66H67.54z m557 36.84H403.46c-5.52 0-10-4.48-10-10s4.48-10 10-10h221.08c5.52 0 10 4.48 10 10s-4.48 10-10 10z"
              fill="#636368" p-id="1405"></path>
            <path
              d="M900.62 924.96h-268.8c-1.82 1.94-4.4 3.16-7.28 3.16H403.46c-2.88 0-5.46-1.22-7.28-3.16H127.38l-59.84-29.02v20l59.84 29.02h773.24l59.84-29.02v-20l-59.84 29.02z"
              fill="#23130D" opacity=".2" p-id="1406"></path>
            <path
              d="M884.68 129.16v110.08h-98.6V129.02c0-0.04 0.02-0.06 0.02-0.1 0-27.18 22.1-49.28 49.28-49.28 27.16 0 49.28 22.1 49.28 49.28 0 0.08 0.02 0.16 0.02 0.24z"
              fill="#CC7B5A" p-id="1407"></path>
            <path
              d="M854.94 83.7c-17.48 7.58-29.72 25-29.72 45.22 0 0.04-0.02 0.06-0.02 0.1v110.22h-39.12V129.02c0-0.04 0.02-0.06 0.02-0.1 0-27.18 22.1-49.28 49.28-49.28 6.94 0 13.56 1.44 19.56 4.06z"
              fill="#23130D" opacity=".2" p-id="1408"></path>
            <path
              d="M919.52 371.26v500.02H108.46V371.3c0-0.02 0.02-0.02 0.02-0.04 0-14.46 5.52-27.68 14.56-37.62 0.06-0.06 0.12-0.12 0.16-0.18 0.56-0.6 1.12-1.2 1.7-1.78 10.14-10.14 24.14-16.42 39.58-16.42h52.82v32h-73.8c-5.52 0-10 4.48-10 10v483.08c0 5.52 4.48 10 10 10h741c5.52 0 10-4.48 10-10V357.26c0-5.52-4.48-10-10-10h-98.42v-32h77.44c30.88 0 56 25.12 56 56z"
              fill="#E1E1E5" p-id="1409"></path>
            <path
              d="M874.5 367.26v463.08H153.5V367.26h63.8v415.5c0 5.54 4.48 10 10 10h230.92l65.28 0.02h252.58c2.66 0 5.2-1.06 7.08-2.92 1.88-1.88 2.92-4.42 2.92-7.08V367.26h88.42z"
              fill="#3594BF" p-id="1410"></path>
            <path
              d="M286.58 79.04c-27.18 0-49.28 22.12-49.28 49.28v644.44l528.78 0.02V128.92c0-0.04 0.02-0.08 0.02-0.12 0.04-19.54 8.2-37.18 21.28-49.76h-500.8z m18.64 317.56h375.9c5.52 0 10 4.48 10 10s-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10s4.48-10 10-10z m-10-33.7c0-5.52 4.48-10 10-10h375.9c5.52 0 10 4.48 10 10s-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10z m10 77.4h375.9c5.52 0 10 4.48 10 10 0 5.54-4.48 10-10 10H305.22c-5.52 0-10-4.46-10-10 0-5.52 4.48-10 10-10z m0 43.72h375.9c5.52 0 10 4.48 10 10s-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10s4.48-10 10-10z m0 101.44h82.4c5.54 0 10 4.46 10 10 0 5.52-4.46 10-10 10h-82.4c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10z m127.24 117.86h-127.24c-5.52 0-10-4.48-10-10s4.48-10 10-10h127.24c5.52 0 10 4.48 10 10s-4.48 10-10 10z m0-48.92h-127.24c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10h127.24c5.52 0 10 4.46 10 10 0 5.52-4.48 10-10 10z m263.96 82.14c0 5.52-4.48 10-10 10h-210c-2.78 0-5.26-1.12-7.08-2.92-1.8-1.82-2.92-4.3-2.92-7.08v-184.32c0-5.52 4.46-10 10-10h210c5.52 0 10 4.48 10 10v184.32z m0-421.1c0 5.52-4.48 10-10 10h-381.2c-5.52 0-10-4.48-10-10V132.32c0-5.52 4.48-10 10-10h381.2c5.52 0 10 4.48 10 10v183.12z"
              fill="#E59D89" p-id="1411"></path>
            <path
              d="M634.54 918.12c0 5.52-4.48 10-10 10H403.46c-5.52 0-10-4.48-10-10s4.48-10 10-10h221.08c5.52 0 10 4.48 10 10zM686.42 542.22h-210c-5.54 0-10 4.48-10 10v184.32c0 2.78 1.12 5.26 2.92 7.08 1.82 1.8 4.3 2.92 7.08 2.92h210c5.52 0 10-4.48 10-10v-184.32c0-5.52-4.48-10-10-10z m-200 184.32V655.8l25.08-43.44 65.9 114.18h-90.98z m114.08 0l-33.5-58.02 14.42-24.98 47.92 83h-28.84z m75.92 0h-23.98l-62.36-108a9.97 9.97 0 0 0-8.66-5c-3.58 0-6.88 1.9-8.66 5l-17.3 29.98-35.3-61.16a10.02 10.02 0 0 0-8.66-5c-3.58 0-6.88 1.9-8.66 5l-16.42 28.44v-53.58h190v164.32z"
              fill="#23130D" p-id="1412"></path>
            <path d="M629.34 726.54h-28.84l-33.5-58.02 14.42-24.98z" fill="#CC7B5A" p-id="1413"></path>
            <path d="M577.4 726.54h-90.98V655.8l25.08-43.44z" fill="#F8D3C9" p-id="1414"></path>
            <path d="M629.34 726.54h-11.5l-42.16-73.04 5.74-9.96zM577.4 726.54h-11.5l-60.16-104.22 5.76-9.96z"
              fill="#23130D" opacity=".2" p-id="1415"></path>
            <path
              d="M486.42 562.22v53.58l16.42-28.44c1.78-3.1 5.08-5 8.66-5 3.56 0 6.86 1.9 8.66 5l35.3 61.16 17.3-29.98c1.78-3.1 5.08-5 8.66-5s6.88 1.9 8.66 5l62.36 108h23.98v-164.32h-190z m149.86 69.86c-16.72 0-30.32-13.6-30.32-30.32 0-16.74 13.6-30.34 30.32-30.34 16.74 0 30.34 13.6 30.34 30.34 0 16.72-13.6 30.32-30.34 30.32z"
              fill="#3594BF" p-id="1416"></path>
            <path
              d="M636.28 571.42c-16.72 0-30.32 13.6-30.32 30.34 0 16.72 13.6 30.32 30.32 30.32 16.74 0 30.34-13.6 30.34-30.32 0-16.74-13.6-30.34-30.34-30.34z m0 40.66a10.332 10.332 0 0 1 0-20.66c5.7 0 10.34 4.64 10.34 10.34 0 5.68-4.64 10.32-10.34 10.32z"
              fill="#23130D" p-id="1417"></path>
            <path
              d="M646.62 601.76c0 5.68-4.64 10.32-10.34 10.32a10.332 10.332 0 0 1 0-20.66c5.7 0 10.34 4.64 10.34 10.34z"
              fill="#F9C139" p-id="1418"></path>
            <path
              d="M691.12 362.9c0 5.52-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10s4.48-10 10-10h375.9c5.52 0 10 4.48 10 10zM691.12 406.6c0 5.52-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10s4.48-10 10-10h375.9c5.52 0 10 4.48 10 10zM691.12 450.3c0 5.54-4.48 10-10 10H305.22c-5.52 0-10-4.46-10-10 0-5.52 4.48-10 10-10h375.9c5.52 0 10 4.48 10 10zM691.12 494.02c0 5.52-4.48 10-10 10H305.22c-5.52 0-10-4.48-10-10s4.48-10 10-10h375.9c5.52 0 10 4.48 10 10zM397.62 595.46c0 5.52-4.46 10-10 10h-82.4c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10h82.4c5.54 0 10 4.46 10 10zM442.46 644.4c0 5.52-4.48 10-10 10h-127.24c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10h127.24c5.52 0 10 4.46 10 10zM442.46 693.32c0 5.52-4.48 10-10 10h-127.24c-5.52 0-10-4.48-10-10s4.48-10 10-10h127.24c5.52 0 10 4.48 10 10zM686.42 122.32h-381.2c-5.52 0-10 4.48-10 10v183.12c0 5.52 4.48 10 10 10h381.2c5.52 0 10-4.48 10-10V132.32c0-5.52-4.48-10-10-10z m-10 183.12h-361.2V142.32h361.2v163.12z"
              fill="#23130D" p-id="1419"></path>
            <path
              d="M315.22 142.32v163.12h361.2V142.32h-361.2z m72.24 111.4a10.032 10.032 0 0 1 0 14.16c-1.96 1.94-4.52 2.92-7.08 2.92-2.54 0-5.1-0.98-7.06-2.92l-36.92-36.92a10.032 10.032 0 0 1 0-14.16l36.92-36.9a9.97 9.97 0 0 1 14.14 0 10.006 10.006 0 0 1 0 14.14l-29.84 29.84 29.84 29.84z m262.48-22.76l-36.92 36.92c-1.96 1.94-4.52 2.92-7.08 2.92-2.54 0-5.1-0.98-7.06-2.92a10.032 10.032 0 0 1 0-14.16l29.84-29.84-29.84-29.84a10.006 10.006 0 0 1 0-14.14 9.97 9.97 0 0 1 14.14 0l36.92 36.9c1.88 1.88 2.92 4.42 2.92 7.08s-1.04 5.2-2.92 7.08z"
              fill="#F9C139" p-id="1420"></path>
            <path
              d="M652.86 223.88c0 2.66-1.04 5.2-2.92 7.08l-36.92 36.92c-1.96 1.94-4.52 2.92-7.08 2.92-2.54 0-5.1-0.98-7.06-2.92a10.032 10.032 0 0 1 0-14.16l29.84-29.84-29.84-29.84a10.006 10.006 0 0 1 0-14.14 9.97 9.97 0 0 1 14.14 0l36.92 36.9c1.88 1.88 2.92 4.42 2.92 7.08zM387.46 253.72a10.032 10.032 0 0 1 0 14.16c-1.96 1.94-4.52 2.92-7.08 2.92-2.54 0-5.1-0.98-7.06-2.92l-36.92-36.92a10.032 10.032 0 0 1 0-14.16l36.92-36.9a9.97 9.97 0 0 1 14.14 0 10.006 10.006 0 0 1 0 14.14l-29.84 29.84 29.84 29.84z"
              fill="#FFFFFF" p-id="1421"></path>
            <path
              d="M217.3 646.16v81.48l-63.8-63.8v-81.48zM401.48 830.34H320l-37.58-37.58h81.48zM217.3 551.84v62.64l-63.8-63.8v-62.64zM495.8 830.34h-62.62l-37.58-37.58h62.62zM217.3 382.44v104.12l-63.8-63.8v-55.5h48.62zM665.2 830.34h-104.14l-37.56-37.56h104.14z"
              fill="#FFFFFF" opacity=".4" p-id="1422"></path>
          </svg>

        </a>

        <a href="https://github.com/hissincn"><svg t="1660962119432" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2165" width="24" height="24">
            <path
              d="M465.981 1001.74a89.578 89.578 0 0 1-89.889-88.955l-0.356-63.666c-176.662 38.422-213.927-74.93-213.927-74.93-28.895-73.372-70.523-92.873-70.523-92.873-57.61-39.446 4.364-38.645 4.364-38.645 63.71 4.452 97.28 65.447 97.28 65.447 56.631 97.058 148.569 69.009 184.765 52.803 5.699-41.049 22.172-69.053 40.337-84.947-141.045-16.028-289.303-70.523-289.303-313.79 0-69.32 24.799-125.952 65.447-170.429-6.589-16.028-28.316-80.584 6.144-168.025 0 0 53.337-17.052 174.659 65.09a609.28 609.28 0 0 1 158.943-21.37c53.915 0.223 108.276 7.257 159.031 21.37C814.186 6.679 867.434 23.73 867.434 23.73c34.549 87.485 12.822 152.042 6.233 168.025 40.693 44.433 65.358 101.109 65.358 170.43 0 243.89-148.57 297.583-289.926 313.299 22.751 19.723 43.053 58.323 43.053 117.582 0 84.992-0.312 119.674-0.312 119.674a89.622 89.622 0 0 1-89.8 89H465.98z"
              fill="#46B980" p-id="2166"></path>
          </svg></a>
        <a href="https://twitter.com/hissincn"><svg t="1660962186605" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="3069" width="24" height="24">
            <path
              d="M1024 186.368a410.325333 410.325333 0 0 1-120.618667 33.877333 214.954667 214.954667 0 0 0 92.373334-119.125333 413.781333 413.781333 0 0 1-133.504 52.181333A207.189333 207.189333 0 0 0 708.949333 85.333333c-115.968 0-210.005333 96.426667-210.005333 215.424 0 16.896 1.792 33.28 5.376 49.066667-174.592-9.002667-329.386667-94.72-433.066667-225.152a219.306667 219.306667 0 0 0-28.416 108.373333c0 74.709333 37.12 140.672 93.44 179.328a206.250667 206.250667 0 0 1-95.146666-26.88v2.645334c0 104.405333 72.405333 191.488 168.533333 211.2a200.32 200.32 0 0 1-55.296 7.594666c-13.525333 0-26.752-1.28-39.552-3.84 26.709333 85.589333 104.277333 147.882667 196.224 149.546667A414.805333 414.805333 0 0 1 0 841.941333 584.96 584.96 0 0 0 322.048 938.666667c386.474667 0 597.76-328.192 597.76-612.906667 0-9.386667-0.213333-18.730667-0.554667-27.904 41.045333-30.378667 76.672-68.266667 104.746667-111.488"
              fill="#55ACEE" p-id="3070"></path>
          </svg></a>
        <a href="mailto:hissin@126.com"><svg t="1660962225934" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4749" width="24" height="24">
            <path
              d="M326.4 288h563.2a102.4 102.4 0 0 1 102.4 102.4v371.2a102.4 102.4 0 0 1-102.4 102.4H326.4A102.4 102.4 0 0 1 224 761.6V390.4A102.4 102.4 0 0 1 326.4 288z"
              fill="#CAE705" p-id="4750"></path>
            <path
              d="M114.208 197.696a32 32 0 0 0-36.416 52.608l416 288a32 32 0 0 0 36.416 0l416-288a32 32 0 0 0-36.416-52.608L512 473.088 114.208 197.696z"
              fill="#2B82D8" p-id="4751"></path>
            <path
              d="M160 224a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V288a64 64 0 0 0-64-64H160z m0-64h704a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H160a128 128 0 0 1-128-128V288a128 128 0 0 1 128-128z"
              fill="#2B82D8" p-id="4752"></path>
          </svg></a>

      </div>
    </div>
  </footer>
  <!--脚脚结束-->
</template>

<script>
import Qs from 'qs';
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      version: '1.7.1',
      islogin: false,
      username: '',
      password: '',
      token: '',
      userdata: {},
      subjects: [],
      this_subject: 0,
      this_subject_data: [],
      this_task_status: null,
      this_task_data: [],
      this_task_paperone: [],
      getOneState: 0,
      this_task_papertwo_options: true,
      this_task_papertwo_graderank: [],
      this_task_papertwo_classrank: [],
      this_task_papertwo_chosen_provider: {},
      this_task_papertwo_chosen_data: [],
      this_task_papertwo_showSearch: [],
      errorShow: '',
      searchName: "",
      maxloadTwo: 100,
      errorRate: 0.3,
      fileList: [],
      qiniuToken: "",
      this_upload_tea: '',
    }
  },
  mounted() {
    if (Cookies.get('username')) {
      this.username = Cookies.get('username');
      this.password = Cookies.get('password');
      this.login();
    }
    fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/getQiNiuToken').then(
      res => res.json()
    ).then(res => {
      if (res.state == 'ok') {
        this.qiniuToken = res.data;
      }
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    login() {
      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          userName: this.username,
          userPass: this.password,
          platform: 'pc',
          deviceNo: 'Pc_Hello'
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          Cookies.set('username', this.username, { expires: 99999 });
          Cookies.set('password', this.password, { expires: 99999 });
          this.token = res.data.token;
          this.userdata = res.data;
          this.islogin = true;
          this.index();
        } else if (res.state == 'fail') {
          alert(res.msg);
        } else {
          alert(res.msg);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    logout(err) {
      this.islogin = false;
      Cookies.remove('username');
      Cookies.remove('password');

      //window.location.href = "/";
      if (err) {
        this.errorShow = err;
        setTimeout(() => {
          this.errorShow = '';
        }, 2000);
      }
    },
    index() {
      if (!Cookies.get('loginCount')) {
        self.location.href = "#about";
        Cookies.set('loginCount', 1, { expires: 1 });
      }

      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getSubjects', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.subjects = res.data;
          this.changeSub(0);
        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })

    },
    changeSub(index) {
      this.this_subject = index;
      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTasks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          page: "1",
          limit: "99999999",
          sid: this.subjects[index].sid
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.this_subject_data = res.data;
        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },


    task(status) {
      this.this_task_status = status;
      this.getOneState = 1;

      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTaskInfoSubmitted', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          taskId: this.this_task_status.taskId
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.this_task_paperone = [];
          res.data.forEach((tea) => {
            if (tea.hasSubjectiveItem == 0) {
              this.this_task_paperone.push(tea.teaAnswer)
            }
          })
          this.getOneState = 2;

        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {

          //取回选择题数据
          fetch(`https://service-cz1sw5t1-1301539318.bj.apigw.tencentcs.com/release/?userrole=${this.userdata.userRole}&schoolid=${this.userdata.schoolId}&sid=${status.taskId}&token=${this.token}&userid=${this.userdata.userId}&username=${this.userdata.realName}&schoolname=${this.userdata.schoolName}&type=query`)
            .then(
              res => res.json()
            ).then(res => {
              //console.log(res.code == 1 || !res.answer);
              if (res.code == 0 && res.answer) {
                this.this_task_paperone = res.answer.replace(/[0-9]+/g, "").replace(/\. /g, "").split('\n');
                this.getOneState = 2
              }
              else if (res.code == 1 || !res.answer) {
                for (let i of this.this_task_data) {
                  if (i.hasSubjectiveItem == 0) {
                    this.this_task_paperone.push("C");
                  }
                }
                this.getOneState = 3
              }

            }).catch(err => {
              console.log(err);
            });

        }
      }).catch(err => {
        console.log(err);
      })





      fetch('https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTaskInfo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          taskId: this.this_task_status.taskId
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.this_task_data = res.data;
        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      });

      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getGradeRanks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          taskId: this.this_task_status.taskId,
          page: "1",
          limit: "999999",
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.this_task_papertwo_graderank = res.data;
        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      });

      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getClassRanks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          taskId: this.this_task_status.taskId,
          page: "1",
          limit: "99999999",
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          this.this_task_papertwo_classrank = res.data;
        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })

    },
    getPaperTwo(provider, rank) {

      this.this_task_papertwo_chosen_provider = provider;
      this.this_task_papertwo_chosen_provider.rank = rank + 1;
      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getMutualTaskInfo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          token: this.token,
          taskId: this.this_task_status.taskId,
          userId: provider.userId,
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          if (res.data != null) {
            this.this_task_papertwo_chosen_data = res.data;
          }
          else {
            this.this_task_papertwo_chosen_data = [];
          }

        } else if (res.state == 'over') {
          this.logout(res.msg)
        } else {
          alert(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    backhome() {
      this.this_task_status = null;
      this.this_task_data = [];
      this.this_task_paperone = [];
      this.getOneState = 0;
      this.this_task_papertwo_options = true;
      this.this_task_papertwo_graderank = [];
      this.this_task_papertwo_classrank = [];
      this.this_task_papertwo_chosen_provider = {};
      this.this_task_papertwo_chosen_data = [];
      this.this_task_papertwo_showSearch = [];
      this.getOneState = 0;
      this.searchName = "";
      this.maxloadTwo = 100;
      this.fileList = [];
    },
    changeTwoOption() {
      this.this_task_papertwo_options = !this.this_task_papertwo_options;
      this.maxloadTwo = 100;

    },
    changeTwoPaper() {
      //this.loadSearch = true;
      //setTimeout(() => {
      this.maxloadTwo = 100;
      let search = this.searchName;
      let range = this.this_task_papertwo_options ? this.this_task_papertwo_graderank : this.this_task_papertwo_classrank;
      let result = [];

      range.map(function (item) {
        if (item.realName.indexOf(search) != -1) {
          result.push(item);
        }
      });
      this.this_task_papertwo_showSearch = result;
      this.loadSearch = false;
      //}, 1);

    },
    randomTwopaper() {
      let a = Math.trunc(Math.random() * (this.this_task_papertwo_graderank.length - 1) + 1);
      this.getPaperTwo(this.this_task_papertwo_graderank[a], a);
    },
    randomOnepaper() {

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

      let result = [...this.this_task_paperone];
      randomRank(Math.trunc(this.this_task_paperone.length * this.errorRate), 1, this.this_task_paperone.length).forEach((tea) => {
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
      this.this_task_paperone = result;
    },
    submitTask() {
      let objective = [];
      let subjective = [];

      this.this_task_data.forEach((task) => {
        //是客观题
        if (task.hasSubjectiveItem == 0) {
          objective.push(`${task.teaId},${this.this_task_paperone[task.teaCode - 1].toUpperCase()}`)
        }
      })


      if (this.this_task_papertwo_chosen_data.length == 0) {
        console.log(2)
        this.this_task_data.forEach((one) => {
          if (one.hasSubjectiveItem == 1) {
            let oneTea = [];
            this.fileList.forEach((own) => {
              if (own.teaCode == one.teaCode) {
                oneTea.push(`${one.teaId},${own.url}`)
              }
            })
            subjective.push(oneTea.join(';'))

          }
        })
      }
      else {
        this.this_task_papertwo_chosen_data.forEach((subject) => {
          let oneTea = [];
          subject.images.forEach((image) => {
            oneTea.push(`${subject.teaId},${image}`)
          })

          this.fileList.forEach((own) => {
            if (own.teaCode == subject.teaCode) {
              oneTea.push(`${subject.teaId},${own.url}`)
            }
          })

          subjective.push(oneTea.join(';'))
        })
      }


      console.log(objective.join('|'))
      console.log(subjective.join('|'))


      fetch(
        'https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/submitTask', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Qs.stringify({
          objectiveAnswer: objective.join('|'),
          subjectiveAnswer: subjective.join('|'),
          token: this.token,
          taskId: this.this_task_status.taskId,
        })
      }).then(
        res => res.json()
      ).then(res => {
        if (res.state == 'ok') {
          fetch(`https://service-cz1sw5t1-1301539318.bj.apigw.tencentcs.com/release/?userrole=${this.userdata.userRole}&schoolid=${this.userdata.schoolId}&sid=${this.this_task_status.taskId}&token=${this.token}&userid=${this.userdata.userId}&username=${this.userdata.realName}&schoolname=${this.userdata.schoolName}&type=submit`)
          alert(res.msg);
          this.changeSub(this.this_subject);
          this.backhome();
        } else if (res.state == 'fail') {
          alert(res.msg)
        } else if (res.state == 'over') {
          this.logout(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })

    },
    uploadTwopaper(ups) {
      //console.log(ups)
      //console.log(this.this_upload_tea)

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
              teaCode: this.this_upload_tea,
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
      this.this_task_papertwo_chosen_data[num].images.splice(index, 1)
    },
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
    }


  }
}
</script>
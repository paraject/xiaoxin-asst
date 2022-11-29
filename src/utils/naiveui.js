import {
  create,
  useMessage,
  useDialog,
  NMessageProvider,
  NDialogProvider,
  NProgress,
} from 'naive-ui';

// naive UI 按需引入
const naiveui = create({
  components: [
    useMessage,
    useDialog,
    NMessageProvider,
    NDialogProvider,
    NProgress,
  ],
});

export default naiveui;

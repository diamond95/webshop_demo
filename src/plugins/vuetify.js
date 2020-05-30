import Vue from 'vue';
import Vuetify from 'vuetify';
import en from './translation/en';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1084ff',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        greyColor: '#c8cfdb'
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
  /* for changing language - import lang above and use it under this line */
  lang: {
    locales: { en },
    current: 'en'
  }
});

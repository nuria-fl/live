import Vue from 'vue'
import App from './App'
import store from './store'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

const app = new Vue(Vue.util.extend({
  store
}, App))

if (process.env.NODE_ENV === 'production') {
  Raven
      .config('https://a213b9d98bea413b845785da0cecb4d0@sentry.io/1205827')
      .addPlugin(RavenVue, Vue)
      .install();

  window['_fs_debug'] = false;
  window['_fs_host'] = 'fullstory.com';
  window['_fs_org'] = 'BM5SM';
  window['_fs_namespace'] = 'FS';
  (function(m,n,e,t,l,o,g,y){
      if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
      g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
      o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
      g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
      y="rec";g.shutdown=function(i,v){g(y,!1)};g.restart=function(i,v){g(y,!0)};
      y="consent";g[y]=function(a){g(y,!arguments.length||a)};
      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
      g.clearUserCookie=function(){};
  })(window,document,window['_fs_namespace'],'script','user')
}

app.$mount('#app')

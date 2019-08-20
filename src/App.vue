<template>
  <div id="app">
    <router-view name="header"></router-view>
    <!--<shopHeader name="top"></shopHeader>-->
    <router-view :key="$route.path"></router-view>
    <shopFooter></shopFooter>
  </div>
</template>

<script>
  import shopHeader from './views/public/shopHeader';
  import shopFooter from './views/public/shopFooter';

  export default {
      components:{
          shopHeader,
          shopFooter
      },
      data(){
          return{

          }
      }
  }
</script>


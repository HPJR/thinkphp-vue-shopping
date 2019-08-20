<template>
  <div>
    <div class="pro-list-t">
      <ul>
        <li class="curr"><a><span>综合排序</span></a></li>
        <li :class="{curr2:order===''}"><a @click="handlerOrderDefault"><span>默认</span></a></li>
        <li><a @click="handlerOrderSales"><span>销量</span>
          <i v-if="order==='sales'" class="iconfont icon-fanhui3"></i>
        </a></li>
        <li><a @click="handlerOrderPrice"><span>价格</span>
          <i v-if="order==='cost-asc'" class="iconfont icon-fanhui4"></i>
          <i v-if="order==='cost-desc'" class="iconfont icon-fanhui3"></i>
        </a></li>
        <li><a @click="handlerOrderClick"><span>人气</span>
          <i v-if="order==='click-asc'" class="iconfont icon-fanhui4"></i>
          <i v-if="order==='click-desc'" class="iconfont icon-fanhui3"></i>
        </a></li>
        <li><a @click="handlerOrderTime"><span>上架时间</span>
          <i v-if="order==='time-asc'" class="iconfont icon-fanhui4"></i>
          <i v-if="order==='time-desc'" class="iconfont icon-fanhui3"></i>
        </a></li>
      </ul>
    </div>
    <div class="pro-list-a">
      <!--列表页-->
      <proList :pList="filteredAndOrderList" v-if="filteredAndOrderList"></proList>
    </div>
  </div>
</template>

<script>
  import proList from './proList';
  export default {
    components:{
      proList
    },
    props:{
      sortList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        order:''
      };
    },
    computed: {
      filteredAndOrderList(){
        let list = [...this.sortList];
        //排序
        switch (this.order) {
          case '':
            list = this.sortList;
            break;
          case 'sales':
            list = list.sort((a,b)=>b.order-a.order);
            break;
          case 'cost-asc':
            list = list.sort((a,b)=>a.price-b.price);
            break;
          case 'cost-desc':
            list = list.sort((a,b)=>b.price-a.price);
            break;
          case 'click-asc':
            list = list.sort((a,b)=>a.click-b.click);
            break;
          case 'click-desc':
            list = list.sort((a,b)=>b.click-a.click);
            break;
          case 'time-asc':
            list = list.sort((a,b)=>new Date(a.time)-new Date(b.time));
            break;
          case 'time-desc':
            list = list.sort((a,b)=>new Date(b.time)-new Date(a.time));
            break;
          default:
            list = this.sortList;
        }
        return list;
      }
    },
    methods: {
      //排序更改
      handlerOrderDefault(){
        this.order = '';
        console.log(this.filteredAndOrderList)

      },
      handlerOrderSales(){
        this.order = 'sales';
      },
      handlerOrderPrice(){
        this.order === 'cost-asc' ? this.order = 'cost-desc': this.order = 'cost-asc';
      },
      handlerOrderClick(){
        this.order === 'click-asc' ? this.order = 'click-desc': this.order = 'click-asc';
      },
      handlerOrderTime(){
        this.order === 'time-asc' ? this.order = 'time-desc': this.order = 'time-asc';
      }
    }
  };
</script>




<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: []
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            this.items = JSON.parse(sessionStorage.getItem('bs_menu'))
            console.log('items: '+ this.items)
            if (null === this.items) {
                console.log('Not menu in local')
                this.getMenu()
            }
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            getMenu() {
                let _this = this
                if (null === sessionStorage.getItem('bs_menu')) {
                    _this.$axios.get('/travelhelper/admin/private/menu/user').then(function (res) {
                        if (!_this.validateCode(res)) {
                            _this.error(res.data.header.resultMsg);
                            return ;
                        }
                        _this.items = res.data.data
                        sessionStorage.setItem('bs_menu', JSON.stringify(_this.items))
                        console.log(_this.items)
                    }, function (res) {
                        //console.log(res.data.message)
                    })
                }
            }
        }

    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

<style>
    /* reset */
    html, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu{
        margin: 0;
        padding: 0;
    }
    header, footer, section, article, aside, nav, hgroup, address, figure, figcaption, menu, details{
        display: block;
    }
    table{
        border-collapse: collapse;
        border-spacing: 0;
    }
    caption, th{
        text-align: left;
        font-weight: normal;
    }
    html, body, fieldset, img, iframe, abbr{
        border: 0;
    }
    i, cite, em, var, address, dfn{
        font-style: normal;
    }
    [hidefocus], summary{
        outline: 0;
    }
    li{
        list-style: none;
    }
    h1, h2, h3, h4, h5, h6, small{
        font-size: 100%;
    }
    sup, sub{
        font-size: 83%;
    }
    pre, code, kbd, samp{
        font-family: inherit;
    }
    q:before, q:after{
        content: none;
    }
    textarea{
        overflow: auto;
        resize: none;
    }
    label, summary{
        cursor: default;
    }
    a, button{
        cursor: pointer;
    }
    h1, h2, h3, h4, h5, h6, em, strong, b{
        font-weight: bold;
    }
    del, ins, u, s, a, a:hover{
        text-decoration: none;
    }
    body, textarea, input, button, select, keygen, legend{
        font: 12px/1.14 arial,\5b8b\4f53;
        color: #333;
        outline: 0;
    }
    body{
        background: #fff;
    }
    a, a:hover{
        color: #333;
    }
    .u-btn{
        padding: 5px 10px;
        color: #fff;
        background-color: #238efa;
        border: 1px solid #0070d9;
        border-radius: 1px;
    }
    .u-btn:hover{
        color: #fff;
    }
    .u-btn{
        padding: 5px 10px;
        color: #fff;
        background-color: #238efa;
        border: 1px solid #0070d9;
        border-radius: 1px;
    }
    .u-btn:hover{
        color: #fff;
    }
    .m-list{
        zoom: 1;
        margin-top: 54px;
        margin-left: -10px;
    }
    .m-list .item{
        float: left;
        margin-left: 10px;
        margin-bottom: 30px;
        width: 243px;
        height: 190px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
    }
    .m-list .item:hover{
        cursor: pointer;
    }
    .m-list .item:hover .play{
        display: block;
    }
    .m-list .snapshot{
        position: relative;
        width: 100%;
        height: 136px;
        overflow: hidden;
    }
    .m-list .snapshot .pic{
        width: 100%;
        background-color: #000;
    }
    .m-list .snapshot .play{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    .m-list .snapshot .play img{
        margin: 36px 0 0 94px;
    }
    .m-list .title{
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        color: #1b2126;
        margin-top: 10px;
        padding: 0 10px;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .m-list .online{
        width: 100%;
        box-sizing: border-box;
        font-size: 12px;
        color: #909ead;
        margin-top: 6px;
        padding: 0 10px;
        line-height: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .m-list .status{
        position: absolute;
        top: 5px;
        left: 5px;
        width: 64px;
        height: 20px;
        text-align: center;
        background-color: #238efa;
        color: #fff;
        line-height: 20px;
    }
    .m-list:before, .m-list:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-list:after{
        clear: both;
    }
    .u-btn{
        padding: 5px 10px;
        color: #fff;
        background-color: #238efa;
        border: 1px solid #0070d9;
        border-radius: 1px;
    }
    .u-btn:hover{
        color: #fff;
    }
    .m-room{
        margin-top: 10px;
        width: 100%;
        height: 750px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        border-radius: 5px;
        zoom: 1;
    }
    .m-room .g-left{
        float: left;
        width: 850px;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #dcd4d4
    }
    .m-room .g-right{
        float: left;
        position: relative;
        width: 500px;
        height: 100%;
    }
    .m-room .g-right .bar {
        text-align: center;
        padding: 10px;
    }
    .m-room .g-right .routePlan {
        position: absolute;
        z-index: 1;
        height: 500px;
    }

    .m-room .g-right .planBus, .m-room .g-right .planWalk {
        font-size: 30px;
        color: #fbfbfbad;
        margin: 0 30px;
    }
    .m-room .g-right #closePlanBar {
        font-size: 25px;
        position: absolute;
        right: 20px;
        top: 14px;
    }
    .m-room .g-right #map {
        height: 100%;
    }
    .m-room .g-right #pickerBox{
        width: 100%;
        height: 80px;
        text-align: center;
    }
    .m-room .g-right #startPlace, .m-room .g-right #endPlace{
        width: 90%;
        height: 30px;
        font-size: 15px;
        margin: 5px 0
    }
    .m-room .g-right #toWalk,.m-room .g-right #toBus {
        background-color: #559ffb;
        box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.21);
        -webkit-box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.21);
        -moz-box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.21);
    }
    .amap-call {
        display: none;
    }
    .m-room .g-right #barMenu {
        position: absolute;
        z-index: 1;
        background-color: #559ffb;
        color: #fff;
        padding: 3px;
        font-size: 25px;
        top: 2px;
        left: 2px;
    }

    .m-room .g-right #resetLocation {
        position: absolute;
        z-index: 1;
        background-color: #559ffb;
        color: #fff;
        padding: 3px;
        font-size: 25px;
        bottom: 2px;
        right: 2px;
    }
    .m-room .g-right #panel{
        float: left;
        position: absolute;
        top: 200px;
        width: 358px;
        height: auto;
        max-height: 400px;
        overflow-y: scroll;
    }
    .m-room .g-right .active,.m-room .g-right .active {
        color: #fff;
    }
    .m-room .info{
        padding: 14px;
        height: 85px;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        border-bottom: 1px solid #cccccc;
    }
    .m-room .info .avatar{
        float: left;
        width: 56px;
        height: 56px;
        margin-right: 10px;
    }
    .m-room .info .image{
        border-radius: 50%;
        width: 100%;
        height: 100%;
        vertical-align: top;
        background-color: #fff;
    }
    .m-room .info .detail{
        overflow: hidden;
    }
    .m-room .info .title{
        margin-top: 4px;
        font-size: 20px;
        line-height: 20px;
        color: #3a4a59;
    }
    .m-room .info .desc{
        font-size: 12px;
        line-height: 12px;
        margin-top: 12px;
        color: #3a4a59;
    }
    .m-room .media{
        width: 100%;
        height: 660px;
        overflow: hidden;
    }
    .m-room .media img{
        width: 100%;
    }
    .m-room .announcement_title{
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #3a4a59;
        text-align: center;
    }
    .m-room .announcement{
        padding: 10px 15px;
        width: 100%;
        box-sizing: border-box;
        background-color: #f5fbff;
        height: 76px;
        border-bottom: 1px solid #ced4d9;
        color: #6b8299;
        line-height: 18px;
        overflow-y: scroll;
    }
    .m-room .tab{
        width: 100%;
        text-align: center;
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        zoom: 1;
    }
    .m-room .tab li{
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        background-color: #e5f4ff;
    }
    .m-room .tab li.crt{
        background-color: #fff;
        border-bottom: 2px solid #238efa;
    }
    .m-room .tab:before, .m-room .tab:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-room .tab:after{
        clear: both;
    }
    .m-room .hide{
        display: none;
    }
    .m-room .chat{
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        height: 306px;
        background-color: #fff;
        overflow-y: scroll;
    }
    .m-room .chat .item{
        box-sizing: border-box;
        margin-bottom: 4px;
    }
    .m-room .chat .nick{
        position: relative;
        display: inline-block;
        color: #88939b;
        font-size: 12px;
        line-height: 18px;
    }
    .m-room .chat .nick .role-manager{
        background-position: -33px -54px;
    }
    .m-room .chat .nick .role-owner{
        background-position: 0px -54px;
    }
    .m-room .chat .nick.roles{
        position: relative;
        padding-left: 34px;
    }
    .m-room .chat .emoji{
        width: 18px;
        height: 18px;
        vertical-align: top;
        float: none;
    }
    .m-room .chat .text{
        font-size: 12px;
        color: #333;
        line-height: 18px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .m-room .chat .text.sys{
        color: red;
    }
    .m-room .chat.owner .nick{
        cursor: pointer;
    }
    .m-room .chat.owner .nick.owner, .m-room .chat.owner .nick.me{
        cursor: default;
    }
    .m-room .chat.manager .nick{
        cursor: pointer;
    }
    .m-room .chat.manager .nick.owner, .m-room .chat.manager .nick.manager, .m-room .chat.manager .nick.me{
        cursor: default;
    }
    .m-room .member{
        width: 100%;
        box-sizing: border-box;
        height: 306px;
        padding: 5px 0;
        background-color: #fff;
        overflow-y: scroll;
    }
    .m-room .member .item{
        width: 100%;
        position: relative;
        box-sizing: border-box;
        height: 35px;
        padding: 5px 10px 5px 45px;
        overflow: hidden;
    }
    .m-room .member .item .avatar{
        float: left;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
    }
    .m-room .member .item .avatar img{
        width: 100%;
        height: 100%;
    }
    .m-room .member .item .nick{
        font-size: 14px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .m-room .member .item .role-manager{
        background-position: -33px -54px;
    }
    .m-room .member .item .role-owner{
        background-position: 0px -54px;
    }
    .m-room .member .item:hover{
        background-color: #eff8ff;
    }
    .m-room .member .more{
        width: 100%;
        text-align: center;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
    }
    .m-room .member .more a{
        color: #238efa;
        text-decoration: underline;
    }
    .m-room .edit{
        width: 100%;
        height: 50px;
        padding: 7px 10px;
        box-sizing: border-box;
    }
    .m-room .edit .editText{
        width: 237px;
        height: 36px;
        padding: 4px 5px;
        margin: 0 auto;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 2px;
    }
    .m-room .sendBtn{
        width: 100%;
        position: relative;
        padding-right: 10px;
        box-sizing: border-box;
        zoom: 1;
    }
    .m-room .sendBtn .btn{
        float: right;
        margin-left: 12px;
    }
    .m-room .sendBtn:before, .m-room .sendBtn:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-room .sendBtn:after{
        clear: both;
    }
    .m-room .loginBtn{
        position: absolute;
        right: 10px;
        bottom: 20px;
    }
    .m-room .loginWarn{
        display: inline-block;
        margin: 10px;
        color: #999;
        font-weight: normal;
    }
    .m-room:before, .m-room:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-room:after{
        clear: both;
    }
    .m-menu{
        position: absolute;
        border: 1px solid #ced0d1;
        background-color: #fff;
    }
    .m-menu ul li{
        width: 168px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
    }
    .m-menu ul li:hover{
        background-color: #e5f4ff;
    }
    .m-menu .admin{
        display: none;
    }
    .m-menu.owner .admin{
        display: block;
    }
    .m-status{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 200;
        text-align: center;
        line-height: 538px;
        font-size: 15px;
    }
    .u-btn{
        padding: 5px 10px;
        color: #fff;
        background-color: #238efa;
        border: 1px solid #0070d9;
        border-radius: 1px;
    }
    .u-btn:hover{
        color: #fff;
    }
    .m-manager{
        margin-top: 90px;
        width: 1002px;
        height: 538px;
        background-color: #e5f4ff;
        box-sizing: border-box;
        border-radius: 5px;
        overflow: hidden;
        zoom: 1;
    }
    .m-manager .tt{
        height: 38px;
        line-height: 38px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 24px;
        color: #3a4a59;
        font-size: 15px;
        border-bottom: 1px solid #000;
    }
    .m-manager .item{
        width: 100%;
        display: block;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #7b8794;
        padding-left: 44px;
        box-sizing: border-box;
    }
    .m-manager .item .icon{
        margin-right: 10px;
    }
    .m-manager .item.crt, .m-manager .item:hover{
        color: #fff;
        background-color: #93c4f5;
    }
    .m-manager .g-left{
        float: left;
        width: 230px;
        height: 100%;
        box-sizing: border-box;
        padding-top: 5px;
        border-right: 1px solid #434e58;
    }
    .m-manager .g-right{
        float: left;
        position: relative;
        width: 770px;
        height: 100%;
    }

    .m-manager:before, .m-manager:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-manager:after{
        clear: both;
    }
    .u-ticon{
        display: inline-block;
        font-family: 'icomoon' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .ticon-1:before{
        content: "\e900";
    }
    .ticon-2:before{
        content: "\e901";
    }
    .m-emoji-wrapper{
        display: none;
        position: absolute;
        border: 1px solid #ccc;
        width: 400px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        top: -300px;
        left: -95px;
        z-index: 10;
    }
    .m-emoji-picCol{
        position: relative;
        background: #fff;
        overflow-y: scroll;
    }
    .m-emoji-picCol-ul{
        position: relative;
        list-style-type: none;
    }
    .m-emoji-picCol-ul:after{
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        content: ".";
    }
    .m-emoji-picCol-ul{
        zoom: 1;
    }
    .m-emoji-picCol-ul span{
        float: left;
        display: inline-block;
        margin: 0;
        background: #fff;
        border-right: #eee 1px solid;
        border-bottom: #eee 1px solid;
        cursor: pointer;
        padding: 10px;
    }
    .m-emoji-picCol-ul span.f-sel{
        background-color: #ccc;
    }
    .m-emoji-picCol-ul span img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .m-emoji-chnCol{
        position: relative;
        background: #f0f0f0;
    }
    .m-emoji-chnCol-ul{
        position: relative;
        list-style-type: none;
    }
    .m-emoji-chnCol-ul span{
        float: left;
        display: inline-block;
        height: 100%;
        width: 30px;
        background: #f0f0f0;
        cursor: pointer;
    }
    .m-emoji-chnCol-ul span.f-sel{
        background: #fff;
    }
    .m-emoji-chnCol-ul span img{
        display: block;
        height: 80%;
        width: auto;
        margin: 10%;
    }

    body{
        color: #3a4a59;
        font-family:"Hiragino Sans GB","Microsoft YaHei","微软雅黑",tahoma,arial;
    }

    body a:hover{
        color:#238efa;
    }
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #a0a9af;
        border-radius: 4px;
    }

    .g-doc{
        width: 100%;
        margin: 0 auto;
    }
    .m-head{
        width: 100%;
        height: 54px;
        background-color: #fff;
        border-top: 2px solid #238efa;
    }
    .m-head .g-doc{
        zoom: 1;
    }
    .m-head .g-doc:before, .m-head .g-doc:after{
        display: table;
        content: "";
        line-height: 0;
    }
    .m-head .g-doc:after{
        clear: both;
    }
    .m-head .item{
        display: inline-block;
        font-size: 14px;
        line-height: 54px;
        height: 54px;
        color: #1b2126;
    }
    .m-head .logo{
        padding-left: 30px;
    }
    .m-head .nav{
        margin-left: 20px;
    }
    .m-head .action{
        float: right;
        position: relative;
        margin-right: 40px;
        font-size: 12px;
        color:#909ead;
        cursor: pointer;
    }
    .m-head .action:hover{
        color: #238efa;
    }
    .m-head .action:hover .icon{
        background-position: -17px 0;
    }
    .m-head .info{
        float: right;
        position: relative;
        display: inline-block;
        padding-left: 35px;
        font-size: 12px;
        color:#909ead;
    }
    .m-head .info img{
        position: absolute;
        top:13px;
        left:0px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: yellow;
    }
    .m-head #nickName {
        cursor: pointer;
        color: #000;
    }


</style>
<template>
    <div id="container">
        <div class="g-doc">
            <div class="m-room" id="room">
                <div class="g-left">
                    <div class="info">
                        <div class="avatar">
                            <img class="image" id="roomAvatar"
                                 src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"/>
                        </div>
                        <div class="detail">
                            <p class="title" id="roomTitle">客服名：{{ serviceName }}</p>
                            <p class="desc">服务对象：<span id="roomCreator">{{ blindName }}</span></p>
                        </div>
                    </div>
                    <div id="media" class="media">
                    </div>
                </div>
                <div class="g-right">
                    <a href="javascript:;" id="barMenu" class="barMenu" v-show="!toggleBar" @click="closePlanBar">
                        <i class="icon ion-md-menu"></i>
                    </a>
                    <div class="routePlan" v-show="toggleBar">
                        <div style="background-color: #3d93fd;width: 350px;height: 200px;float: left;position: absolute;z-index:1">
                            <div class="bar">
                                <a href="javascript:;" id="busPlan" class="planBus" v-bind:class="{ active: showBus }"
                                   @click="togglePlan(0)">
                                    <i class="icon ion-md-bus"></i>
                                </a>
                                <a href="javascript:;" id="walkPlan" class="planWalk"
                                   v-bind:class="{ active: showWalk }"
                                   @click="togglePlan(1)">
                                    <i class="icon ion-md-walk"></i>
                                </a>
                                <a href="javascript:;" id="closePlanBar" class="close active"
                                   @click="closePlanBar">
                                    <i class="icon ion-md-close"></i>
                                </a>
                            </div>
                            <div id="pickerBox">
                                <!--<input id="startPlace" placeholder="输入关键字选取地点"/>-->
                                <input id="endPlace" placeholder="输入关键字选取終点"/>
                            </div>
                            <div style="float: right;margin: 12px 22px;">
                                <el-button type="primary" id="toBus" v-if="showBus" @click="busing">坐公车</el-button>
                                <el-button type="primary" id="toWalk" v-if="showWalk" @click="walking">走路去</el-button>
                            </div>
                        </div>

                        <div id="poiInfo"></div>
                        <div id="panel"></div>
                    </div>
                    <a href="javascript:;" id="resetLocation" class="resetLocation" @click="restLocation">
                        <i class="icon ion-md-locate"></i>
                    </a>
                    <div id="map" class="map" tabindex="0"></div>
                </div>
                <el-dialog title="请求列表" :visible.sync="dialogTableVisible">
                    <el-table :data="data1">
                        <el-table-column property="blindName" label="盲人用户" width="100"></el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="acceptBlind(scope.$index, scope.row)" type="text" size="small" v-if="!scope.row.accepted">接受</el-button>
                                <el-button disabled v-if="scope.row.accepted">已被接受</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import AMap from 'AMap'
    import AMapUI from 'AMapUI'

    export default {
        data() {
            return {
                getInstanceUrl: '/travehelper/web/api/im/getInstance',
                getInstance: {
                    appKey: '',
                    account: '',
                    token: ''
                },
                dialogTableVisible: false,
                nim: {},
                serviceName: sessionStorage.getItem('ms_username'),
                blindName: '',
                startPoiPicker: {},
                stompClient: null,
                endPoiPicker: {},
                path: null,
                locations: [],
                startLocation: "",
                endLocation: "",
                showWalk: false,
                showBus: true,
                toggleBar: false,
                map: {},
                userLocationMarker:null,
                startMarker: null,
                webrtc: {},
                callMethod: 'webrtc',
                amapManager: '',
                beCalling: false,
                // 呼叫类型
                type: null,
                // 被叫信息
                beCalledInfo: null,
                busy: false,
                zoom: 12,
                center: [121.59996, 31.197646],
                events: {
                    init: (o) => {
                        o.getCity(result => {
                            console.log(result);
                        });
                    }
                },
                searchOption: {
                    city: '上海',
                    citylimit: true
                },
                markers: [
                    [121.59996, 31.197646],
                    [121.40018, 31.197622],
                    [121.69991, 31.207649]
                ],
                mapCenter: [121.59996, 31.197646],
                plugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(o) {
                            console.log(o);
                        }
                    }
                }],
                data1: [ ],
            };
        },
        mounted() {
            this.initWebSocket()
            this.initAMap()
            this.connectSDK()
        },
        created() {


        },
        methods: {
            acceptBlind (index, row) {
                let _this = this
                this.stompClient.send("/app/service/accept", {}, JSON.stringify({
                    from: _this.serviceName,
                    to: row.blindName,
                    type: 'CUSTOM_ACCEPT'
                }));
                this.dialogTableVisible = false
                _this.deleteBlind(index, row)
            },
            deleteBlind(index, row) {
                this.data1.splice(index, 1)
            },
            initWebSocket() {
                let _this = this;
                //let socket = new SockJS('http://139.219.10.147:1234/travelhelper/webServer');
                let socket = new SockJS('/travelhelper/im/webServer');
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({
                    'username': _this.serviceName,
                    'token': _this.serviceName
                }, function success(frame) {
                    _this.stompClient.subscribe('/user/queue/blindLocation', function (msg) {
                        let locationData = JSON.parse(msg.body)
                        if (_this.userLocationMarker == null) {
                            _this.startLocation = locationData.longitude + "," + locationData.latitude
                            _this.startMarker = new AMap.Marker({
                                icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                                position: _this.startLocation.split(",")
                            });
                            _this.map.add(_this.startMarker);
                            _this.map.setFitView();
                            _this.userLocationMarker = new AMap.Marker({
                                position: _this.startLocation.split(","),
                                offset: new AMap.Pixel(-17, -15),
                                icon: './static/img/mapTarget.png', // 添加 Icon 图标 URL
                                angle: locationData.direction
                            });
                            _this.map.add(_this.userLocationMarker);
                            _this.map.setFitView();
                        } else {
                            _this.userLocationMarker.setPosition(_this.startLocation.split(","))
                            _this.userLocationMarker.setAngle(parseInt(locationData.direction))
                            _this.map.setFitView();
                        }
                    });
                    _this.stompClient.subscribe('/user/queue/service/request', function(r) {
                        let user = JSON.parse(r.body)
                        let data = {
                            blindName: user.from
                            , accepted : false
                        }
                        if (_this.busy === false) {
                            _this.dialogTableVisible = true
                            _this.data1.push(data)
                        }
                    })
                    _this.stompClient.subscribe('/user/queue/blind/busy', function(msg) {

                        let busyBlind = JSON.parse(msg.body)
                        for (let i = 0; i < _this.data1.length; i ++ ) {
                            if (_this.data1[i].blindName === busyBlind.from) {
                                _this.data1[i].accepted = true;

                                setTimeout(function () {
                                    _this.deleteBlind(i - 1, _this.data1[i])
                                },3000);
                            }
                        }
                    });
                }, function error(error) {
                    console.log(error)
                });
            },

            walking() {
                let _this = this
                if (_this.path) {
                    _this.path.clear()
                }
                _this.path = new AMap.Walking({
                    map: _this.map,
                    panel: "panel"
                });
                $("#panel").empty();
                //根据起终点坐标规划步行路线
                console.log(_this.startLocation.split(","))
                _this.path.search(_this.startLocation.split(","), _this.endLocation.split(","));
            },
            busing() {
                let _this = this
                if (_this.path) {
                    _this.path.clear()
                }
                let transOptions = {
                    city: '广州市',
                    map: _this.map,
                    panel: 'panel',
                    policy: AMap.TransferPolicy.LEAST_TIME
                };
                let startLocationArr = _this.startLocation.split(",")
                let endLocationArr = _this.endLocation.split(",")
                _this.path = new AMap.Transfer(transOptions);
                $("#panel").empty();
                _this.path.search(new AMap.LngLat(startLocationArr[0], startLocationArr[1]), new AMap.LngLat(endLocationArr[0], endLocationArr[1]));
            },
            togglePlan(type) {
                if (type) {
                    this.showBus = false
                    this.showWalk = true
                } else {
                    this.showBus = true
                    this.showWalk = false
                }

            },
            closePlanBar() {
                this.toggleBar = !this.toggleBar
            },
            initAMap() {
                let _this = this
                this.map = new AMap.Map('map', {
                    zoom: 13
                });
                AMapUI.setDomLibrary($);
                AMapUI.loadUI([
                        'misc/PoiPicker'
                    ],
                    function (PoiPicker) {
                       /* _this.startPoiPicker = new PoiPicker({
                            input: 'startPlace'
                        });
                        _this.poiPickerReady(_this.startPoiPicker, "start")*/
                        _this.endPoiPicker = new PoiPicker({
                            input: 'endPlace'
                        });
                        _this.poiPickerReady(_this.endPoiPicker, "end")
                    });

                AMap.plugin(['AMap.Transfer', 'AMap.Walking'], function () {//异步同时加载多个插件

                });
            },
            poiPickerReady(poiPicker, type) {
                let _this = this
                window.poiPicker = poiPicker;

                let marker = new AMap.Marker();

                let infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -20)
                });

                //选取了某个POI
                poiPicker.on('poiPicked', function (poiResult) {
                    let source = poiResult.source,
                        poi = poiResult.item,
                        info = {
                            source: source,
                            id: poi.id,
                            name: poi.name,
                            location: poi.location.toString(),
                            address: poi.address
                        };
                    marker.setMap(_this.map);
                    infoWindow.setMap(_this.map);
                    if ("start" == type) {
                        _this.startLocation = info.location
                        $("#startPlace").val(poi.name + "(" + poi.address + ")")
                    } else {
                        _this.endLocation = info.location
                        $("#endPlace").val(poi.name + "(" + poi.address + ")")
                    }
                    console.log(_this.locations)
                    marker.setPosition(poi.location);
                    infoWindow.setPosition(poi.location);

                    infoWindow.open(_this.map, marker.getPosition());
                });

            },
            connectSDK() {
                let that = this;
                this.$axios.get("/travelhelper/admin/private/glassesuser/im?username=" + sessionStorage.getItem('ms_username')).then((res) => {
                    let ret = res.data;
                    // 未登录，跳转登录
                    if (that.validateCode(res)) {
                        that.appKey = ret.data.appKey;
                        that.account = ret.data.account;
                        that.token = ret.data.token;
                        that.init();
                    }
                })
            },
            // 初始化SDK
            init() {
                var _this = this
                SDK.NIM.use(WebRTC)
                this.nim = SDK.NIM.getInstance({
                    appKey: _this.appKey,
                    account: _this.account,
                    token: _this.token,
                    onmsg: _this.onMsg,
                    onconnect: function () {
                        console.log("连接成功")
                        _this.initWebRtc();
                        _this.initWebRTCEvent()
                    },
                    ondisconnect: function (obj) {
                        console.log('SDK 连接断开', obj)
                    },
                    onerror: function (error) {
                        console.log('SDK 连接失败', error)
                        if (error) {
                            switch (error.code) {
                                // 账号或者密码错误, 请跳转到登录页面并提示错误
                                case 302:
                                    break;
                                // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                                case 417:
                                    break;
                                // 被踢, 请提示错误后跳转到登录页面
                                case 'kicked':
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                })
            },
            onMsg(msg) {
                console.log('收到消息', msg.scene, msg.type, msg);
                this.pushMsg(msg);
                switch (msg.type) {
                    case 'custom':
                        //onCustomMsg(msg);
                        break;
                    case 'notification':
                        // 处理群通知消息
                        onTeamNotificationMsg(msg);
                        break;
                    // 其它case
                    default:
                        break;
                }
            },
            pushMsg(msgs) {
                if (!Array.isArray(msgs)) {
                    msgs = [msgs];
                }
                let sessionId = msg[0].scene + '-' + msgs[0].account;
                data.msgs = data.msgs || {};
                data.msgs[sessionId] = this.nim.mergeMsgs(data.msgs[sessionId], msgs);
            },
            initWebRtc() {
                this.webrtc = WebRTC.getInstance({
                    nim: this.nim,
                    container: document.getElementById('media'),
                    remoteContainer: document.getElementById('media2'),
                    debug: false
                })
            },
            initWebRTCEvent() {
                let webrtc = this.webrtc;
                let _this = this;
                // 对方接受通话 或者 我方接受通话，都会触发
                webrtc.on("callAccepted", function (obj) {
                    console.log("callAccepted")

                    webrtc.startRtc().then(function () {
                        // 开启麦克风
                        return webrtc.startDevice({
                            type: Netcall.DEVICE_TYPE_AUDIO_IN
                        }).catch(function (err) {
                            console.log('启动麦克风失败')
                            console.error(err)
                        })
                    }).then(function () {
                        // 设置对方预览画面大小
                        webrtc.setVideoViewRemoteSize({
                            account: obj.account,
                            width: 660,
                            height: 660,
                            cut: true
                        })

                        webrtc.setCaptureVolume(255)

                        // 设置播放音量
                        webrtc.setPlayVolume(255)
                    }).catch(function (err) {
                        console.log('发生错误')
                        console.log(err)
                        this.webrtc.hangup()
                    })
                }.bind(this));
                webrtc.on("callRejected", function (obj) {

                }.bind(this));
                webrtc.on('signalClosed', function () {
                    console.log("signal closed");
                }.bind(this));
                webrtc.on('rtcConnectFailed', function () {
                    console.log("rtcConnectFailed");
                }.bind(this));
                webrtc.on("devices", function (obj) {
                    console.log("on devices:", obj);
                }.bind(this));
                webrtc.on("deviceStatus", function (obj) {
                    console.log("on deviceStatus:", obj);
                }.bind(this));
                webrtc.on("beCalling", function (obj) {
                    console.log('on beCalling', obj);
                    const channelId = obj.channelId;

                    this.webrtc.control({
                        channelId: channelId,
                        command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
                    });
                    // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
                    if (!this.webrtc.calling && !this.beCalling) {
                        this.type = obj.type;
                        this.beCalling = true;
                        this.beCalledInfo = obj;
                        console.log("接收视频请求")

                    } else {
                        if (this.webrtc.calling) {
                            this.busy = this.webrtc.notCurrentChannelId(obj);
                        } else if (this.beCalling) {
                            this.busy = beCalledInfo.channelId !== channelId;
                        }
                        if (this.busy) {
                            this.webrtc.control({
                                channelId: channelId,
                                command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
                            });
                            // 拒绝通话
                            this.webrtc.response({
                                accepted: false,
                                beCalledInfo: obj
                            });
                        }
                    }
                    // 被叫回应主叫自己已经收到了通话请求
                    let sessionConfig = {
                        videoQuality: Netcall.CHAT_VIDEO_QUALITY_480P,
                        videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
                        videoBitrate: 0,
                        recordVideo: false,
                        recordAudio: false,
                        highAudio: false
                    };
                    this.webrtc.response({
                        accepted: true,
                        beCalledInfo: this.beCalledInfo,
                        sessionConfig: sessionConfig
                    }).catch(function (err) {
                        reject();
                        console.log('接听失败', err);
                    });

                }.bind(this));
                webrtc.on("control", function (obj) {
                }.bind(this));
                webrtc.on("hangup", function (obj) {
                    this.beCalling = false
                    this.beCalledInfo = null
                    this.busy = false
                    this.userLocationMarker = null
                    /**
                     * 将客服状态改为空闲
                     */
                    this.map.remove(this.startMarker);
                    this.startMarker = null;
                    this.freeCustom()

                }.bind(this));
                webrtc.on("heartBeatError", function (obj) {
                    console.log("heartBeatError,要重建信令啦");
                }.bind(this));
                webrtc.on("callerAckSync", function (obj) {
                }.bind(this));
                webrtc.on("netStatus", function (obj) {
                    console.log("on net status:", obj);
                }.bind(this));
                webrtc.on("statistics", function (obj) {
                    console.log("on statistics:", obj);
                }.bind(this));
                webrtc.on("audioVolume", function (obj) {

                }.bind(this));
                webrtc.on('joinChannel', function (obj) {
                    console.log('user join', obj)
                }.bind(this))
                webrtc.on('remoteTrack', function (obj) {
                    console.log('user join', obj)
                    // 播放对方声音
                    this.webrtc.startDevice({
                        type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
                    }).catch(function (err) {
                        console.log('播放对方的声音失败')
                        console.error(err)
                    })
                    // 预览对方视频画面
                    this.webrtc.startRemoteStream({
                        account: obj.account,
                        node: document.getElementById('media')
                    })
                    // 设置对方预览画面大小
                    this.webrtc.setVideoViewRemoteSize({
                        account: obj.account,
                        width: 660,
                        height: 660,
                        cut: true
                    })
                }.bind(this))
                webrtc.on('leaveChannel', function (obj) {
                    console.log('leaveChannel', obj)
                }.bind(this))
            }

            , onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let {lng, lat} = poi;
                        lngSum += lng;
                        latSum += lat;
                        this.markers.push([poi.lng, poi.lat]);
                    });
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.mapCenter = [center.lng, center.lat];
                }
            }
            , freeCustom() {
                let that = this;
                this.$axios.post("/travelhelper/admin/private/glassesuser/custom/free").then((res) => {

                })
            }
            , restLocation() {
                this.map.remove(this.startMarker);
                this.startMarker = null;
                this.userLocationMarker = null;
            }
        }
    };
</script>

<style scoped>

</style>

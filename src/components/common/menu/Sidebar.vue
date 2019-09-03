<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"  :collapse="collapse" background-color="#0F5499"
            text-color="#fff" active-text-color="#f0f" unique-opened router>
            <template v-for="item in menu.MENU">
                <template v-if="item.children">
                    <el-submenu class="s3" :index="item.url" :key="item.url">
                        <template class="s2" slot="title">
                            <i :class="item.icon" class="menuIcon"></i><span  slot="title">{{ item.name }}</span>
                        </template>
                        <template  class="s2" v-for="subItem in item.children">
                            <el-submenu  v-if="subItem.children" :index="subItem.url" :key="subItem.url">
                                <template class="s1" slot="title">{{ subItem.name }}</template>
                                <el-menu-item class="s1"  v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item class="s2" v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item class="s3" :index="item.url" :key="item.url">
                        <i class="menuIcon" :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                menu: {
                    MENU: [{
                            name: "概况",
                            icon: "el-icon-set-up",
                            url: "/stap/dashboard",
                        },{
                            name: "安全事件中心",
                            icon: "el-icon-set-up",
                            url: "securityEventCenter",
                            children: [{
                                    name: "高危攻击事件",
                                    url: "/stap/securityEventCenter/highAttackEvent"
                                },
                                {
                                    name: "僵木蠕事件",
                                    url: "/stap/securityEventCenter/rigidCreepEvent"
                                },
                                {
                                    name: "网页篡改事件",
                                    url: "/stap/securityEventCenter/pageTamperingEvent"
                                },
                                {
                                    name: "暴力破解事件",
                                    url: "/stap/securityEventCenter/bruteForceEvent"
                                },
                                {
                                    name: "拒绝服务攻击事件",
                                    url: "/stap/securityEventCenter/denialServiceEvent"
                                },
                                {
                                    name: "异常访问",
                                    url: "/stap/securityEventCenter/exceptionAccess"
                                },
                                {
                                    name: "高危漏洞",
                                    url: "/stap/securityEventCenter/highVul"
                                }
                            ]
                        },
                        {
                            name: "威胁分析中心",
                            icon: "el-icon-cpu",
                            url: "threatAnalysisCenter",
                            children: [{
                                    name: "内部威胁分析",
                                    url: "/stap/threatAnalysisCenter/insideThreatAnalysis"
                                },
                                {
                                    name: "外连威胁分析",
                                    url: "/stap/threatAnalysisCenter/contingentThreatAnalysis"
                                },
                                {
                                    name: "外部威胁分析",
                                    url: "/stap/threatAnalysisCenter/externalThreatAnalysis"
                                }
                            ]
                        },
                        {
                            name: "流量分析中心",
                            icon: "el-icon-orange",
                            url: "flowAnalysisCenter",
                            children: [{
                                    name: "内部流量分析",
                                    url: "/stap/flowAnalysisCenter/insideFlowAnalysis"
                                },
                                {
                                    name: "外连流量分析",
                                    url: "/stap/flowAnalysisCenter/contingentFlowAnalysis"
                                },
                                {
                                    name: "外部流量分析",
                                    url: "/stap/flowAnalysisCenter/externalFlowAnalysis"
                                },
                                {
                                    name: "违规访问分析",
                                    icon: "",
                                    url: "voilatoryVisitsAnalysis",

                                    children: [{
                                            name: "违规访问",
                                            url: "/stap/flowAnalysisCenter/voilatoryVisitsAnalysis/voilatoryVisits"
                                        },
                                        {
                                            name: "违规访问模型",
                                            url: "/stap/flowAnalysisCenter/voilatoryVisitsAnalysis/voilatoryVisitsModel"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "脆弱性分析中心",
                            icon: "el-icon-pear",
                            url: "vulnerabilityAnalysisCenter",
                            children: [{
                                name: "整体脆弱性分析",
                                url: "/stap/vulnerabilityAnalysisCenter/overallVulnerabilityAnalysis"
                            }]
                        }, {
                            name: "威胁情报中心",
                            icon: "el-icon-key",
                            url: "threatIntelligenceCenter",
                            children: [{
                                name: "威胁情报",
                                url: "/stap/threatIntelligenceCenter/threatIntelligence"
                            }, {
                                name: "黑客档案",
                                url: "/stap/threatIntelligenceCenter/hackerArchives"
                            }]
                        }, {
                            name: "资产监控中心",
                            icon: "el-icon-aim",
                            url: "assetMonitorCenter",
                            children: [{
                                name: "风险监控概览",
                                url: "/stap/assetMonitorCenter/riskMonitorOverview"
                            }, {
                                name: "资产管理",
                                url: "/stap/assetMonitorCenter/assetManage"
                            }, {
                                name: "机构标签管理",
                                url: "/stap/assetMonitorCenter/institutionalLabelManage"
                            }]
                        }, {
                            name: "安全报表中心",
                            icon: "el-icon-watch-1",
                            url: "securityReportCenter",
                            children: [{
                                name: "报表模板管理",
                                url: "/stap/securityReportCenter/reportTemplateManage"
                            }, {
                                name: "报表订阅管理",
                                url: "/stap/securityReportCenter/reportSubscriptionManage"
                            }, {
                                name: "历史报表",
                                url: "/stap/securityReportCenter/reportHistory"
                            }]
                        }, {
                            name: "日志中心",
                            icon: "el-icon-collection",
                            url: "logCenter",
                            children: [{
                                name: "安全日志",
                                url: "/stap/logCenter/securityLog"
                            }, {
                                name: "联动处置日志",
                                url: "/stap/logCenter/linkageLog"
                            }, {
                                name: "SIEM日志",
                                icon: "",
                                url: "siemLog",

                                children: [{
                                    name: "事件告警",
                                    url: "/stap/logCenter/siemLog/eventAlarm"
                                }, {
                                    name: "关联规则",
                                    url: "/stap/logCenter/siemLog/associationRules"
                                }, {
                                    name: "日志告警",
                                    url: "/stap/logCenter/siemLog/logAlarm"
                                }, {
                                    name: "第三方日志",
                                    url: "/stap/logCenter/siemLog/thirdPartyLog"
                                }, {
                                    name: "采集器管理",
                                    url: "/stap/logCenter/siemLog/collectorManage"
                                }, ]
                            }]
                        }, {
                            name: "系统管理",
                            icon: "el-icon-s-tools",
                            url: "systemManage",
                            children: [{
                                    name: "用户管理",
                                    url: "/stap/systemManage/userManage"
                                },
                                {
                                    name: "角色管理",
                                    url: "/stap/systemManage/ruleManage"
                                },
                                {
                                    name: "告警管理",
                                    url: "/stap/systemManage/alarmManage"
                                }, {
                                    name: "探针管理",
                                    url: "/stap/systemManage/sensorManage"
                                }, {
                                    name: "系统日志",
                                    url: "/stap/systemManage/systemLog"
                                }, {
                                    name: "信任列表",
                                    url: "/stap/systemManage/trustList"
                                }, {
                                    name: "系统设置",
                                    icon: "",
                                    url: "systemConfig",
                        
                                    children: [{
                                        name: "平台管理",
                                        url: "/stap/systemManage/systemConfig/platformManagement"
                                    }, {
                                        name: "平台级联",
                                        url: "/stap/systemManage/systemConfig/platformCascade"
                                    }, {
                                        name: "路由管理",
                                        url: "/stap/systemManage/systemConfig/routManagement"
                                    }, {
                                        name: "接口管理",
                                        url: "/stap/systemManage/systemConfig/interfaceManagement"
                                    }, {
                                        name: "日志设置",
                                        url: "/stap/systemManage/systemConfig/logSetting"
                                    }, ]
                                }, {
                                    name: "系统更新",
                                    icon: "",
                                    url: "systemUpdate",
                                    
                                    children: [{
                                        name: "平台升级",
                                        url: "/stap/systemManage/systemUpdate/platformUpgrade"
                                    }, {
                                        name: "探针版本",
                                        url: "/stap/systemManage/systemUpdate/probeVersion"
                                    }, {
                                        name: "库升级",
                                        url: "/stap/systemManage/systemUpdate/libraryUpgrade"
                                    }]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        computed: {
            // onRoutes() {
            //     return this.$route.path.replace('/', '');
            // }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style >
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
}

.sidebar {
     display: block;
     position: absolute;
     left: 0;
     top: 2rem;
     bottom: 0;
     overflow-y: scroll;
}
.menuIcon{
    position:absolute;
    top: 0.7rem;
    left: 0.2rem;
}

.el-menu .el-menu-item{
    height: 2.08rem;
    line-height: 2.08rem;
    font-size:0.58rem;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    padding:0 1.875rem;
    min-width: 8.33rem;
    padding-left:1.666rem;
 }
.el-submenu .el-submenu__title{
    font-family:MicrosoftYaHei;
    font-weight:400;
    font-size:0.58rem;
    padding:0 0.83rem;
    height: 2.08rem;
    line-height: 2.08rem;
    width: 9rem;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {

}
.sidebar .el-menu--collapse{
    width:9rem
}
body>.el-menu--vertical{
    top: 34px;
    left: 2rem !important;
}
.el-menu--collapse>li>div>i{
    position: absolute;
    top: 0.5rem;
    left: 0.4rem;
    font-size: 1.1rem;

}
.el-menu--collapse>li>div:hover>i{
    color:#fff;
}
.s1{
    background-color:#1C4571 !important;
}    
.s1:hover{
    background-color:rgb(12,67,122) !important
}    
.s2:hover{
    background-color:rgb(12,67,122)  !important
}
.s2{
    background-color:#1C4590 !important
}
.s3 ul .el-submenu__title {
    background-color:#1C4590 !important
}
.s3>.el-menu>.s2{
height: 2.08rem;
width:9rem;
line-height: 2.08rem;
    padding: 0 45px;
    min-width: 0;
}
.s3 .el-menu .s1{
    height: 2.08rem;
    width: 9rem;
    line-height: 2.08rem;
    padding: 0 45px;
    min-width: 0;
}
.sidebar>ul {
    height: 100%;
}
</style>
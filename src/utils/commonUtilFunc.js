/*@通用-通用函数*/
import CryptoJs from 'crypto-js';
import * as qs from 'qs'
import React from "react";

let validateIp = (rule, value, callback) => {
    var arr = value ? value.split(",") : []
        , regExp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
    var flag4 = value === 'any';
    for (var i = 0, len1 = arr.length; i < len1; i++) {
        var flag1 = false, flag2 = false, flag3 = false;

        var ipStr = arr[i]
            , ipStr1 = (ipStr.indexOf("/") !== -1)
            , ipStr2 = (ipStr.indexOf("-") !== -1);
        if (regExp.test(ipStr)) {
            flag1 = !flag1;
        }
        if (ipStr1) {
            var ipSeg = ipStr.split("/"), regNum = /^[0-9]$|^[1,2]\d$|^3[0-2]$/;
            if (regExp.test(ipSeg[0]) && regNum.test(ipSeg[1])) {
                flag2 = !flag2;
            }
        }
        if (ipStr2) {
            var ipRange = ipStr.split("-"),
                ip1 = ipRange[0],
                ip2 = ipRange[1],
                temp1 = ip1.split("."),
                temp2 = ip2.split("."),
                temp3 = false;
            for (var j = 0; j < 4; j++) {
                var num1 = +temp1[j], num2 = +temp2[j];
                if (num1 < num2) {
                    temp3 = true;
                    break;
                } else if (num1 > num2) {
                    temp3 = false;
                    break;
                }
            }
            if (regExp.test(ip1) && regExp.test(ip2) && temp3) {
                flag3 = !flag3;
            }
        }
        if (!flag1 && !flag2 && !flag3 && !flag4) {
            return callback("@用 1.1.1.1-1.1.1.10,1.1.1.0/24,1.1.1.1 的格式输入")
        }
    }
    return callback();
};

/**
 * 端口字段校验函数
 **/
let validatePort = (rule, value, callback) => {
    var temp, arr = value ? value.split(",") : [],
        regExp = /0|(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/;
    var flag4 = value === 'any';
    for (var i = 0, len = arr.length; i < len; i++) {
        var portI = arr[i]
            , portTrue = (portI.indexOf("-") !== -1);
        temp = false;
        if (portTrue) {
            var port1 = portI.split("-"), port11 = +port1[0], port12 = +port1[1];
            if (regExp.test(port11) && regExp.test(port12) && port11 < port12) {
                temp = !temp
            }
        } else {
            if (regExp.test(portI)) {
                temp = !temp
            }
        }
        if (!temp && !flag4) {
            return callback("@端口范围0-65535")
        }
    }
    return callback();
};

/**
 * 数字千分逗号处理函数
 **/

function addComma(val) {
    //根据`.`作为分隔，将val值转换成一个数组
    let aIntNum = val.toString().split('.');
    // 整数部分
    let iIntPart = aIntNum[0];
    // 小数部分（传的值有小数情况之下）
    let iFlootPart = aIntNum.length > 1 ? '.' + aIntNum[1] : '';
    let rgx = /(\d+)(\d{3})/;
    // 如果整数部分位数大于或等于5
    if (iIntPart.length >= 5) {
        // 根据正则要求，将整数部分用逗号每三位分隔
        while (rgx.test(iIntPart)) {
            iIntPart = iIntPart.replace(rgx, '$1,$2');
        }
    }
    return iIntPart + iFlootPart;
}

/**
 * 在有源IP,目标IP批量输入的页面中,对后台返回数据处理函数
 **/
let initBackDataProcess = function (backData) {
    if (backData.result.length > 0) {
        for (let key in backData.result) {
            if (backData.result[key].dst_ip_group.length > 0) {
                backData.result[key].dstIpType = "2"
            } else {
                backData.result[key].dstIpType = "1"
            }
            if (backData.result[key].src_ip_group.length > 0) {
                backData.result[key].srcIpType = "2"
            } else {
                backData.result[key].srcIpType = "1"
            }
            if (backData.result[key].dst_port_group.length > 0) {
                backData.result[key].dstPortType = "2"
            } else {
                backData.result[key].dstPortType = "1"
            }
            if (backData.result[key].src_port_group.length > 0) {
                backData.result[key].srcPortType = "2"
            } else {
                backData.result[key].srcPortType = "1"
            }
            if (backData.result[key].protocol === "IP" || backData.result[key].protocol === "ICMP") {
                backData.result[key].hasPort = "0"
            } else {
                backData.result[key].hasPort = "1"
            }
        }
    }
    return backData;
};

/*自定义应用程序页面处理*/
let initBackDataProcessDpi = function (backData) {
    if (backData.result.length > 0) {
        for (let key in backData.result) {
            if (backData.result[key].protocol === "IP" || backData.result[key].protocol === "ICMP") {
                backData.result[key].hasPort = "0"
            } else {
                backData.result[key].hasPort = "1"
            }
        }
    }
    return backData;
};

/*密码加密*/
const key = "sd-wan@supercxp.";

function _crypto(msg) {
    return CryptoJs.AES.encrypt(msg, key).toString();
}

function MomentFormatter(moment, formatter) {
    return moment.format(formatter || "YYYY-MM-DD HH:mm:ss")
}

//解析url query string
function parse(str) {
    return qs.parse(str.slice(1))
}

//针对STEP,CSTEP设备类型做字符转换
function deviceTypeMap(type) {
    const deviceTypeMap = {
        STEP: "BCPE",
        CSTEP: "HCPE",
        AP: "AP"
    };
    return deviceTypeMap[type] || type
}

function deviceTypeMapReverse(type) {
    const deviceTypeMap = {
        BCPE: "STEP",
        HCPE: "CSTEP",
        AP: "AP"
    };
    return deviceTypeMap[type] || type
}

function statusMap(status) {
    switch (status) {
        case "INIT":
            return <span style={{color: "#FFD02D"}}>@未激活</span>
        case "ONLINE":
            return <span style={{color: "#0EC80E"}}>@在线</span>
        case "OFFLINE":
            return <span style={{color: "#ff0002"}}>@离线</span>
        default:
            return status;
    }
}


function roleMap(role) {
    const roleMap = {
        company: "@企业管理员",
        companystaff: "@普通用户",
        supercxpbusiness: "@商务",
        supercxptechnology: "@运维",
        supercxptechsupport: "@技术支持",
        supercxpbizadmin: "@商务主管",
        supercxptechadmin: "@技术支持主管",
        supercxpadmin: "@管理员",
    };
    return roleMap[role] || role
}

function localeMap(role) {
    const roleMap = {
        "zh-TW": "繁體中文",
        "zh-CN": "简体中文",
        "en-US": "English"
    };
    return roleMap[role] || role
}

function commonTranslate(component) {
    return (message, originNm) => {
        try {
            return component.props.intl.formatMessage(message)
        } catch (err) {
            return originNm
        }
    };
}

function emptyFunction() {
}

function mainBackupMap(type) {
    const mainBackupMap = {
        None: "@无",
        edge_main: "@边缘主",
        edge_backup: "@边缘备",
        center_main: "@中心主",
        center_backup: "@中心备",
        "center_main,edge_main": "@中心主，边缘主",
        "center_main,edge_backup": "@中心主，边缘备",
        "center_backup,edge_main": "@中心备，边缘主",
        "center_backup,edge_backup": "@中心备，边缘备",
    };
    return mainBackupMap[type] || type
}

const viewChinese = {
    "删除FullMesh链路": "@删除FullMesh链路",
    "修改节点": "@修改节点",
    "创建节点": "@创建节点",
    "删除CPE型号": "@删除CPE型号",
    "删除4G信息": "@删除4G信息",
    "修改账号": "@修改账号",
    "创建运营商": "@创建运营商",
    "创建链路": "@创建链路",
    "创建大区": "@创建大区",
    "删除节点组": "@删除节点组",
    "删除运营商": "@删除运营商",
    "修改链路": "@修改链路",
    "删除合同": "@删除合同",
    "删除docker isp": "@删除docker isp",
    "修改docker isp": "@修改docker isp",
    "修改docker物理主机": "@修改docker物理主机",
    "删除大区": "@删除大区",
    "创建FullMesh链路": "@创建FullMesh链路",
    "删除企业黑名单": "@删除企业黑名单",
    "新增部门": "@新增部门",
    "迁移设备": "@迁移设备",
    "批量启用/禁用安全配置": "@批量启用/禁用安全配置",
    "修改ssid模板": "@修改ssid模板",
    "修改区域": "@修改区域",
    "启用/禁用账号": "@启用/禁用账号",
    "修改4G信息": "@修改4G信息",
    "删除docker物理主机": "@删除docker物理主机",
    "创建端口组": "@创建端口组",
    "删除ssid模板": "@删除ssid模板",
    "删除QoS配置": "@删除QoS配置",
    "创建安全配置": "@创建安全配置",
    "创建CPE型号": "@创建CPE型号",
    "新增库存": "@新增库存",
    "删除账期": "@删除账期",
    "修改库存": "@修改库存",
    "修改BGP": "@修改BGP",
    "删除安全配置": "@删除安全配置",
    "创建企业": "@创建企业",
    "删除白名单": "@删除白名单",
    "创建合同": "@创建合同",
    "个性化配置wifi": "@个性化配置wifi",
    "删除部门": "@删除部门",
    "登录": "@登录",
    "添加ssid模板分配": "@添加ssid模板分配",
    "创建账号": "@创建账号",
    "删除自定义应用": "@删除自定义应用",
    "创建平台自定义应用": "@创建平台自定义应用",
    "删除机房isp": "@删除机房isp",
    "修改IP段": "@修改IP段",
    "删除黑名单": "@删除黑名单",
    "修改IP组": "@修改IP组",
    "修改密码": "@修改密码",
    "批量启用/禁用QoS配置": "@批量启用/禁用QoS配置",
    "新增docker物理主机": "@新增docker物理主机",
    "注销": "@注销",
    "修改设备": "@修改设备",
    "创建IP组": "@创建IP组",
    "创建4G信息": "@创建4G信息",
    "创建机房": "@创建机房",
    "创建节点组": "@创建节点组",
    "更新FullMesh链路": "@更新FullMesh链路",
    "删除ssid模板分配": "@删除ssid模板分配",
    "新增设备": "@新增设备",
    "删除端口组": "@删除端口组",
    "删除库存": "@删除库存",
    "出库": "@出库",
    "删除区域": "@删除区域",
    "删除链路": "@删除链路",
    "删除企业联系人": "@删除企业联系人",
    "创建黑名单": "@创建黑名单",
    "修改CPE型号": "@修改CPE型号",
    "修改root密码": "@修改root密码",
    "批量修改链路": "@批量修改链路",
    "新增docker isp": "@新增docker isp",
    "创建ssid模板": "@创建ssid模板",
    "修改BGP地址段": "@修改BGP地址段",
    "删除机房": "@删除机房",
    "修改机房isp": "@修改机房isp",
    "修改机房": "@修改机房",
    "更新QoS配置": "@更新QoS配置",
    "修改节点组": "@修改节点组",
    "删除节点": "@删除节点",
    "更新大区": "@更新大区",
    "批量预订库存": "@批量预订库存",
    "更新ssid模板分配": "@更新ssid模板分配",
    "修改合同": "@修改合同",
    "删除/回收设备": "@删除/回收设备",
    "更新去重规则": "@更新去重规则",
    "修改lte应用级别": "@修改lte应用级别",
    "删除IP组": "@删除IP组",
    "修改端口组": "@修改端口组",
    "新增区域": "@新增区域",
    "创建企业联系人": "@创建企业联系人",
    "设备交换": "@设备交换",
    "删除IP段": "@删除IP段",
    "创建IP段": "@创建IP段",
    "删除账号": "@删除账号",
    "创建账期": "@创建账期",
    "修改部门": "@修改部门",
    "修改自定义应用": "@修改自定义应用",
    "启用/禁用智能压缩": "@启用/禁用智能压缩",
    "修改企业信息": "@修改企业信息",
    "修改安全配置": "@修改安全配置",
    "新增机房isp": "@新增机房isp",
    "修改账期": "@修改账期",
    "创建QoS配置": "@创建QoS配置",
    "修改企业联系人": "@修改企业联系人",
    "创建企业黑名单": "@创建企业黑名单",
    "修改运营商": "@修改运营商",
    "重置密码": "@重置密码",
    "删除企业": "@删除企业",
    "创建白名单": "@创建白名单"
};

function viewChineseMap(value){
    return viewChinese[value]||""
}

export {
    viewChineseMap,
    mainBackupMap,
    emptyFunction,
    localeMap,
    roleMap,
    deviceTypeMapReverse,
    deviceTypeMap,
    _crypto,
    validateIp,
    validatePort,
    addComma,
    initBackDataProcess,
    initBackDataProcessDpi,
    MomentFormatter,
    parse,
    commonTranslate,
    statusMap
}


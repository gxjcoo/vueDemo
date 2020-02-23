/*@通用组件-请求返回*/
import {Modal, Spin, Alert} from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import {domain} from './commonConsts';
import Cookies from 'js-cookie'
const weburl = domain;
let ref = true;
let hasAlreadyAlert=false;
export default {
    convertObjToQueryString: function (obj:object) {
        let paramStr = '';
        for (let name in obj) {
            paramStr += (name + '=' + encodeURIComponent(obj[name]) + '&');
        }
        if (paramStr[paramStr.length - 1] === '&')
            return paramStr.slice(0, paramStr.length - 1);
        else
            return paramStr;
    },
    get: function (originUrl:string, data:object) {
        let url = weburl + originUrl;
        let queryString = this.convertObjToQueryString(data);

        if (url.indexOf('?') !== -1) url = url + '&' + queryString;
        else url += ('?' + queryString);

        return fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'contentType': "application/x-www-form-urlencoded; charset=utf-8",
            },
        })
    },
    getJSON: function (originUrl:string, data:object, ifLoading?:boolean, loadingText?:string):any {
        let div = document.createElement('div');
        if (ifLoading) {
            document.body.appendChild(div);
            ReactDOM.render(<div style={{
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                zIndex: 9999,
                backgroundColor: "rgba(0,0,0,0.15)",
                position: "fixed",
                left: 0,
                top: 0
            }}>
                <div style={{position: "absolute", top: 10, left: "45%", zIndex: 9999, width: 300}}>
                    <Spin size="large">
                        <Alert
                            message={<span
                                style={{marginLeft: 16}} className="loading-text">{loadingText || "@数据加载中"}
                                </span>} showIcon={true}
                        />
                    </Spin>
                </div>
            </div>, div);//加载进度
        }
        return this.get(originUrl, data).then(function (res) {
            ReactDOM.unmountComponentAtNode(div);
            if (res.redirected&&!hasAlreadyAlert) {
                Modal.error({
                    title: '@登录超时',
                    content: '@登录超时,3秒后将自动退回登录界面'
                });
                hasAlreadyAlert=true;
                setTimeout(()=>{
                    window.location.href = domain;
                    hasAlreadyAlert=false
                },3000)
            }else{
                return res.json();
            }
        }).catch((err) => {
            console.log(err)
            /*Modal.error({
                title: '系统异常',
                content: '系统出现异常，将返回到登录页面进行重新登录操作，如果仍然存在异常，请联系管理员解决。',
                onOk() {
                    ref = true;
                    window.location.href = domain;
                },
            });*/
        })
    },
    formPost: function (url:string, data:FormData) {
        return fetch(weburl + url, {
            method: 'POST',
            headers: {
                /*'Accept': 'application/json',
                'Content-Type': 'application/json'*/
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            credentials: 'include',
            body: data
        }).then(function (res) {
            if (res.status === 500) {
                if (ref) {
                    ref = false;
                    Modal.error({
                        title: '@系统异常',
                        content: '@系统出现异常，将返回到登录页面进行重新登录操作，如果仍然存在异常，请联系管理员解决。',
                        onOk() {
                            ref = true;
                        },
                    });
                }
            } else {
                return res.json();
            }
        }).catch(error => {
            if (error === "TypeError: Failed to fetch") {
                if (ref) {
                    ref = false;
                    Modal.error({
                        title: '@系统异常',
                        content: '@系统出现异常，将返回到登录页面进行重新登录操作，如果仍然存在异常，请联系管理员解决。',
                        onOk() {
                            ref = true;
                            window.location.href = domain + "/index." + window.appLocale.locale + ".html";
                        },
                    });
                }
            }
        });
    },
    post: function (url:string, data:object, mock?:boolean, loadingText?:string, ifLoading?:boolean) {
        let fullUrl =  weburl + url;
        let div = document.createElement('div');
        if (ifLoading) {
            document.body.appendChild(div);
            ReactDOM.render(<div style={{
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                zIndex: 9999,
                backgroundColor: "rgba(0,0,0,0.15)",
                position: "fixed",
                left: 0,
                top: 0
            }}>
                <div style={{position: "absolute", top: 10, left: "45%", zIndex: 9999, width: 350}}>
                    <Spin size="large">
                        <Alert
                            message={<span
                                style={{marginLeft: 16}} className="loading-text">{loadingText || "数据加载中"}
                                </span>} showIcon={true}
                        />
                    </Spin>
                </div>
            </div>, div);//加载进度
        }
        return fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res => {
            ReactDOM.unmountComponentAtNode(div);
            if (res.redirected&&!hasAlreadyAlert) {
                Modal.error({
                    title: '登录超时',
                    content: '登录超时,3秒后将自动退回登录界面'
                });
                hasAlreadyAlert=true;
                setTimeout(()=>{
                    window.location.href = domain;
                    hasAlreadyAlert=false
                },3000)
            }else{
                return res.json();
            }
        }).catch((err) => {
            /*Modal.error({
                title: '网络异常',
                content: '系统出现异常，将返回到登录页面进行重新登录操作，如果仍然存在异常，请联系管理员解决。',
                onOk() {
                    ref = true;
                    window.location.href = domain + "/index." + window.appLocale.locale + ".html";
                },
            });*/
        });
    }
}

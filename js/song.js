//通用配置服务器URL
//var serverurl = "http://yun.xrhyun.com";
//var serverurlnew = "http://yun.xrhyun.com";
var serverurl = "http://xrh.yuanfangyun.com/";
var serverurlnew = "http://xrh.yuanfangyun.com/";

var appid = "wx3b54ec901b96d83a";

 
 
 
 
 

//获取url当前传递参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//两端去空格函数
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//显示换行字符
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
//跳转其他页面
function gotoUrl(url) {
    window.location.href = url;
}

//常用正则汇总
function CheckFormat(value, type) {
    var err = "";
    var reg;
    switch (type) {
        case 'phone':
            reg = /^1[3-5-7-8]\d{9}$/;
            err = "手机号码格式填写错误";
            break;
    }
    if (!reg.test(value)) {
        alert(err);
        return true;
    } else {
        return false;
    }
}

//首页导航页面切换
// mui('.mui-bar').on('tap', 'a', function () {
//     var tourl = this.href;
//     showLoading();
//     gotoUrl(tourl);
// })

//获取验证码逻辑
function GetPhoneCode(TelNum, obj) {
    //console.info(TelNum + " " + serverurl);
    //本地测试使用
    settime(obj);
    obj.setAttribute("data-value", "1234");
    mui.ajax({
        url: "/api/CommonApi/SendMessage?phoneNumber=" + TelNum,
        type: "POST",
        dataType: "json",
        beforeSend: function () {
            Setdisabled(obj, true, '正在发送');
        },
        success: function (data) {
            //console.info(JSON.stringify(data));
            if (data.Status == true) {
                obj.setAttribute("data-value", data.Result);
                settime(obj);
                mui.toast("验证码发送成功");
                return;
            }
            mui.toast('发送失败请再次点击获取');
            return;
        },
        error: function () {
            Setdisabled(obj, false, '重新发送');
            mui.toast('你的手机好像没有联网哦');
            return;
        }
    });
}


//获取验证码逻辑
function InsertShareInfo(sharemondel) {
    mui.ajax({
        url: "/api/KnowledgeApi/EditShareTotal",
        type: "POST",
        dataType: "json",
        data: sharemondel,
        beforeSend: function () {
            Setdisabled(obj, true, '正在发送');
        },
        success: function (data) {
            if (data.Status == true) {
                obj.setAttribute("data-value", data.Result);
                settime(obj);
                mui.toast("分享记录成功！");
                return;
            }
            mui.toast('分享记录失败！');
            return;
        },
        error: function () {
            Setdisabled(obj, false, '重新发送');
            mui.toast('你的手机好像没有联网哦');
            return;
        }
    });
}


//倒计时60s可继续发送验证码
var countdown = 30;

function settime(obj) {
    if (countdown == 0) {
        obj.disabled = false;
        obj.innerText = "获取短信验证码";
        countdown = 30;
        clearTimeout();
    } else {
        obj.disabled = true;
        obj.innerText = "重新发送(" + countdown + ")";
        countdown--;
        setTimeout(function () {
            settime(obj)
        }, 1000);
    }
}

//表单提交时统一禁用按钮
function Setdisabled(obj, type, note) {
    obj.disabled = type;
    obj.innerText = note;
}

//获取系统版本
function GetSysVer() {
    var ver = "";
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        ver = 'android_web_';
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
        ver = 'ios_web_';
    } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
        ver = 'wp_web_';
    } else {
        ver = 'xx_web_';
    }
    return ver;
}

//加载动画显示
function showLoading() {
    var loading = document.getElementById("weui_loading");
    if (loading) {
        loading.style.display = "block";
    } else {
        var newloading = document.createElement('div');
        newloading.className = "weui_toast";
        newloading.id = "weui_loading";
        newloading.innerHTML = "<div class=\"spinner\"><div class=\"rect1\"><\/div><div class=\"rect2\"><\/div><div class=\"rect3\"><\/div><div class=\"rect4\"><\/div><div class=\"rect5\"><\/div><\/div><p class=\"weui_toast_content\">请稍后…<\/p>";
        document.body.appendChild(newloading);
    }
}
//加载动画隐藏
function hideLoading() {
    var loading = document.getElementById("weui_loading");
    if (loading) {
        loading.style.display = "none";
    }
}

//手机号/身份证号正则验证
// 验证手机号
function isPhoneNo(phone) {
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test(phone);
}

// 验证身份证 
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}
// 验证正整数-付款价格等
function isPrice(price) {
    var pattern = /^(\d*\.\d{0,2}|\d+).*$/;
    return pattern.test(price);
}
//计算年龄
function ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return (Y - r[1]);
    }
    return ("输入的日期格式错误！");

}
//初始化当前弹出框和时间控件操作
var menuWrapper = document.getElementById("menu-wrapper");
var menu = document.getElementById("menu");
var backdrop = document.getElementById("menu-backdrop");
if (backdrop) {
    backdrop.addEventListener('tap', hideItem);
}
mui("#menu").on("tap", ".closeItem", function () {
    hideItem();
}, false)
function showItem(btnType) {
    mui(".actionItem").each(function (index, item) {
        if (item.classList.contains('show')) {
            item.className = "actionItem";
        }
    });
    document.getElementById(btnType).className = "actionItem show";
    document.body.classList.add('menu-open');
    menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
    menu.className = 'menu bounce-in-down animated';
    backdrop.style.opacity = 1;
}

function hideItem() {
    document.body.classList.remove('menu-open');
    menuWrapper.className = 'menu-wrapper fade-out-up animated';
    menu.className = 'menu bounce-out-up animated';
    setTimeout(function () {
        mui(".mui-backdrop").hidden;
        backdrop.style.opacity = 0;
        menuWrapper.classList.add('hidden');
    }, 500);
}
//控制页面搜索框弹出效果汇总-结束

//初始化页面所有图片位置
function initImgView(obj, url, id) {
    var xx = 0;
    var width = obj.offsetWidth;
    var scale = 0;
    var image = new Image();
    image.src = url;
    //image.onerror = function () {
    //    obj.innerHTML = "<img src=\"/Themes/wechat/img/iconfont-tianjia.png\" alt=\"\" title=\"\" data-id=\"" + id + "\" style=\"width:100%;height:100%;\" />";
    //}
    image.onload = function () {
        scale = Number(image.width / image.height);

        if (scale >= 1) {
            this.style.height = (width - 1) + "px";
            var xx = Number((width - width * scale) / 2) + "px";
            obj.innerHTML = "<img src=\"" + url + "\" alt=\"\" title=\"\" data-id=\"" + id + "\" style=\"height:" + width + "px;left:" + xx + "\" onerror=\"this.src = '/Themes/default/home/images/nophoto.gif'\" />";
        }
        if (scale < 1) {
            var xx = Number((width - width / scale) / 2) + "px";
            obj.innerHTML = "<img src=\"" + url + "\" alt=\"\" title=\"\" data-id=\"" + id + "\" style=\"width:" + width + "px;top:" + xx + "\" onerror=\"this.src = '/Themes/default/home/images/nophoto.gif'\" />";
        }
    }
}

//字典表归类大汇总
//----------------------------------------------------------------------------------------------------------------------------------------------
//获取跟踪状态记录
function getServiceType(Type) {
    var TypeNote = "";
    switch (Type) {
        case 'yuesao': TypeNote = "月嫂"; break;
        case 'yuying': TypeNote = "育婴"; break;
        case 'baomu': TypeNote = "家政"; break;
        case 'chan': TypeNote = "产后修复"; break;
        case 'tuina': TypeNote = "小儿推拿"; break;
        case 'nurse': TypeNote = "护理"; break;
        case 'yoga': TypeNote = "瑜伽"; break;
        case 'cuiru': TypeNote = "催乳"; break;
        case 'swim': TypeNote = "游泳馆"; break;
        case 'train': TypeNote = "培训学校"; break;
        case 'club': TypeNote = "月子会所"; break;
        case 'garden': TypeNote = "育婴园"; break;
        default: break;
    }
    return TypeNote;
}
//获取客户来源
function getBefrom(befrom) {
    var befromNote = "其他来源";
    switch (befrom) {
        case 'oneself': befromNote = "客户自己"; break;
        case 'parter': befromNote = "合作伙伴"; break;
        case 'employee': befromNote = "内部员工"; break;
        case 'store': befromNote = "店面渠道"; break;
        case 'leader': befromNote = "领导推荐"; break;
        case 'fuwai': befromNote = "外联部"; break;
        case 'hotline': befromNote = "电话热线"; break;
        case 'system': befromNote = "系统导入"; break;
        default: break;
    }
    return befromNote;
}
//获取外联部所有医院渠道
function getOutsideItem() {
    var OutsideItem = "";
    OutsideItem = [{ "value": "10592", "test": "郑大二附院" }, { "value": "10593", "test": "省妇幼" }, { "value": "10594", "test": "河南省中医院" }, { "value": "10867", "test": "外联其他订单" }];
    return OutsideItem;
}

//获取跟踪状态记录
function getRecordType(Type) {
    var TypeNote = "其他跟进";
    switch (Type) {
        case 'info': TypeNote = "信息修改"; break;
        case 'order': TypeNote = "订单变动"; break;
        case 'track': TypeNote = "跟踪动态"; break;
        case 'cert': TypeNote = "认证变动"; break;
        case 'sche': TypeNote = "日程变动"; break;
        case 'log': TypeNote = "日志变动"; break;
        case 'finance': TypeNote = "财务变动"; break;
        default: break;
    }
    return TypeNote;
}
//获取日程记录说明
function getSchType(Type) {
    var TypeNote = "";
    switch (Type) {
        case 1: TypeNote = "内单"; break;
        case 2: TypeNote = "外单"; break;
        case 3: TypeNote = "休息"; break;
        case 4: TypeNote = "其他"; break;
        default: break;
    }
    return TypeNote;
}
//获取财务状态
function getFinanceType(Type) {
    var TypeNote = "未知变动";
    switch (Type) {
        case 'income_fan': TypeNote = "提成奖励"; break;
        case 'income_salary': TypeNote = "工资发放"; break;
        case 'income_transfer': TypeNote = "转账收入"; break;
        case 'income_wechat': TypeNote = "微信充值"; break;
        case 'income_refund': TypeNote = "退款返现"; break;
        case 'income_alipay': TypeNote = "支付宝充值"; break;
        case 'income_unionpay': TypeNote = "银联充值"; break;
        case 'expend_order_wechat': TypeNote = "微信付款订单"; break;
        case 'expend_order_supp': TypeNote = "代收补款订单"; break;
        case 'expend_order_cash': TypeNote = "现金补款订单"; break;
        case 'expend_transfer': TypeNote = "转账付款"; break;
        case 'expend_cash': TypeNote = "账户提现"; break;
        case 'expend_cash_wechat': TypeNote = "微信提现"; break;
        default: break;
    }
    return TypeNote;
}
//获取订单进度
function getOrderStatus(Status) {
    var TypeNote = "";
    switch (Status) {
        case 0: TypeNote = "已作废"; break;
        case 1: TypeNote = "抢单中"; break;
        case 2: TypeNote = "跟进确认中"; break;
        case 3: TypeNote = "准备去上户"; break;
        case 4: TypeNote = "正在上户中"; break;
        case 5: TypeNote = "工资结算中"; break;
        case 6: TypeNote = "完成结束"; break;
        default: break;
    }
    return TypeNote;
}
//获取返现模式
function getFanType(Type) {
    var TypeNote = "";
    switch (Type) {
        case 'fan20%': TypeNote = "<p>一般为常规服务订单<br/>下单人提成：订单总金额 *8%<br/>推广人提成：订单总金额 *2%<br/>管理人提成：订单总金额 *2%<\/p>"; break;
        case 'fan30%': TypeNote = "<p>一般为常规服务订单<br/>下单人提成：订单总金额 *12%<br/>推广人提成：订单总金额 *3%<br/>管理人提成：订单总金额 *3%<\/p>"; break;
        case 'fan10%': TypeNote = "<p>一般为育婴师续单<br/>下单人提成：订单总金额 *4%<br/>推广人提成：订单总金额 *1%<br/>管理人提成：订单总金额 *1%<\/p>"; break;
        default: break;
    }
    return TypeNote;
}
//获取角色信息
function getRole(roleId) {
    var roleNote = "终端客户";
    switch (roleId) {
        case 1: roleNote = "超级管理员"; break;
        case 2: roleNote = "地区管理员"; break;
        case 3: roleNote = "客服人员"; break;
        case 4: roleNote = "信息主管"; break;
        case 5: roleNote = "客户经理"; break;
        case 6: roleNote = "合作伙伴"; break;
        case 7: roleNote = "财务人员"; break;
        case 8: roleNote = "服务老师"; break;
        case 9: roleNote = "外联经理"; break;
        case 10: roleNote = "医院渠道"; break;
        default: break;
    }
    return roleNote;
}
//获取角色信息
function getHandle(userHandle) {
    var handleNote = "未获得";
    switch (userHandle) {
        case 0: handleNote = "<span style=\"color:green;\">在职<\/span>"; break;
        case 1: handleNote = "<span style=\"color:blue;\">待职<\/span>"; break;
        case 2: handleNote = "<span style=\"color:red;\">请假<\/span>"; break;
        default: break;
    }
    return handleNote;
}
//获取角色信息-加密版
function getRoleMini(roleId) {
    var roleNote = "客户";
    switch (roleId) {
        case '1': roleNote = "管理"; break;
        case '2': roleNote = "管理"; break;
        case '3': roleNote = "客服"; break;
        case '4': roleNote = "信息"; break;
        case '5': roleNote = "经理"; break;
        case '6': roleNote = "伙伴"; break;
        case '7': roleNote = "财务"; break;
        case '8': roleNote = "老师"; break;
        case '9': roleNote = "外联"; break;
        case '10': roleNote = "医院"; break;
        default: break;
    }
    return roleNote;
}
//根据角色获取订单来源信息
function getBeform(roleId) {
    var roleNote = "customer";
    switch (roleId) {
        case '1': roleNote = "manage"; break;
        case '2': roleNote = "manage"; break;
        case '3': roleNote = "manage"; break;
        case '4': roleNote = "manage"; break;
        case '5': roleNote = "manage"; break;
        case '6': roleNote = "parter"; break;
        case '7': roleNote = "manage"; break;
        case '8': roleNote = "service"; break;
        case '9': roleNote = "outside"; break;
        case '10': roleNote = "outside"; break;
        default: break;
    }
    return roleNote;
}
//获取地市显示信息
function getCity(depId) {
    var depNote = "全国";
    switch (depId) {
        case "1": depNote = "河南"; break;
        case "17": depNote = "上海"; break;
        case "22": depNote = "西安"; break;
        case "23": depNote = "周口"; break;
        case "24": depNote = "洛阳"; break;
        case "25": depNote = "济源"; break;
        case "26": depNote = "新乡"; break;
        case "27": depNote = "濮阳"; break;
        default: break;
    }
    return depNote;
}
//获取日程类型
function getschType(schTyp) {
    var schTypNote = "";
    switch (schTyp) {
        case 1: schTypNote = "内"; break;
        case 2: schTypNote = "外"; break;
        case 3: schTypNote = "休"; break;
        case 4: schTypNote = "假"; break;
        case 5: schTypNote = "？"; break;
        default: break;
    }
    return schTypNote;
}
//获取文章分类名称
function getArticleClass(CategoryId) {
    var TypeNote = "";
    switch (CategoryId) {
        case 1: TypeNote = "孕期知识"; break;
        case 2: TypeNote = "常见疾病"; break;
        case 3: TypeNote = "产后恢复"; break;
        case 4: TypeNote = "早期教育"; break;
        case 5: TypeNote = "营养知识"; break;
        case 6: TypeNote = "公司动态"; break;
        case 0: TypeNote = "其他分类"; break;
        default: break;
    }
    return TypeNote;
}
//评分转星级
function getXing(score) {
    var xing = "";
    for (var i = 0; i < score; i++) {
        xing += "★";
    }
    return xing;
}
//数据为空时替换值
function isNull(olddata, newdata) {
    var data = "";
    if (olddata != null && olddata != "") {
        data = olddata;
    } else {
        data = newdata;
    }
    return data;
}

//六边形测评生成  必须调用echarts插件js
function liubianxing(obj, arrval) {
    var myChart = echarts.init(obj);
    option = {
        radar: [{
            indicator: [{
                text: '专业',
                max: 10
            }, {
                text: '厨艺',
                max: 10
            }, {
                text: '普通',
                max: 10
            }, {
                text: '亲和',
                max: 10
            }, {
                text: '形象',
                max: 10
            }, {
                text: '沟通',
                max: 10
            }],
            radius: 30
        }],
        series: [{
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: [{
                value: arrval
            }]
        }]
    };
    myChart.setOption(option);
}

//员工学历
function education(value) {
    var names = "";
    switch (value) {
        case 0:
            names = "";
            break;
        case 1:
            names = "本科以上";
            break;
        case 2:
            names = "大专";
            break;
        case 3:
            names = "高中";
            break;
        case 4:
            names = "初中";
            break;
        case "":
            names = "";
            break;
        default:
            break;
    }
    return names;
}
//获取等级
function getLevel(level) {
    var names = "";
    switch (level) {
        case 1:
            names = "初级";
            break;
        case 2:
            names = "中级";
            break;
        case 3:
            names = "高级";
            break;
        case 4:
            names = "特级";
            break;
        case "":
            names = "";
            break;
        default:
            break;
    }
    return names;
}
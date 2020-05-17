import md5 from '@/common/utils/md5';
import config from '@/common/utils/config';
const formatTime = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatDate = (fmt, date) => {
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"H+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

const formatNumber = n => {
	n = n.toString();
	return n[1] ? n : '0' + n
};


const signString = (formData, now) => {
	return md5(
		encodeURIComponent(formData + config.key + now)
	);
};

const isEmpty = o => {
	return typeof o == "undefined" || o == null || o == "" || o.toString().replace(/\s/g, "").length == 0;
};

const isNotEmpty = o => {
	return !isEmpty(o);
};

const formatDateString = (fmt, date) => {
	date = date.replace(/-/g,"/");
	var time = new Date(date);
	return formatDate(fmt,time);
};

const getParam= (url, variable) => {
	var query = url.substring(url.indexOf('?') + 1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return false;
};

module.exports = {
	formatTime: formatTime,
	formatDate: formatDate,
	signString: signString,
	isEmpty: isEmpty,
	isNotEmpty: isNotEmpty,
	formatDateString: formatDateString,
	getParam: getParam
};

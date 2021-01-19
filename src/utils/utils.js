const moment = require('moment');
moment.locale('zh-CN');

export default {
  /**
   * 格式化时间
   * @param {number} timestamp - 13位时间戳
   */
  formatTime(timestamp) {
    const date = new Date(timestamp);
    if (date === 'Invalid Date') {
      return '';
    }
    return moment([
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ]).fromNow();
  },
  /**
   * 格式化日期
   * @param {string} format - 格式
   * @param {number} timestamp - 13位时间戳
   */
  formatDate(format, timestamp) {
    if (!timestamp) {
      return '';
    }
    return moment(timestamp).format(format);
  },
  /**
   * 设置登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   * @param {object} res - 登录验证信息
   */
  setAuthInfo(ctx, res) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }

    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }

    if ($cookies && $store) {
      // 过期时长 new Date(Date.now() + 8.64e7 * 365 * 10)
      const expires = $store.state.auth.cookieMaxExpires;

      // 设置cookie
      $cookies.set('userId', res.userId, { expires });
      $cookies.set('clientId', res.clientId, { expires });
      $cookies.set('token', res.token, { expires });
      $cookies.set('userInfo', res.user, { expires });

      // 设置vuex
      $store.commit('auth/UPDATE_USERINFO', res.user);
      $store.commit('auth/UPDATE_CLIENTID', res.clientId);
      $store.commit('auth/UPDATE_TOKEN', res.token);
      $store.commit('auth/UPDATE_USERID', res.userId);
    }
  },

  /**
   * 移除登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   */
  removeAuthInfo(ctx) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }
    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    if ($cookies && $store) {
      $cookies.remove('userInfo');
      $cookies.remove('clientId');
      $cookies.remove('token');
      $cookies.remove('userId');
      $store.commit('auth/UPDATE_USERINFO', null);
      $store.commit('auth/UPDATE_CLIENTID', '');
      $store.commit('auth/UPDATE_TOKEN', '');
      $store.commit('auth/UPDATE_USERID', '');
    }
  },

  // 检测手机号
  checkPhone(phone) {
    // console.log(phone === '');
    if (phone === '') {
      return '手机号不能为空';
    } else if (phone.length < 11 || !/^1[3456789]\d{9}$/.test(phone)) {
      return '手机号格式错误';
    }
    return '';
  },

  // 检测邮箱号
  checkEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
      email,
    );
    if (email === '') {
      return '邮箱不能为空';
    } else if (!reg) {
      return '请输入正确的邮箱';
    }
    return '';
  },

  // 检测account 手机 邮箱
  checkAccount(account) {
    if (/[a-zA-Z]+/.test(account)) {
      return this.checkEmail(account);
    } else {
      return this.checkPhone(account);
    }
  },

  // 检测密码
  checkPassword(password, isLogin = false) {
    if (password === '') {
      return '密码不能为空';
    } else if (!isLogin) {
      const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/;
      return !reg.test(password) ? '密码要求长度为8-16位，包含数字和字母' : '';
    }
    return '';
  },

  // 检测验证码
  checkVerification(verifyCode) {
    if (verifyCode === '') {
      return '验证码不能为空';
    }
    return '';
  },
};

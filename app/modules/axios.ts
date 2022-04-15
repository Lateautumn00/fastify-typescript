/*
 * @Description:axios
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import fast from '../filter/fast';
import axios from 'axios';
axios.defaults.timeout = 5000; // 5秒无响应表示请求超时
class AxiosModules {
  /**
   * get数据
   * @param {*} _url url地址
   * @param {*} _parmas 参数集合
   * @returns
   */
  static async get(_url: string, _parmas: any) {
    let message = {};
    await axios
      .get(_url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: _parmas
      })
      .then(function (_response) {
        message = _response.data;
      })
      .catch(function (_error) {
        fast.clog('error', [_error]);
        message = { errcode: 1002, errmsg: '服务错误', data: {} };
      });
    return message;
  }

  /**
   * post数据
   * @param {*} _url url地址
   * @param {*} _parmas 参数集合
   * @returns
   */
  static async post(_url: string, _parmas: any) {
    let message = {};
    await axios
      .post(_url, _parmas, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (_response) {
        message = _response.data;
      })
      .catch(function (_error) {
        fast.clog('error', [_error]);
        message = { errcode: 1002, errmsg: '服务错误', data: {} };
      });
    return message;
  }
}
export default AxiosModules;

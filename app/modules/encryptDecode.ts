/*
 * @Description:加密、解密
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import crypto from 'crypto';
import fast from '../filter/fast';
class EncryptDecodeModules {
  /**
   * hash md5加密(暂时无用)
   * @param {*} _data
   */
  static async md5(_data: any) {
    // 以md5的格式创建一个哈希值
    const hash = crypto.createHash('md5');
    return hash.update(_data).digest('base64');
  }

  /**
   * sha1
   * @param {*} _data
   * @returns
   */
  static async sha1(_data: any) {
    const hashCode = crypto.createHash('sha1'); // 创建加密类型
    const data = hashCode.update(_data, 'utf8').digest('hex');
    return data;
  }

  /**
   * 解密微信数据
   * @param {*} _encryptedDatas
   * @param {*} _ivs
   * @param {*} _appIds
   * @param {*} _sessionKeys
   * @returns
   */
  static async getCrypt(
    _encryptedDatas: any,
    _ivs: any,
    _appIds: any,
    _sessionKeys: any
  ) {
    // base64 decode
    const sessionKey = Buffer.from(_sessionKeys, 'base64');
    const encryptedData = Buffer.from(_encryptedDatas, 'base64');
    const iv = Buffer.from(_ivs, 'base64');
    let decoded: any = {};
    try {
      // 解密
      const decipher: any = crypto.createDecipheriv(
        'AES-128-CBC',
        sessionKey,
        iv
      );
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (_err) {
      fast.clog('error', ['wechat auth error', _err]);
      decoded = {};
      throw new Error('Illegal Buffer');
    }
    if (!decoded.watermark || decoded.watermark.appid !== _appIds) {
      decoded = {};
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
}
module.exports = EncryptDecodeModules;

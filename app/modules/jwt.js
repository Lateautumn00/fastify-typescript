
/*
 * @Description:JWT
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
const { tokens } = require('../../config/index'); // 引入配置文件
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
class JwtModules {
    /**
       * 获取jwt token
       * @param {*} _payload 需要加密的数据集合
       * @returns
       */
    static async getToken (_payload = {}) {
        return jwt.sign(_payload, tokens.jwtToken, { expiresIn: '168h' });
    }

    /**
       * 解密jwt token
       * @param {*} _token 需要解密的token
       * @returns
       */
    static async getJWTPayload (_token) {
        return jwt.verify(_token.split(' ')[1], tokens.jwtToken);
    }
}
module.exports = JwtModules;

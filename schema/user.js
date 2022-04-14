
const getUser = {
    type: 'object',
    properties: {
        guid: { type: 'number', minimum: 1 }
    },
    required: ['guid']
} // 获取微信小游戏openid
module.exports = { getUser };

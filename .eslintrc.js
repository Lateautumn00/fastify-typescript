module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        es6: true, // 支持新的 ES6 全局变量，同时自动启用 ES6 语法支持
        node: true // 启动node环境
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        quotes: [1, 'single'], // 建议使用单引号
        'no-duplicate-case': 2,
        'no-irregular-whitespace': 2, // 不能有不规则的空格
        'no-mixed-spaces-and-tabs': [2, false], // 禁止混用tab和空格
        'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
        'no-multi-spaces': 1, // 不能用多余的空格
        'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
        'no-undef': 2, // 不能有未定义的变量
        'no-unreachable': 2, // 不能有无法执行的代码
        'no-unused-expressions': 2, // 禁止无用的表达式
        eqeqeq: 0, // 必须使用全等 2必须
        'no-eval': 1, // 禁止使用eval
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'after-used'
            }
        ], // 不能有声明后未被使用的变量或参数
        'no-use-before-define': 2, // 未定义前不能使用
        'no-dupe-args': 2, // 函数参数不能重复
        strict: 2, // 使用严格模式
        semi: [2, 'always'], // 语句强制分号结尾
        'space-before-function-paren': 0,
        indent: 0
    }
};

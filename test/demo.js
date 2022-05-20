function Super () {
    this.a = [1, 2, 3, 4]//此处如果是非数组形式  原型继承就很ok
}

Super.prototype.fn = function () {
    console.log('我是super的原型方法');
}

function Sun () {

}
Sun.prototype = new Super()
var a1 = new Sun()
var a2 = new Sun()
a1.a.push(5)
console.log(a1.a, a1.fn());//[ 1, 2, 3, 4, 5 ] 我是super的原型方法
console.log(a2.a, a2.fn());//[ 1, 2, 3, 4, 5 ] 我是super的原型方法
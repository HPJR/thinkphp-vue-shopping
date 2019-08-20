//验证手机号
export function isvalidateMobile(rule, value, callback){
    if (value != null && value != "") {
        const mobile = /^1[3456789]\d{9}$/;
        if (!mobile(value)) {
            callback(new Error('您输入的手机号不正确!'))
        } else {
            callback()
        }
    } else {
        callback();
    }
}

//验证不为空
export function isNull(rule, value, callback){
    if (value != null && value != "") {
        callback(new Error('不能为空'))
    } else {
        callback();
    }
}

// 验证是否整数
export function isInteger(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'));
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入正整数'));
            } else {
                callback();
            }
        }
    }, 1000);
}

//图片路径
const filterImg = (value)=>{
    return process.env.NODE_ENV === 'development' ? 'http://www.ff.tt/Uploads/'+ value : 'http://test2.jianfly.com/Uploads/'+ value;
};


//字符截取
const filterDate = (value,num) => {
    if (value.length > num) {
        let newV = value.slice(0, num);
        return newV
    } else {
        return value
    }
};

//价格补0
const money = (value)=>{
    return "¥" + value.toFixed(2);
};

export {
    filterImg,
    filterDate,
    money
};

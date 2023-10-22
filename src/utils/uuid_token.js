import {v4 as uuidv4} from 'uuid'
// 要生成一个随机字符串,且每次执行不能发生变化
export const getUUID = () => {
    // 从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 若本地存储中没有这个字符,就用uuid来创建字符,并且存入本地存储
    if(!uuid_token){
        // 生成游客身份
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 返回值
    return uuid_token;
}
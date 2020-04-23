import { get, post } from "./http"

export const apiGetCode = p => get('/api/captchaImage', p)
export const apiLogin = p => post('/api/login', p)
export const apiExit = p => get('/api/logout', p)
export const apiUserInfo = p => get('/api/getInfo',p)
export const apiAwardList = p => get('/api/system/award/awardList', p)  //奖项列表
export const apiRecordList = p => get('/api/system/award/recordList', p)  //抽奖记录
export const apiAddAward = p => post('/api/system/award/addAward', p) //添加活动
export const apiDeleteAward = p => get('/api/system/award/deleteAward', p)  //删除活动
export const apiUsers = p => get('/api/system/award/listUser', p)  //人员列表
export const apiEditUser = p => post('/api/system/award/editUser', p)  //修改密码
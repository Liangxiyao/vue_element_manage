// import { get, post } from "./http"

// export const apiGetCode = p => get('/api/captchaImage', p)
// export const apiLogin = p => post('/api/login', p)
// export const apiExit = p => get('/api/logout', p)
// export const apiUserInfo = p => get('/api/getInfo', p)

// export const apiIndexInfo = p => get('/api/system/award/getIndexInfo', p)  //奖项列表

// export const apiAwardList = p => get('/api/system/award/awardList', p)  //奖项列表
// export const apiAwardsInfo = p => get('/api/system/award/getAwardsInfo', p)
// export const apiRecordList = p => get('/api/system/award/recordList', p)  //抽奖记录
// export const apiAddAward = p => post('/api/system/award/addAward', p) //添加活动
// export const apiCaculate = p => post('/api/system/award/caculate', p) //计算值
// export const apiDeleteAward = p => get('/api/system/award/deleteAward', p)  //删除活动
// export const apiStopAward = p => get('/api/system/award/switchAward', p)  //停止活动
// export const apiExportRecord = p => get('/api/system/award/exportRecord', p)  //导出活动数据


// export const apiUsers = p => get('/api/system/award/listUser', p)  //人员列表
// export const apiEditUser = p => post('/api/system/award/editUser', p)  //修改密码
// export const apiAddUser = p => post('/api/system/award/addUser', p)  //人员列表

import { get, post } from "./http"

export const apiGetCode = p => get('/captchaImage', p)
export const apiLogin = p => post('/login', p)
export const apiExit = p => get('/logout', p)
export const apiUserInfo = p => get('/getInfo', p)

export const apiIndexInfo = p => get('/system/award/getIndexInfo', p)  //奖项列表

export const apiAwardList = p => get('/system/award/awardList', p)  //奖项列表
export const apiAwardsInfo = p => get('/system/award/getAwardsInfo', p)
export const apiRecordList = p => get('/system/award/recordList', p)  //抽奖记录
export const apiAddAward = p => post('/system/award/addAward', p) //添加活动
export const apiAwardsTime = p => get('/system/award/getAwardsTime', p) //活动时间

export const apiCaculate = p => post('/system/award/caculate', p) //计算值
export const apiDeleteAward = p => get('/system/award/deleteAward', p)  //删除活动
export const apiStopAward = p => get('/system/award/switchAward', p)  //停止活动
export const apiExportRecord = p => get('/system/award/exportRecord', p)  //导出活动数据


export const apiUsers = p => get('/system/award/listUser', p)  //人员列表
export const apiEditUser = p => post('/system/award/editUser', p)  //修改密码
export const apiAddUser = p => post('/system/award/addUser', p)  //人员列表
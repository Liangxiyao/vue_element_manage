import { get, post } from "./http"

export const apiGetCode = p => get('/captchaImage', p)
export const apiLogin = p => post('/login', p)
export const apiExit = p => get('/logout', p)
export const apiUserInfo = p => get('/getInfo', p)

export const apiIndexInfo = p => get('/system/award/getIndexInfo', p)  //首页列表

export const apiAwardList = p => get('/system/award/awardList', p)  //奖项列表
export const apiAwardsInfo = p => get('/system/award/getAwardsInfo', p)
export const apiRecordList = p => get('/system/award/recordList', p)  //抽奖记录
export const apiAddAward = p => post('/system/award/addAward', p) //添加活动
export const apiAwardsTime = p => get('/system/award/getAwardsTime', p) //活动时间
export const apiCaculate = p => post('/system/award/caculate', p) //计算值
export const apiDeleteAward = p => get('/system/award/deleteAward', p)  //删除活动
export const apiStopAward = p => get('/system/award/switchAward', p)  //停止活动
export const apiExportRecord = p => get('/system/award/exportRecord', p)  //导出活动数据
export const apiAppendPrize = p => post('/system/award/additonalAward', p)  //追加
export const apiAppendTime = p => post('/system/award/changeAwardTime', p)  //延长时间


export const apiExtraAward = p => get('/system/award/extraList', p)  //特殊奖项列表
export const apiEditExtraAward = p => post('/system/award/editExtraAward', p)  //修改
export const apiAddExtraAward = p => post('/system/award/addExtraAward', p)  //添加
export const apiSwitchExtra = p => get('/system/award/switchExtra', p)  //停用
export const apiExtraRecordList = p => get('/system/award/extraRecordList', p)  //特殊奖项抽奖记录
export const apiExportExtraRecord = p => get('/system/award/exportExtraRecord', p)  //导出抽奖记录

export const apiUsers = p => get('/system/award/listUser', p)  //人员列表
export const apiEditUser = p => post('/system/award/editUser', p)  //修改密码
export const apiAddUser = p => post('/system/award/addUser', p)  //人员列表
export const apiLogList = p => get('/system/award/logList', p) //操作日志

/**
 * @file common.js
 * @description 通用类接口，如上传、获取字典数据等API合集
 */
import request from '../utils/request';

/**
 * @description 获取其它字典
 * @reference http://docs.mshare.cn/project/245/interface/api/11524
 */
export const getDictListApi = () => request.get('/api/v1/dicts');

/**
 * @description 格式化时间
 * @param {Number|Object} time 传入时间，可以是Date类型，也可以是时间戳，不传默认为当前时间
 * @param {String} format 格式化的格式，默认为yyyy-MM-dd hh:mm:ss
 * @returns format
 * @example parseTime() // "2021-08-17 11:13:48"
 * @example parseTime('str') // Uncaught Error: 请传入正确的时间格式
 */
export function parseTime(time = Date.now(), format = '{y}-{M}-{d} {h}:{m}:{s}') {
  if (Number.isNaN(new Date(String(time).length === 13 ? time / 10000 : time).valueOf())) {
    throw new Error('请传入正确的时间格式');
  }
  if (!time) return '';

  let date;
  if (time && typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay(),
  };
  const timeStr = format.replace(/{(y|M|d|h|m|s|w)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'w') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];

    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

/**
 * @description 格式化日期和时间，根据是否当天、昨天、当年返回不同格式
 * @param {Number} ts 传入需要格式化时间的时间戳，可为10位或13位，默认当前
 * @returns {String} 格式化后的日期时间串
 * @example formatTime(Date.now() - 111111111) => '昨天 03:40'
 */
export const formatTime = (ts = Date.now()) => {
  const formatDate = new Date(String(ts).length === 10 ? ts * 1000 : ts);
  const year = formatDate.getFullYear();
  const month = ('0' + (formatDate.getMonth() + 1)).slice(-2);
  const date = ('0' + formatDate.getDate()).slice(-2);
  const hour = ('0' + formatDate.getHours()).slice(-2);
  const minute = ('0' + formatDate.getMinutes()).slice(-2);
  const now = new Date();
  const yestoday = new Date(now.getTime() - 86400000);
  const diff = (now.getTime() - (String(ts).length === 10 ? ts * 1000 : ts)) / 1000;

  if (diff < 0) return `${year}-${month}-${date} ${hour}:${minute}`;

  // 不到一分钟，显示刚刚
  if (diff < 60) return '刚刚';
  // 不到一小时，显示 x分钟前，向下取整
  if (diff >= 60 && diff <= 3600) return `${Math.round(diff / 60)}分钟前`;
  // 不到24小时， 显示 x小时前， 向下取整
  if (diff >= 3600 && diff <= 3600 * 24) return `${Math.round(diff / 3600)}小时前`;
  // 24小时以上但是还在昨天，显示 昨天 hh:MM
  if (yestoday.toDateString() === formatDate.toDateString()) return `昨天 ${hour}:${minute}`;
  // 在本年，显示 mm-dd hh:MM
  if (now.getFullYear() === year) return `${month}-${date} ${hour}:${minute}`;
  // 不在本年，显示 yyyy-mm-dd hh:MM
  return `${year}-${month}-${date} ${hour}:${minute}`;
};

/**
 * @description 树形结构转数组结构
 * @param {Array} tree 树形列表
 * @param {String} children children属性名称
 * @param {Object} extra 额外添加的字段
 * @returns {Array}
 * @example tree2Arr([{level: 1, id: 1, pid: 0, name: "公司", child: [{level: 1, id: 2, pid: 1, name: "部门1", child: []]}])
 *            => [{level: 1, id: 1, pid: 0, name: "公司"}, {level: 1, id: 2, pid: 1, name: "部门1", child: []}]
 */
export const tree2Arr = (tree, children = 'child', extra = {}) =>
  (tree || []).reduce(
    (arr, { [children]: child, ...rest }) =>
      arr.concat([{ ...rest, ...extra }], tree2Arr(child, children, extra)),
    []
  );

/**
 * @description 数组结构转树形结构
 * @param {Array} data 源数据
 * @param {Object} props 字段映射，默认为{ pid: 'pid', id: 'id' }
 * @param {String|Number} parentId 根据每一项的pid是否等于parentId进行判断
 * @returns {Array} result 模拟树形结构的嵌套数组, [{ id, pid, children, ...rest }]
 * @example arr2tree([{ pid: 0, id: 1, name: '四川'},{ pid: 1, id: 11, name: '成都'}])
 *            => [{ id: 1, pid: 0, title: "四川", children: [{id: 11, pid: 1, title: "成都", children: []}] }]
 */
export const arr2tree = (data = [], props = { pid: 'pid', id: 'id' }, parentId = 0) =>
  data.reduce((result, { [props.pid]: pid, [props.id]: id, ...rest }) => {
    if (pid === parentId) {
      result.push({ pid, id, ...rest, children: arr2tree(data, props, id) });
    }
    return result;
  }, []);

/**
 * @description 将数组项按照某个属性名进行分组
 * @param {Array} arr 待分组数组
 * @param {String|Number} key 分组属性名
 * @returns {}
 * @example groupBy([{ name: 'A', subject: '语文', score: 100 }, { name: 'A', subject: '数学', score: 90 }], 'name')
 *            => { A: [{ name: "A", subject: "语文", score: 100 }, { name: "A", subject: "数学", score: 90 }]}
 */
export const groupBy = (arr = [], key) => {
  if (!key) {
    throw new Error('请传入分组属性名');
  }
  return arr.reduce((pre, cur) => {
    const groupKey = cur[key];
    pre[groupKey] ? pre[groupKey].push(cur) : (pre[groupKey] = [cur]);
    return pre;
  }, {});
};

/**
 * @description 重命名树形结构的子选项属性名为children，并将空数组设置为null
 * @param {Array} arr 树形结构
 * @param {String} children 重命名子选项属性名称，默认为child
 * @returns {Array} [{ ...rest, children: Array | null }]
 * @example formatChildren([{ id: 1, child: [{ id: 2, child: [] }] }])
 *            => [{ id: 1, children: [{ id: 2, children: null }] }]
 */
export const formatChildren = (arr = [], children = 'child') =>
  arr.reduce(
    (result, { [children]: child, ...rest }) =>
      result.concat({
        ...rest,
        children: child && child.length ? formatChildren(child, children) : null, //如果还有子集，就递归调用自己
      }),
    []
  );

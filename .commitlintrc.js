/**
 * git提交信息规范
 * type(scope): subject
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never'], // subject不区分大小写
    'type-case': [2, 'never'], // type需为小写
    'type-empty': [2, 'never'], // 不能缺少commit类型
    'subject-empty': [2, 'never'], // 不能缺少subject
    'header-max-length': [2, 'never', 200], // 限制header最大长度为200
    // 提交的type 类型枚举列表，可根据项目进行修改
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建项目
        'chore', // 改变构建流程、增加依赖库、工具等
        'docs', // 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
        'feat', // 新增feature
        'fix', // 修复bug
        'perf', // 优化相关，比如提升性能、体验
        'refactor', // 代码重构，没有加新功能或者修复bug
        'revert', // 版本回滚
        'style', // 仅仅改变代码格式，不改变代码逻辑
        'test', // 测试
        'merge', // 合并分支
      ],
    ],
  },
};

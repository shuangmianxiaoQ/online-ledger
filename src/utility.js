export const LIST_VIEW = "list";
export const CHART_VIEW = "chart";

// 生成年份和月份的范围
export const range = (size, startAt = 0) => {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr[i] = startAt + i;
  }

  return arr;
};

// 根据传入的时间获取年份和月份
export const getCurrentDate = str => {
  const now = str ? new Date(str) : new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return { year, month };
};

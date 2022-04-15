/*
 * @Description:时间
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import dayjs from 'dayjs';
/**
 * 判断两个时间戳是否为同一周
 * @param {时间1} _time1 格式2021-12-29
 * @param {时间2} _time2 格式2021-12-29
 */
export const isWeek = (_time1: any, _time2: any) => {
  if (_time1 > _time2) [_time2, _time1] = [_time1, _time2];
  _time1 = getValueOf(_time1);
  _time2 = getValueOf(_time2);
  const week1 = getWeekDay(_time1); // time1是周几
  const week2 = getWeekDay(_time2); // time2是周几
  const day = Math.abs(getDiff(_time1, _time2, 'day')); // 相差天数
  if (day < 7) {
    return week2 >= week1;
  } else {
    return false; // 大于7天不在同一周
  }
};
/**
 * 比较两个时间段是否有重叠
 * @param {时间段一} _time1Arr 格式 [ '2021-10-01 00:00:00', '2021-10-10 00:00:00' ]
 * @param {时间段二} _time2Arr 格式 [ '2021-10-01 00:00:00', '2021-10-10 00:00:00' ]
 * @param {是否为时间戳} _isTimeStamp true是时间戳 false 非时间戳
 * @returns
 */
export const isTimeOverlap = (
  _time1Arr: any,
  _time2Arr: any,
  _isTimeStamp = false
) => {
  let status = false; // 时间是否重叠
  if (_time1Arr.length != 2 || _time2Arr.length != 2) return status; // 时间不成对
  // 判断是否是时间格式
  if (
    !dayjs(_time1Arr[0]).isValid() ||
    !dayjs(_time1Arr[1]).isValid() ||
    !dayjs(_time2Arr[0]).isValid() ||
    !dayjs(_time2Arr[1]).isValid()
  )
    return status; // 含有非时间格式
  if (_isTimeStamp) {
    // 转换成时间戳
    _time1Arr = [getValueOf(_time1Arr[0]), getValueOf(_time1Arr[1])];
    _time2Arr = [getValueOf(_time2Arr[0]), getValueOf(_time2Arr[1])];
  }
  if (_time1Arr[0] > _time1Arr[1]) _time1Arr.reverse(); // 反转
  if (_time2Arr[0] > _time2Arr[1]) _time2Arr.reverse();
  // dayjs().isBefore(dayjs()) // 检查一个 Dayjs 对象是否在另一个 Dayjs 对象时间之前
  // dayjs().isSame(dayjs()) //检查一个 Dayjs 对象是否和另一个 Dayjs 对象时间相同
  // dayjs().isAfter(dayjs()) //检查一个 Dayjs 对象是否在另一个 Dayjs 对象时间之后
  if (
    dayjs(_time1Arr[0]).isSame(dayjs(_time2Arr[0])) ||
    dayjs(_time1Arr[0]).isSame(dayjs(_time2Arr[1])) ||
    dayjs(_time1Arr[1]).isSame(dayjs(_time2Arr[0])) ||
    dayjs(_time1Arr[1]).isSame(dayjs(_time2Arr[1]))
  ) {
    // time1Arr与time2Arr有时间相等
    status = true;
  }
  if (
    dayjs(_time1Arr[0]).isBefore(dayjs(_time2Arr[0])) &&
    dayjs(_time1Arr[1]).isAfter(dayjs(_time2Arr[1]))
  ) {
    // time1Arr包含time2Arr
    status = true;
  }
  if (
    dayjs(_time2Arr[0]).isBefore(dayjs(_time1Arr[0])) &&
    dayjs(_time2Arr[1]).isAfter(dayjs(_time1Arr[1]))
  ) {
    // time2Arr包含time1Arr
    status = true;
  }
  if (
    dayjs(_time1Arr[0]).isBefore(dayjs(_time2Arr[0])) &&
    dayjs(_time2Arr[1]).isAfter(dayjs(_time1Arr[1])) &&
    dayjs(_time1Arr[1]).isAfter(dayjs(_time2Arr[0]))
  ) {
    // time1Arr与time2Arr 前半部分相交 or time2Arr与time1Arr 后半部分相交
    status = true;
  }
  if (
    dayjs(_time1Arr[0]).isAfter(dayjs(_time2Arr[0])) &&
    dayjs(_time2Arr[1]).isBefore(dayjs(_time1Arr[1])) &&
    dayjs(_time1Arr[0]).isBefore(dayjs(_time2Arr[1]))
  ) {
    // time1Arr与time2Arr 后半部分相交 or time2Arr与time1Arr 前半部分相交
    status = true;
  }
  return status;
};
/**
 * 当前时间是否在时间段内
 * @param {时间段开始} _startTime
 * @param {时间段结束} _endTime
 * @param {是否为时间戳} _isTimeStamp
 * @returns
 */
export const isInTime = (
  _startTime: any,
  _endTime: any,
  _isTimeStamp = false
) => {
  let status = true; // true 在，false 不在
  const time = getValueOf(null); // 当前时间戳
  if (_isTimeStamp) {
    _startTime = getValueOf(_startTime);
    _endTime = getValueOf(_endTime);
  }
  if (
    dayjs(time).isBefore(dayjs(_startTime)) ||
    dayjs(time).isAfter(dayjs(_endTime))
  )
    status = false;
  return status;
};
/**
 * 获取今天是周几
 */
export const getWeekDay = (_time: any) => {
  let weekDay = _time == null ? dayjs().day() : dayjs(_time).day(); // 当前日期是周几   0-6
  weekDay = weekDay == 0 ? 7 : weekDay;
  return weekDay;
};
/**
 * 获取周结束时间
 * @param {*} _n 0本周 -1 上周 -2前周 1下周
 * @returns
 */
export const getLastWeekEnd = (_n: any) => {
  return dayjs()
    .subtract(1, 'day')
    .add(_n, 'week')
    .endOf('week')
    .add(1, 'day')
    .valueOf();
};
/**
 * 获取周开始时间
 * @returns
 */
export const getLastWeekStart = (_n: any) => {
  return dayjs()
    .subtract(1, 'day')
    .add(_n, 'week')
    .startOf('week')
    .add(1, 'day')
    .valueOf();
};
/**
 * 获取一年中开始时间
 * @returns
 */
export const getYearStart = (_time: any) => {
  return dayjs(_time).startOf('year').valueOf();
};
/**
 * 获取一年中结束时间
 * @returns
 */
export const getYearEnd = (_time: any) => {
  return dayjs(_time).endOf('year').valueOf();
};
/**
 * 获取日期是一年中第几周
 * @param {*} _time
 */
export const getWeek = (_time: any) => {
  const start = getYearStart(_time);
  return getDiff(_time, start, 'week') + 1;
};
/**
 * 几天前的时间戳
 * @param {*} n null 当天 -1昨天
 * @param {*} _time -1表示当前时间
 * @param {*} _n 1 昨日 -1 明日
 * @param {*} _type day week month
 * @returns
 */
export const getSubtractDay = (_time: any, _n: any, _type: any) => {
  return _time === null
    ? dayjs().subtract(_n, _type).valueOf()
    : dayjs(_time).subtract(_n, _type).valueOf();
};
/**
 *  几天后  n与 getSubtractDay 相反
 * @param {*} _time
 * @param {*} _n
 * @param {*} _type
 * @returns
 */
export const getAddDay = (_time: any, _n: any, _type: any) => {
  return _time === null
    ? dayjs().add(_n, _type).valueOf()
    : dayjs(_time).add(_n, _type).valueOf();
};
/**
 * 格式化输出时间
 * @param {*} _time
 * @param {*} format 'YYYY-MM-DD' 'YYYYMMDD' 'YYYY-MM-DD HH:mm:ss'
 * @returns
 */
export const getDateFormat = (_time: any, format: any) => {
  const data =
    _time == null ? dayjs().format(format) : dayjs(_time).format(format);
  if (format === 'YYYYMMDD') return Number(data);
  return data;
};
/**
 * 将时间格式转化时间戳 毫秒
 * @param _time
 * @returns
 */
export const getValueOf = (_time: any) => {
  return _time == null ? dayjs().valueOf() : dayjs(_time).valueOf();
};
/**
 * 获取unix时间 秒
 * @param {*} _time
 * @returns
 */
export const getUnix = (_time: any) => {
  return _time == null ? dayjs().unix() : dayjs(_time).unix();
};
/**
 * 两个时间相差多少天、周
 * @param {*} _time1
 * @param {*} _time2
 * @param {*} _type day week....
 * @returns
 */
export const getDiff = (_time1: any, _time2: any, _type: any) => {
  return dayjs(_time1).diff(_time2, _type);
};

/* eslint-disable one-var */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* 下面是封装的公共函数 */
export default {
  install: function (Vue, option) {
    Vue.prototype.$mySort = function (key, asc = true) {
      return function (a, b) {
        let valueA = a[key]
        let valueB = b[key]
        if (asc) {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      }
    }
    Vue.prototype.$echarts = echarts
    Vue.prototype.$blobal = {
      headerStyle: {
        'background-color': '#EFEEF1',
        // 'border-color': '#AEB7C6',
        'text-align': 'center',
        color: '#333',
        padding: '0',
        height: '36px'
      },
      cellStyle: {
        // 'border-color': '#AEB7C6',
        'text-align': 'center',
        padding: '1px 0 0 0',
        height: '30px'
      },
      selectList: ['DNS查询数'],
      title: {
        textStyle: {
          color: '#217FBB',
          fontSize: 16
        }
      },
      toolbox: {
        left: 'center',
        feature: {
          dataZoom: {}
        }
      },
      grid: {
        left: 14,
        top: '15%',
        right: 44,
        bottom: 10,
        containLabel: true
      },
      dataZoom: [{
          type: 'slider',
          orient: 'horizontal',
          backgroundColor: '#fff',
          dataBackground: {
            areaStyle: {
              color: '#fff'
            }
          },
          showDetail: false,
          handleSize: 20, // 滑动条的 左右2个滑动条的大小
          height: 24, // 组件高度
          show: false,
          start: 0,
          bottom: 0
        },
        {
          type: 'inside'
        }
      ],
      dataZoom1: [{
        type: 'slider',
        orient: 'horizontal',
        backgroundColor: '#fff',
        dataBackground: {
          areaStyle: {
            color: '#fff'
          }
        },
        showDetail: false,
        handleSize: 20, // 滑动条的 左右2个滑动条的大小
        height: 24, // 组件高度
        show: false,
        start: 0,
        bottom: 0
      }],
      lineStyle: {
        normal: {
          type: 'solid',
          width: 2,
          color: '#1890FF'
        }
      },
      color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#D4EC59', '#B55CBD', '#2FB0D2', '#668ED6'],
      pickerOptions: {
        // eslint-disable-next-line space-before-function-paren
        disabledDate(time) {
          return time.getTime() > (Date.now()) // 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      optionsTime: [{
          value: '4',
          label: '最近1天'
        },
        {
          value: '7',
          label: '最近7天'
        },
        {
          value: '8',
          label: '最近30天'
        }
      ],
      defaultProps: {
        id: 'id',
        label: 'labelName',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
    Vue.prototype.$sma = function (arr) {
      // if (store.get('smaFlag')) {
      //   for (let i = 0; i < 4; i++) {
      //     arr.unshift(arr[0])
      //   }
      //   return sma(arr, 5)
      // } else {
      //   return arr
      // }
      return arr
    }
    Vue.prototype.$format = function (val, noSecond, noYear, symbol = '-', greenLocationFlag) {
      if (val) {
        let date = greenLocationFlag ? new Date(val) : new Date(parseInt(val)),
          month = date.getMonth() + 1,
          currentdate, strDate, hour, min, second;
        month = month.toString().length === 1 ? '0' + month.toString() : month
        strDate = date.getDate()
        strDate =
          strDate.toString().length === 1 ? '0' + strDate.toString() : strDate
        hour =
          date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()
        min =
          date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()
        second = date.getSeconds().toString().length === 1 ? '0' + date.getSeconds() : date.getSeconds()
        if (noSecond) {
          if (noYear) {
            currentdate = `${month}${symbol}${strDate} ${hour}:${min}`
          } else {
            currentdate = `${date.getFullYear()}${symbol}${month}${symbol}${strDate} ${hour}:${min}`
          }
        } else {
          if (noYear) {
            currentdate = `${month}${symbol}${strDate} ${hour}:${min}:${second}`
          } else {
            currentdate = `${date.getFullYear()}${symbol}${month}${symbol}${strDate} ${hour}:${min}:${second}`
          }
        }
        return currentdate
      } else {
        return '/'
      }
    }
    Vue.prototype.$setNum = function (num = 0, unit, digits, stringFlag) {
      let str, dig = Math.pow(10, digits || 2)
      num = Number(num)
      if (num == 0) {
        str = stringFlag ? '0' : 0 + (unit || '')
      } else if (num > 0) {
        str = stringFlag ? parseInt(num * dig) / dig : parseInt(num * dig) / dig + (unit || '')
      } else {
        str = '/'
      }
      return str
    }
    Vue.prototype.$formatterTitle = function (color) {
      return `style="display: inline-block;width:10px;height:10px;background-color: ${color}"`
    }
  }
}

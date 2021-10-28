const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    userName: 'peterwu0987',
    nickName: '高雄發大財',
    hiwalletMoney: '10,213',
    loginPassword: '****',
    payPassword: '****',
    hiwalletCard:'20',
    bankCard:'20',
    payObject:'20',
    status: 'normal',
    avatar:'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
    avatarStatus:'done',
    hiwalletList:[
      { userName: 'HW132202091', note: '好友1'},
      { userName: 'HW132202092', note: '好友2'},
      { userName: 'HW132202093', note: '好友3'},
      { userName: 'HW132202094', note: '好友4'},
      { userName: 'HW132202095', note: '好友5'},
      { userName: 'HW132202096', note: '好友6'},
      { userName: 'HW132202097', note: '好友7'},
      { userName: 'HW132202098', note: '好友8'}, 
      { userName: 'HW132202099', note: '好友9'}, 
      { userName: 'HW132202100', note: '好友10'}, 
      { userName: 'HW132202101', note: '好友11'},
      { userName: 'HW132202102', note: '好友12'},
      { userName: 'HW132202103', note: '好友13'},
      { userName: 'HW132202104', note: '好友14'},
      { userName: 'HW132202105', note: '好友15'},
      { userName: 'HW132202106', note: '好友16'},
      { userName: 'HW132202107', note: '好友17'},
      { userName: 'HW132202108', note: '好友18'}, 
      { userName: 'HW132202109', note: '好友19'}, 
      { userName: 'HW132202110', note: '好友20'}, 
    ],
    bankList:[
      { userName: '國泰-22903029302', note: '金主1'},
      { userName: '國泰-22903029303', note: '金主2'},
      { userName: '國泰-22903029304', note: '金主3'},
      { userName: '國泰-22903029305', note: '金主4'},
      { userName: '國泰-22903029306', note: '金主5'},
      { userName: '國泰-22903029307', note: '金主6'},
      { userName: '國泰-22903029308', note: '金主7'},
      { userName: '國泰-22903029309', note: '金主8'},
      { userName: '國泰-22903029310', note: '金主9'},
      { userName: '國泰-22903029311', note: '金主10'},
      { userName: '國泰-22903029312', note: '金主11'},
      { userName: '國泰-22903029313', note: '金主12'},
      { userName: '國泰-22903029314', note: '金主13'},
      { userName: '國泰-22903029315', note: '金主14'},
      { userName: '國泰-22903029316', note: '金主15'},
      { userName: '國泰-22903029317', note: '金主16'},
      { userName: '國泰-22903029318', note: '金主17'},
      { userName: '國泰-22903029319', note: '金主18'},
      { userName: '國泰-22903029320', note: '金主19'},
      { userName: '國泰-22903029321', note: '金主20'},
    ],
  },
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]

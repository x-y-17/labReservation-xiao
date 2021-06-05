import MockAdapter from "axios-mock-adapter"
import axios from "axios"

const mock = new MockAdapter(axios);
//过滤http前缀请求
mock.onGet(/^http/).passThrough();
mock.onGet(/^\/api\//).passThrough();

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
const resulVO: ResultVO = {
  code: 200,
  data: {}
};
const course = { name: 'web框架', teacherNum: '2' }
const schedule1 = { course: course, week: '1', day: '2', order: '3', state: false }
const scheduleArr = [];
const scheduleArr901 = [];
for(let i = 1;i<19;i++){
  for(let j = 1;j<8;j++){
    for(let k = 1;k<6;k++){
      scheduleArr901.push({week:i,day:j,order:k,state:true,course:'无'})
      if(i==1&&j==2&&k==3){
        scheduleArr901.pop();
        scheduleArr901.push(schedule1);
      }
    }
  }
}
for(let i = 1;i<19;i++){
  for(let j = 1;j<8;j++){
    for(let k = 1;k<6;k++){
      scheduleArr.push({week:i,day:j,order:k,state:true,course:'无'})
    }
  }
}
mock.onGet('lablist').reply(200, {
  code: 200,
  data: {
    labs: [
      {
        number: '901',
        computerNumber: '60',
        schedule: scheduleArr901
      },
      {
        number: '902',
        computerNumber: '40',
        schedule: scheduleArr,
      },
      {
        number: '903',
        computerNumber: '50',
        schedule: scheduleArr,
      }
    ],
  }
})
mock.onPost("login").reply(c => {
  // 获取请求数据
  // 此时请求的js对象已转为json字符串。因此需要转换回JS对象
  const data = c.data;
  const { number, password } = JSON.parse(data);
  if (number == "admin" && password == "admin") {
    resulVO.code = 200;
    resulVO.data = { role: "admin" };
    resulVO.message = "";
    return [
      200,
      resulVO,
      {
        token:
          "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6"
      }
    ];
  }
  if (number == "1001" && password == "1001") {
    resulVO.code = 200;
    resulVO.data = { role: "teacher" };
    resulVO.message = "";
    return [
      200,
      resulVO,
      {
        token:
          "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6"
      }
    ];
  }
  resulVO.code = 401;
  resulVO.message = "用户名密码错误";
  return [200, resulVO];
});
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
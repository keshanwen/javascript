import axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';
import { ElMessage } from 'element-plus';


const client: AxiosInstance = axios.create({
 // baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
  },
});
const CancelToken = axios.CancelToken;

/* 处理 token */
function handleToken(config: AxiosRequestConfig) {

  let token = localStorage.getItem('token');

  if (token) {
    config.headers.token = token;
  }
}

/* 处理异常提示 */
function handleErrorTips(error: AxiosError) {
    // 取消的请求，不报错
    if (axios.isCancel(error)) {
      console.log(error, 'error');
      return
    }
    switch (error.response?.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response?.status}`;
    }
    let text = '';
    if (error.response?.data?.message) {
      text = error.response.data.message;
    }
    ElMessage.error(text || error.message);
}


client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    handleToken(config);

    return config;
  },
  (error: AxiosError) => {
    // 对发送错误做些什么
    return Promise.reject(error);
  }
);


client.interceptors.response.use(
  (reponse: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    const { data } = reponse;
    const { code, message = '程序出错' } = data;
    // 这里的 code 是和后端约定好的，只返回 code === '200' 才算成功
    if (code == 200) {
      return reponse;
    }
    // 这里可以细分报错类型,针对不同错误，有不同的操作
    ElMessage.error(message);
    return Promise.reject(reponse)
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    handleErrorTips(error)
    return Promise.reject(error);
  }
);



export async function request<T = any>(url: string, config?: AxiosRequestConfig) {
  const response: AxiosResponse<T> = await client.request({
    url,
    ...config,
  });
  const { data } = response
  // 业务判断逻辑
  return data
}

export function withCancelToken(fetcher) {
  let abort;

  function send(data, config) {
    cancel();

    const cancelToken = new CancelToken((cancel) => (abort = cancel));
    return fetcher(data, {
      ...config,
      cancelToken,
    });
  }

  function cancel(message = abort) {
    if (abort) {
      abort(message);
      abort = null;
    }
  }

  return [send, cancel];
}

/*
  // 支持请求重试
  import axiosRetry from  axios-retry
  // 安装 retry 插件
  // 当请求失败后，自动重新请求，只有3次失败后才真正失败
  axiosRetry(client, { retries: 3 })
  // axios-retry 插件支持配置单个请求
*/


/*
  // 跨域 jsop 请求
  import jsonpAdapter from axios-jsonp

  // adapter 适配器，处理请求。 adapter 做了一件事非常简单，就是根据不同的环境 使用不同的请求。如果用户自定义了 adapter, 就用 config.adapter,否则就是默认的 default.adapter

  export function jsonp(url: string, config?: AxiosRequestConfig) {
    return request(url, {
      ...config,
      adapter: jsonpAdapter,
    });
  }

  // 你现在可以发送 jsonp 的请求了
  const data = jsonp( http://example.com/test-jsonp )

*/


/*
// 使用
function getUser(id: string, config?: AxiosRequestConfig) {
  return request(`api/user/${id}`, config)
}

// 包装请求函数
const [fetchUser, abortUser] = withCancelToken(getUser)

// 发送请求
// 如果上一次请求还没回来，会被自动取消
fetchUser(1000);

// 通常不需要主动调用
// 但可以在组件销毁的生命周期中调用
abortUser();
 */


/* interface Res {
  name: string
  age: number
}

const res = request<Res>('api/test').then((res) => {

}) */


// 其他页面中
/* async function getUserAPI<T = any>(params?: any,config?: AxiosRequestConfig) {
  return request<T>('/api/getUser', {
    method: 'get',
    params,
    ...config
  })
}

async function postUserAPI<T = any>(data?: any, config?: AxiosRequestConfig) {
  return request<T>('/api/getUser', {
    method: 'post',
    data,
    ...config,
  });
} */


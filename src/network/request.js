import axios from 'axios'
export function request(config, success, failure) {
    const instance = axios.create({
        basrURL: '/api',
        timeout: 8000
    })
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })
    return instance(config)
}
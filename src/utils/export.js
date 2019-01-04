import axios from "axios";
import { getToken } from "@/utils/auth";
export const exportXml = function(api, params, vm) {
    const instance = axios.create({
        baseURL: process.env.BASE_API,
        timeout: 1000,
        headers: {
            Authorization: getToken()
        },
        responseType: 'blob'
    })
    let that = vm
    instance
        .get(api, {
            params: params
        })
        .then(function(response) {
            const fileName = response.headers['content-disposition']
            let blob = new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = that.title + '.xls';
            link.click()
        })
        .catch(function(error) {
            if (error.response) {
                // 存在请求，但是服务器的返回一个状态码
                console.log(error.response)
            } else {
                // 一些错误是在设置请求时触发的
                console.log('Error', error.message)
            }
            console.log(error.config)
        })

}
export const printPdf = function(name, vm) {
    var t;
    vm.noprint = "noprint";
    vm.printWidth = "print-width";
    clearTimeout(t);
    t = setTimeout(function() {
        vm.$print(vm.$refs[name]);
        vm.noprint = "";
        vm.printWidth = "";
    }, 500);
}
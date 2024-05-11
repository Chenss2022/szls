import axios from 'axios';
import { JSEncrypt } from 'jsencrypt'
import dayjs from "dayjs";
import md5 from 'js-md5';
import {headersData} from "./sgSLZS.data";
export interface LoginParamVO {
    username?: string;
    password?: string;
    code?: string;
    key?: string;
    grantType: string;
    refreshToken?: string;
    mobile?: string;
}
//
// loginApi({
//     username: 'jiapeng001',
//     password: '123456',
//     grantType: "PASSWORD",
// })


export async function loginApi(params: LoginParamVO, mode?) {
    // @ts-ignore
    let {data: PublicKey} = await axios.get('http://119.188.240.66:46678/api/oauth/anyTenant/getPublicKey')
    let encrypt = new JSEncrypt()
    // @ts-ignore
    encrypt.setPublicKey(PublicKey.data)
    // @ts-ignore
    let RsaPassword: any = encrypt.encrypt(params['password'])
    let timeStamp = dayjs().unix()
    let md = md5(params.username + RsaPassword + PublicKey.data + timeStamp).toUpperCase()
    // @ts-ignore
    params = {...params, password: RsaPassword, sign: md, flowNum: timeStamp}
    return axios.post('http://119.188.240.66:46678/api/oauth/anyTenant/login',params,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'MjJxbGRsMndwNWs1M3cwcnB1cjIwZ2xjOnNrNDE2cHlweHF0eHJ1ZTFiYm45eTFycDNmdDcyM2tw'
        }
    }).then((res)=>{
        console.log('login',res)
        headersData.Token = res.data.data.token
        sessionStorage.setItem('Token',res.data.data.token)
    })
}

import axios from 'axios';

export let headersData = {
    'Authorization': 'MjJxbGRsMndwNWs1M3cwcnB1cjIwZ2xjOnNrNDE2cHlweHF0eHJ1ZTFiYm45eTFycDNmdDcyM2tw',
    'Content-Type': 'application/x-www-form-urlencoded',
    'applicationId':'358818150776569982',
    'Tenantid':'1',
    'Token':''
}

export let szlsData={
    weaterData:null,
    houseData:null,
    inventoryCapacity:null,
    inventoryAnalysis:null,
    locationInfoList:null,
    outStockInfo:null,
    inStockInfo:null,
    warnInfo:null,
}

export let handleItem={
    electronicStorageCard:null,
    inventoryAnalysisView:null,
    inStockInfoView:null,
    outStockInfoView:null,
    temperatureAndHumidityView:null,
}

/**
 * 页面初始话接口
 */
export function handleSzlsDta(){
    // console.log('Token',headersData.Token)
    let api = 'http://119.188.240.66:46678';
    // 天气
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/weather',
        {headers:headersData}).then((res)=>{
        if(res.data.code != 200 || res.data.code != 0){
            sessionStorage.setItem('Token','')
        }
        szlsData.weaterData = res.data
    });
    // 园区概览
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/overview',{headers:headersData}).then((res)=>{
        szlsData.houseData = res.data.data
    })
    // 库存容量统计
    axios.post(api+'/api/digitaltwin/digitalReservoirInfo/inventoryCapacity',{},{headers:headersData}).then((res)=>{
        szlsData.inventoryCapacity = res.data.data
    })
    // 库存分析
    axios.post(api+'/api/digitaltwin/digitalReservoirInfo/inventoryAnalysis',{},{headers:headersData}).then((res)=>{
        szlsData.inventoryAnalysis = res.data.data[0]
    })
    // 仓房list
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/locationInfo/list',{headers:headersData}).then((res)=>{
        szlsData.locationInfoList = res.data.data
        // config.data = res.data.data
    })
    // 入库情况
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/inStockInfo',{headers:headersData}).then((res)=>{
        szlsData.inStockInfo = res.data.data
    })
    // 出库情况
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/outStockInfo',{headers:headersData}).then((res)=>{
        szlsData.outStockInfo = res.data.data
    })
    // 告警分析
    axios.get(api+'/api/digitaltwin/digitalReservoirInfo/warnInfo',{headers:headersData}).then((res)=>{
        szlsData.warnInfo = res.data.data
    })
}


/**
 * 详情接口调用
 * @param data
 */
export function axiosItem(data){
    // 货位卡接口
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/electronicStorageCard',{hwdm:data},{headers:{...headersData,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.electronicStorageCard = res.data.data
    })
    // 库存分析
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inventoryAnalysis',{hwdm:data},{headers:{...headersData,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.inventoryAnalysisView = res.data
    })
    // 入库情况
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inStockInfo',{hwdm:data},{headers:{...headersData,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.inStockInfoView = res.data.data
    })
    // 出库情况
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/outStockInfo',{hwdm:data},{headers:{...headersData,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.outStockInfoView = res.data.data
    })
    // 粮情温度
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/temperatureAndHumidity',{hwdm:data},{headers:{...headersData,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.temperatureAndHumidityView = res.data.data
    })
}

import axios from 'axios';

export let headers = {
    'Authorization': 'MjJxbGRsMndwNWs1M3cwcnB1cjIwZ2xjOnNrNDE2cHlweHF0eHJ1ZTFiYm45eTFycDNmdDcyM2tw',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Tenantid':'358774221851067147',
    'Token':'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJDdXJyZW50Q29tcGFueUlkIjoiMzYzNjAxNDczMDMzOTk0NDg1IiwiQ3VycmVudERlcHRJZCI6IjM2MzU5OTI1MjUzNTkwMjQ1NyIsIlV1aWQiOiI2YTJmMzc3YjI0NDQ0MjQ4OTQ3YjExYjg0YTFkYjEyOCIsIlVzZXJJZCI6IjM1ODc3NDIyMTg1MTA2NzE0OCIsIkN1cnJlbnRUb3BDb21wYW55SWQiOiIzNjM2MDE0NzMwMzM5OTQ0ODUiLCJFbXBsb3llZUlkIjoiMzYzNjAwNTY2Nzk1ODk1NDE0IiwiaWF0IjoxNzExNjczNDM5LCJuYmYiOjE3MTE2NzM0MzksImV4cCI6MTcxMTcwMjIzOX0.yedviyJuydt4e0odKmGIN41LncII27orFFz0zgFD2OM'
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
    // 天气
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/weather',
        {headers:headers}).then((res)=>{
        szlsData.weaterData = res.data
    });
    // 园区概览
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/overview',{headers:headers}).then((res)=>{
        szlsData.houseData = res.data.data
    })
    // 库存容量统计
    axios.post('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inventoryCapacity',{},{headers:headers}).then((res)=>{
        szlsData.inventoryCapacity = res.data.data
    })
    // 库存分析
    axios.post('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inventoryAnalysis',{},{headers:headers}).then((res)=>{
        szlsData.inventoryAnalysis = res.data.data[0]
    })
    // 仓房list
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/locationInfo/list',{headers:headers}).then((res)=>{
        szlsData.locationInfoList = res.data.data
        // config.data = res.data.data
    })
    // 出库情况
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/outStockInfo',{headers:headers}).then((res)=>{
        szlsData.outStockInfo = res.data.data
    })
    // 入库情况
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inStockInfo',{headers:headers}).then((res)=>{
        szlsData.inStockInfo = res.data.data
    })
    // 告警分析
    axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/warnInfo',{headers:headers}).then((res)=>{
        szlsData.warnInfo = res.data.data
    })
}


/**
 * 详情接口调用
 * @param data
 */
export function axiosItem(data){
    // 货位卡接口
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/electronicStorageCard',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.electronicStorageCard = res.data.data
    })
    // 库存分析
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inventoryAnalysis',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.inventoryAnalysisView = res.data
    })
    // 入库情况
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inStockInfo',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.inStockInfoView = res.data.data
    })
    // 出库情况
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/outStockInfo',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.outStockInfoView = res.data.data
    })
    // 粮情温度
    axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/temperatureAndHumidity',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        handleItem.temperatureAndHumidityView = res.data.data
    })
}

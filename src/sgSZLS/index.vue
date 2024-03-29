<template>
  <div id="canvasFor" class="canvasFor">
    <dv-border-box11 title="山东粮食储备库" :title-width="400" :animate="true" :color="['rgb(0,219,245)', 'rgb(33,63,70)']">
      <dv-border-box13 class="dv-border-box-13-wd" :backgroundColor="Data.backGroundColor">
        <div style="margin-top: 2vh;">
          <div>环境温度(°c): {{ Data.weaterData?.data?.ambientTemperature || '--' }} 风速：{{Data.weaterData?.data?.windSpeed || '--'}}风向: {{ Data.weaterData?.data?.windDirection || '--' }} PM2.5: {{ Data.weaterData?.data?.pm25 || '--' }} </div>
          <div>环境湿度:{{ Data.weaterData?.data?.ambientHumidity || '--' }} 大气压强(KPa): {{ Data.weaterData?.data?.pressure || '--' }} PM10: {{ Data.weaterData?.data?.pm10 || '--' }}</div>
        </div>
      </dv-border-box13>
<!--      园区概览-->
      <dv-border-box8 class="dv-border-box-8-yqgl" v-if="!Data.winOpenClose" :dur="5" :backgroundColor="Data.backGroundColor">
       <div class="dv-border-box-8-yqgl-border">
        <div>园区概览</div>
        <div>
          管理人员总数: <span>{{ Data.houseData?.managerCount || '--' }} 人</span>
        </div>
        <div>
          仓房总数: <span>{{ Data.houseData?.warehouseCount || '--' }} 个</span>
        </div>
        <div>
          仓容总量: <span>{{ Data.houseData?.warehouseCapacity || '--' }} 吨</span>
        </div>
        <div>
          各类粮食储存量: <span>{{ Data.houseData?.inventoryCount || '--' }} 吨</span>
        </div>
       </div>
      </dv-border-box8>
      <div v-if="!Data.winOpenClose" class="kcrltj">
        <div style="color:white;">库存容量统计</div>
        <div style="display: flex;flex-flow: row;">
          <dv-decoration-9 style="width:150px;height:150px;">
            <div font-600 class="content" bg="~ dark/0" style="color: white;">
              {{Data.inventoryCapacity?.totalCapacity || '--'}}
              <div>总量[吨]</div>
            </div>
          </dv-decoration-9>
          <div style="margin-top: 5vh;margin-left: 1vw;">
            <div>存量: {{ Data.inventoryCapacity?.stocksPercentage*100 || '--' }}% <span>{{ Data.inventoryCapacity?.stocks || '--'}}</span> </div>
            <div style="margin-top: 1vh;">余量: {{ Data.inventoryCapacity?.remaindersPercentage*100 || '--' }}% <span>{{ Data.inventoryCapacity?.remainders || '--' }}</span> </div>
          </div>
        </div>
      </div>
      <dv-border-box8 class="dv-border-box-8-kcfx" v-if="!Data.winOpenClose" :dur="5" :backgroundColor="Data.backGroundColor">
       <div class="dv-border-box-8-kcfx-border">
        <div>库存分析</div>
        <div>
          大豆: <span>{{ Data.inventoryAnalysis?.soybean || '--' }} 吨</span>
        </div>
        <div>
          小麦: <span>{{ Data.inventoryAnalysis?.wheats || '--' }} 吨</span>
        </div>
        <div>
          玉米: <span>{{ Data.inventoryAnalysis?.rices || '--' }} 吨</span>
        </div>
        <div>
          高粱: <span>{{ Data.inventoryAnalysis?.corns || '--' }} 吨</span>
        </div>
       </div>
      </dv-border-box8>
      <!-- <div style="position: absolute;bottom: 5vh;left:2vw;width: 30rem;height: 15rem;padding: 3px;display: flex;justify-content: center;align-items: center;">
          <dv-scroll-ranking-board :config="Data" style="width:500px;height:300px;padding: 3px" />
      </div> -->
      <dv-border-box13 class="dv-border-box-13-time" :backgroundColor="Data.backGroundColor">
        <div style="margin-top: 2vh;">
          <div>{{ Data.DayJs.format('YYYY年MM月DD日 dddd HH:mm:ss') }}</div>
        </div>
      </dv-border-box13>
      <dv-border-box8 class="dv-border-box-8-cflb" v-if="!Data.winOpenClose" :reverse="true" :backgroundColor="Data.backGroundColor">
        <dv-scroll-board ref="scrollBoard" :config="config" style="margin: 9px auto;width:400px;height:220px;pointer-events: auto;cursor: pointer;" @click="clicklocationInfoItem" />
      </dv-border-box8>
      <dv-decoration3 v-if="!Data.winOpenClose" style="position:absolute;top:40vh;right: 4vw;width:350px;height:30px;"/>
      <dv-border-box1 class="dv-border-box-1-crkqk" v-if="!Data.winOpenClose" ref="borderRef" :backgroundColor="Data.backGroundColor">
        <div>出入库情况</div>
        <dv-decoration5 :dur="2" style="margin: 0 auto;width:300px;height:40px;margin-top: -2.5vh;" />
        <div>
          <div class="dv-border-box-1-crkqk-title">
            <dv-button :bg="true" @click="Data.crkqkckNumber-- <= 0 ? Data.crkqkckNumber = 0: Data.crkqkckNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">《</dv-button>
            <div>出库</div>
            <dv-button :bg="true" @click="Data.crkqkckNumber++ >= Data.outStockInfo.length-1 ? Data.crkqkckNumber=Data.outStockInfo.length-1:Data.crkqkckNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">》</dv-button>
          </div>
          <div>粮食品种：{{ Data.outStockInfo[Data.crkqkckNumber]?.echoMap?.grainType  || '--'}}</div>
          <div>最后出库时间：{{ Data.outStockInfo[Data.crkqkckNumber]?.lastOutStockTime || '--' }}</div>
          <div>累计出库量：{{ Data.outStockInfo[Data.crkqkckNumber]?.totalOutStockCount || '--' }} 出库车次：{{ Data.outStockInfo[Data.crkqkckNumber]?.outStockTimes || '--' }}</div>
        </div>
        <div>
          <div class="dv-border-box-1-crkqk-title">
            <dv-button :bg="true" @click="Data.crkqkrkNumber-- <= 0 ? Data.crkqkrkNumber = 0: Data.crkqkrkNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">《</dv-button>
            <div>入库</div>
            <dv-button :bg="true" @click="Data.crkqkrkNumber++ >= Data.inStockInfo.length-1 ? Data.crkqkrkNumber=Data.inStockInfo.length-1:Data.crkqkrkNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">》</dv-button>
          </div>
          <div>粮食品种：{{ Data.inStockInfo[Data.crkqkrkNumber]?.echoMap?.grainType || '--' }}</div>
          <div>最后入库时间：{{ Data.inStockInfo[Data.crkqkrkNumber]?.lastInStockTime || '--' }}</div>
          <div>累计入库量：{{ Data.inStockInfo[Data.crkqkrkNumber]?.totalInStockCount || '--' }} 入库车次：{{ Data.inStockInfo[Data.crkqkrkNumber]?.inStockTimes || '--' }}</div>
        </div>
      </dv-border-box1>
      <div class="gjfx" v-if="!Data.winOpenClose">
        <div>告警分析</div>
        <div style="display: flex;flex-flow: row;">
          <dv-decoration-12 style="width:150px;height:150px;margin-top: 2vh;">{{Data.warnInfo?.totalCount}}</dv-decoration-12>
          <div style="margin-top: 3vh;margin-left: 1vw;">
            <div>初期异常: {{ Data.warnInfo?.inventoryOverrun}} <span>{{ Data.warnInfo?.inventoryOverrunPercentage*100}}%</span> </div>
            <div style="margin-top: 1vh;">需注意: {{ Data.warnInfo?.humidity}} <span>{{ Data.warnInfo?.humidityPercentage*100}}%</span> </div>
            <div style="margin-top: 1vh;">重点关注: {{ Data.warnInfo?.pest}} <span>{{ Data.warnInfo?.pestPercentage*100}}%</span> </div>
            <div style="margin-top: 1vh;">严重警告: {{ Data.warnInfo?.temperature}} <span>{{ Data.warnInfo?.temperaturePercentage*100}}%</span> </div>
          </div>
        </div>
      </div>
      <dv-button :bg="true" @click="reserves" style="pointer-events: auto;position: absolute;bottom: 3vh;right: 53vw;" :color="'rgb(0,219,245)'">复位</dv-button>
      <dv-button :bg="true" @click="showFalse" style="pointer-events: auto;position: absolute;bottom: 3vh;right: 45vw;" :color="'rgb(0,219,245)'">{{Data.showFalseBoo == true?'标签显隐':'标签显示'}}</dv-button>
    </dv-border-box11>
    <!-- 详情显示库存容量 -->
    <dv-border-box8 class="dv-border-box-8-xqkcrl" v-if="Data.winOpenClose" :dur="5" :backgroundColor="Data.backGroundColor">
      <div style="display: flex;flex-flow: column;justify-content: space-around;height: 100%;">
      <div>库存分析</div>
      <div>
        大豆: <span>{{ Data.inventoryAnalysisView?.soybean || '0.000' }} 吨</span>
      </div>
      <div>
        小麦: <span>{{ Data.inventoryAnalysisView?.wheats || '0.000' }} 吨</span>
      </div>
      <div>
        玉米: <span>{{ Data.inventoryAnalysisView?.rices || '0.000' }} 吨</span>
      </div>
      <div>
        高粱: <span>{{ Data.inventoryAnalysisView?.corns || '0.000' }} 吨</span>
      </div>
      </div>
    </dv-border-box8>
    <!-- 详情显示出入库信息 -->
    <dv-border-box1 class="dv-border-box-1-xqcrkqk" v-if="Data.winOpenClose" ref="borderRef" :backgroundColor="Data.backGroundColor">
      <div>出入库情况</div>
      <dv-decoration5 :dur="2" style="margin: 0 auto;width:300px;height:40px;margin-top: -2.5vh;" />
      <div style="line-height: 4vh;">
        <div class="dv-border-box-1-xqcrkqk-title">
          <dv-button :bg="true" @click="Data.crkqkckItemNumber-- <= 0 ? Data.crkqkckItemNumber = 0: Data.crkqkckItemNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">《</dv-button>
          <div>出库</div>
          <dv-button :bg="true" @click="Data.crkqkckItemNumber++ >= Data.outStockInfoView.length-1 ? Data.crkqkckItemNumber=Data.outStockInfoView.length-1:Data.crkqkckItemNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">》</dv-button>
        </div>
        <div>粮食品种：{{ Data.outStockInfoView[Data.crkqkckItemNumber]?.echoMap?.grainType }}</div>
        <div>最后出库时间：{{ Data.outStockInfoView[Data.crkqkckItemNumber]?.lastOutStockTime }}</div>
        <div>累计出库量：{{ Data.outStockInfoView[Data.crkqkckItemNumber]?.totalOutStockCount }} 出库车次：{{ Data.outStockInfoView[Data.crkqkckItemNumber]?.outStockTimes }}</div>
      </div>
      <div style="margin-top: 7vh;line-height: 4vh;">

        <div class="dv-border-box-1-xqcrkqk-title">
          <dv-button :bg="true" @click="Data.crkqkrkItemNumber-- <= 0 ? Data.crkqkrkItemNumber = 0: Data.crkqkrkItemNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">《</dv-button>
          <div>入库</div>
          <dv-button :bg="true" @click="Data.crkqkrkItemNumber++ >= Data.inStockInfoView.length-1 ? Data.crkqkrkItemNumber=Data.inStockInfoView.length-1:Data.crkqkrkItemNumber" border="Border2" :color="'rgb(0,219,245)'" style="pointer-events: auto;cursor: pointer;">》</dv-button>
        </div>
        <div>粮食品种：{{ Data.inStockInfoView[0]?.echoMap?.grainType }}</div>
        <div>最后入库时间：{{ Data.inStockInfoView[0]?.lastInStockTime }}</div>
        <div>累计入库量：{{ Data.inStockInfoView[0]?.totalInStockCount }} 入库车次：{{ Data.inStockInfoView[0]?.inStockTimes }}</div>
      </div>
    </dv-border-box1>
    <!-- 详情显示货位卡 -->
    <dv-border-box1 class="dv-border-box-1-xqhwk" v-if="Data.winOpenClose" ref="borderRef" :backgroundColor="Data.backGroundColor">
      <div>货位卡信息</div>
      <span @click="returnView" style="position: absolute;top: 1vh;right: 1.5vw;color: aquamarine;cursor: pointer;user-select: none;">返回</span>
      <dv-decoration5 :dur="2" style="margin: 0 auto;width:300px;height:40px;margin-top: -2.5vh;" />
      <div style="line-height: 3.3vh">
        {{ Data.electronicStorageCard?.warehouseName }}货位卡
        <div>仓房名称：{{ Data.electronicStorageCard?.warehouseName }}</div>
        <div>廒间名称：{{ Data.electronicStorageCard?.warehouseName }}-1号廒间</div>
        <div>货位名称：{{ Data.electronicStorageCard?.locationName }}</div>
        <div>货位(油罐)状态：{{ Data.electronicStorageCard?.echoMap?.locationStatus }}</div>
        <div>仓房类型：{{ Data.electronicStorageCard?.totalOutStockCount }}</div>
        <div>仓房容量：{{ Data.electronicStorageCard?.locationCapacity }}</div>
        <div>保管员：{{ Data.electronicStorageCard?.custodian }}</div>
        <div>管理方式：{{ Data.electronicStorageCard?.echoMap?.manageStyle }}</div>
        <div>储粮方式：{{ Data.electronicStorageCard?.echoMap?.storageMethod }}</div>
        <div>货位容量：{{ Data.electronicStorageCard?.warehouseCapacity }}</div>
        <div>实际数量：{{ Data.electronicStorageCard?.actualCount }}</div>
        <div>计价数量：{{ Data.electronicStorageCard?.priceCount }}</div>
        <div>收获年度：{{ Data.electronicStorageCard?.receiptYear }}</div>
        <div>产地：{{ Data.electronicStorageCard?.echoMap?.producingArea }}</div>
        <div>粮食品种：{{ Data.electronicStorageCard?.echoMap?.grainType }}</div>
        <div>粮食性质：{{ Data.electronicStorageCard?.echoMap?.grainNature }}</div>
        <div>粮食等级：{{ Data.electronicStorageCard?.echoMap?.grainLevel }}</div>
        <div>入仓时间：{{ Data.electronicStorageCard?.entryTime }}</div>
        <div>封仓时间：{{ Data.electronicStorageCard?.closeDate }}</div>
        <div>清仓时间：{{ Data.electronicStorageCard?.closeDate }}</div>
      </div>
    </dv-border-box1>
    <!-- 弹窗 -->
    <dv-border-box12 class="dv-border-box-12-tclqxx" v-show="Data.winOpenClose ||Data.cameraDataFoo" :backgroundColor="Data.backGroundColor">
      <!-- 粮情信息 -->
      <div v-if="!Data.cameraDataFoo">
        <div style="display: flex;justify-content: space-between;margin: 0 1vw;font-size: 1.5rem;color: white;">
          <div style="color: white;">粮情信息</div>
          <div style="cursor: pointer;user-select: none;" @click="closewin">X</div>
        </div>
        <div style="line-height: 10vh;color: white;">
          <div>最高粮温：{{ Data.temperatureAndHumidityView?.max }}</div>
          <div>最低粮温：{{ Data.temperatureAndHumidityView?.min }}</div>
          <div>平均粮温：{{ Data.temperatureAndHumidityView?.avg }}</div>
        </div>
      </div>
      <!-- 摄像头 -->
      <div v-else>
        <div style="display: flex;justify-content: space-between;margin: 0 1vw;font-size: 1.5rem;color: white;">
          <div style="color: white;">监控</div>
          <div style="cursor: pointer;user-select: none;" @click="closewin">X</div>
        </div>
        <div style="margin: 0 auto;width: 100%;height: 100%;">
          <video :src="Data.cameraData?.fmp4" style="width: 97%;height: 97%;" autoplay></video>
        </div>
      </div>
    </dv-border-box12>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted,reactive } from "vue";
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';
import Mesh = BABYLON.Mesh;
import 'dayjs/locale/zh-cn';
import dayjs from "dayjs";
import axios from "axios";
import {axiosItem, handleItem, handleSzlsDta, headers, szlsData} from "./sgSLZS.data";

export default defineComponent({
  computed:{},
  setup(){
    onMounted(()=>{
      init();
      var element = document.getElementById('bubble');
      if (element) {
        element.remove();
      }
      handleSzlsDta();
    })
    /**
     * 数据
     */
    const Data = reactive({
      DayJs:dayjs(),
      weaterData:<any>{},
      houseData:<any>{},
      inventoryCapacity:<any>{},
      inventoryAnalysis:<any>{},
      locationInfoList:<any>{},
      outStockInfo:<any>{},
      inStockInfo:<any>{},
      warnInfo:<any>{},
      winOpenClose:false,
      electronicStorageCard:<any>{},
      inventoryAnalysisView:<any>{},
      inStockInfoView:<any>{},
      outStockInfoView:<any>{},
      temperatureAndHumidityView:<any>{},
      cameraData:<any>{},
      cameraDataFoo:<any>false,
      // nameData: <any>null,
      showFalseBoo:<any>false,
      backGroundColor:'rgba(48,81,93,.5)',
      crkqkckNumber:0,
      crkqkrkNumber:0,
      crkqkckItemNumber:0,
      crkqkrkItemNumber:0,
    });

    /**
     * 仓房列表数据
     */
    const config = reactive({
      // header: ['列1'],
      data:  [
      ],
      // index: true,
      columnWidth: [100],
      align: ['center'],
      oddRowBGC:'#cccccc05',
      evenRowBGC:'#cccccc05',
    })

    /**
     * 更新时间
     */
    setInterval(()=>{
      Data.DayJs = dayjs()
    },1000)

    /**
     * 初始化
     */
    let scene:any = null;
    let camera:any = null;
    let engine:any = null;
    var bubble:any = null;
    let isDragging = false;
    function init() {
      // 创建场景承接元素
      let canvasFor:any = document.getElementById('canvasFor');
      let canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasFor.appendChild(canvas)
      engine = new BABYLON.Engine(canvas,true)

      // 创建场景
      scene = new BABYLON.Scene(engine);

      // 相机
      camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
      camera.setPosition(new BABYLON.Vector3(0, 200, 370));
      camera.attachControl(canvas, true);
      camera.speed = 0.3;

      // 灯光
      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
      light.intensity = 0.7

      // 创建天空盒
      const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 2000.0 }, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox", scene);
      // skyboxMaterial.reflectionTexture = new BABYLON.HDRCubeTexture("images/scythian4k.hdr", scene, 2000);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;

      /**
       * 存储所有gui
       */
      let planes:any = [];
      for(let i = 1;i<=14;i++){
        // 创建gui载体
        var plane = BABYLON.Mesh.CreatePlane("plane_"+i,1,scene);
        plane.scaling = new BABYLON.Vector3(1, 2, 2);
        plane.position.y = -3;
        plane.rotation.x = Math.PI;
        // 创建GUI元素
        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        // 创建GUI元素
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane,80,60);
        const image = new GUI.Image('but', './images/pnging.jpg');

        // 设置精灵图中要显示的图像的位置和大小
        image.width = "30px";
        image.height = "60px";

        advancedTexture.addControl(image);
        planes.push(plane)
      }

      // 仓名显示
      let textPlanes = [];
      for (let i = 1;i<=14;i++){
        var textPlane = BABYLON.Mesh.CreatePlane("textPlane"+i,1,scene);
        textPlane.scaling = new BABYLON.Vector3(1, 2, 2);
        textPlane.position.y = -3;
        textPlane.position.x = 0.8;
        textPlane.rotation.x = Math.PI;
        // 创建GUI元素
        textPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        // 创建GUI元素
        const textAdvancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(textPlane,80,60);

        const text1 = new GUI.TextBlock();
        text1.text = `仓${i}`;
        text1.color = "black";
        text1.fontSize = 20;
        textAdvancedTexture.addControl(text1);
        textPlanes.push(textPlane)
      }


      // 办公楼GUI
      var louPlane = BABYLON.Mesh.CreatePlane("louPlane", 2,scene);
      louPlane.position.y = -2;
      louPlane.rotation.x = Math.PI;
      louPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

      var louAdvancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(louPlane);

      var louButton = GUI.Button.CreateSimpleButton("louPlane", "办公楼");
      louButton.width = 1;
      louButton.height = 0.4;
      louButton.color = "black";
      louButton.fontSize = 200;
      louButton.background = "transparent";
      louAdvancedTexture.addControl(louButton);

      // 应急救灾楼GUI
      var yjjzPlane = BABYLON.Mesh.CreatePlane("yjjzPlane", 10,scene);
      yjjzPlane.position.y = -7;
      yjjzPlane.position.z = -10;
      yjjzPlane.rotation.x = Math.PI;
      yjjzPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

      var yjjzAdvancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(yjjzPlane,1500);

      var yjjzButton = GUI.Button.CreateSimpleButton("yjjzPlane", "应急救灾物资楼");
      yjjzButton.width = 1.6;
      yjjzButton.height = 0.4;
      yjjzButton.color = "black";
      yjjzButton.fontSize = 200;
      yjjzButton.background = "transparent";
      yjjzAdvancedTexture.addControl(yjjzButton);

      // 一站式服务中心GUI
      var yzsfwPlane = BABYLON.Mesh.CreatePlane("yzsfwPlane", 2,scene);
      yzsfwPlane.position.y = -3;
      yzsfwPlane.rotation.x = Math.PI;
      yzsfwPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

      var yzsfwAdvancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(yzsfwPlane,2300,600);

      var yzsfwButton = GUI.Button.CreateSimpleButton("yzsfwPlane", "一站式服务中心");
      yzsfwButton.width = 0.9;
      yzsfwButton.height = 0.7;
      yzsfwButton.color = "black";
      yzsfwButton.fontSize = 200;
      yzsfwButton.background = "transparent";
      yzsfwAdvancedTexture.addControl(yzsfwButton);

      BABYLON.SceneLoader.Append("images/", "库区模型.glb", scene,(sceneData)=>{
        let canvasFor1:any = document.getElementById('canvasFor');
        bubble = document.createElement('div');
        bubble.setAttribute('id', 'bubble');
        canvasFor1.appendChild(bubble);

        /**
         * 渲染数据
         */
        Data.weaterData = szlsData.weaterData;
        Data.houseData = szlsData.houseData;
        Data.inventoryCapacity = szlsData.inventoryCapacity;
        Data.inventoryAnalysis = szlsData.inventoryAnalysis;
        Data.outStockInfo = szlsData.outStockInfo;
        Data.inStockInfo = szlsData.inStockInfo;
        Data.warnInfo = szlsData.warnInfo;
        config.data = szlsData.locationInfoList;

        louPlane.parent = scene.getMeshByName("main_primitive0");
        yjjzPlane.parent = scene.getMeshByName("窗户.001_primitive15");
        yzsfwPlane.parent = scene.getMeshByName("主屋_primitive0");
        scene.getMeshByName("main_primitive0")._children[0].isVisible = false;
        scene.getMeshByName("窗户.001_primitive15")._children[0].isVisible = false;
        scene.getMeshByName("主屋_primitive0")._children[0].isVisible = false;

        // 将摄像头GUI元素附加到仓房
        for(let j = 1;j<=14;j++){
          textPlanes[j-1].parent = scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${j}`)[0]
          planes[j-1].parent = scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${j}`)[0]
          scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${j}`)[0]._children.filter((item)=> item.name == `plane_${j}`)[0].isVisible = false;
        }
      },(error)=>{
      });


      var highlightLayer = new BABYLON.HighlightLayer("highlightLayer", scene);
      var highlightedMesh:any;

      /**
       * 用事件监听的方式做事件
       */
      scene.onPointerObservable.add((eventData)=>{
        /*
          POINTERDOWN：当鼠标按下时触发。
          POINTERUP：当鼠标释放时触发。
          POINTERMOVE：当鼠标移动时触发。
          POINTERWHEEL：当鼠标滚轮滚动时触发。
          POINTERPICK：当指针与场景中的物体发生交互（拾取）时触发。
         */
        if(eventData.type === BABYLON.PointerEventTypes.POINTERMOVE){
        }else if(eventData.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          // Data.nameData = eventData._pickInfo.pickedMesh.name
          Data.winOpenClose = false
          // 销毁之前的DOM元素
          var previousBubble = document.getElementById('bubble');
          if (previousBubble) {
            previousBubble.remove();
          }
        }else if(eventData.type === BABYLON.PointerEventTypes.POINTERPICK){
          const evt = eventData.event;
          const pickResult = eventData.pickInfo;
          if(!isDragging){
              if (evt.button === 0) {
                if (pickResult.pickedMesh?.name !== 'ground' && pickResult.pickedMesh?.name !== 'skyBox' && (pickResult.pickedMesh?.name.substring(0, 1) == '仓' || pickResult.pickedMesh?.name.substring(0, 5) == 'plane')) {
                  console.log(scene,pickResult)
                  changePostion(pickResult)
                  let cangNumber = null;
                  if(pickResult.pickedMesh?.name.substring(0, 1) == '仓'){
                    // 暂时存储仓房编号
                    cangNumber = pickResult.pickedMesh?.name.split('_')[0].substring(1)<10? '0'+pickResult.pickedMesh?.name.split('_')[0].substring(1) : pickResult.pickedMesh?.name.split('_')[0].substring(1);
                    if(pickResult.pickedMesh?.name.split('_')[0] == `仓${pickResult.pickedMesh?.name.split('_')[0].substring(1)}`){
                      axiosItem(`91370783797346550100100${cangNumber}00101`)
                      scene.beginAnimation(camera, 0, 50, false,1.0,function(){

                        // 动画结束后执行
                        // openWin(evt,pickResult)'
                        Data.cameraDataFoo = false;
                        Data.winOpenClose = true;
                        for (let i = 0; i < scene.meshes.length; i++) {
                          if (scene.meshes[i].name !== 'skyBox' && scene.meshes[i].name.split('_')[0] !== pickResult.pickedMesh?.name.split('_')[0]){
                            scene.meshes[i].isVisible = false;
                          }
                        }
                      });
                      setTimeout(()=>{
                        Data.electronicStorageCard = handleItem.electronicStorageCard;
                        Data.inventoryAnalysisView = handleItem.inventoryAnalysisView;
                        Data.inStockInfoView = handleItem.inStockInfoView;
                        Data.outStockInfoView = handleItem.outStockInfoView;
                        Data.temperatureAndHumidityView = handleItem.temperatureAndHumidityView;
                      },1000)
                    }
                  }else if(pickResult.pickedMesh?.name.substring(0, 5) == 'plane'){
                    // 暂时存储仓房编号
                    cangNumber = pickResult.pickedMesh?.name.split('_')[1]<10? '0'+pickResult.pickedMesh?.name.split('_')[1] : pickResult.pickedMesh?.name.split('_')[1];
                    if(pickResult.pickedMesh?.name == `plane_${pickResult.pickedMesh?.name.split('_')[1]}`){
                      axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=3200000${cangNumber}`,{headers:headers}).then((res)=>{
                        Data.cameraData = res.data.data[0]
                      })
                      scene.beginAnimation(camera, 0, 50, false,1.0,function(){

                        // 动画结束后执行
                        // openWin(evt,pickResult)'
                        Data.cameraDataFoo = true;
                      });
                    }
                  }

                }else {
                  //  动画停止
                  scene.stopAnimation(camera)
                  // 销毁之前的DOM元素
                  var previousBubble = document.getElementById('bubble');
                  if (previousBubble) {
                    previousBubble.remove();
                  }
                }
              }
            }
        }
      })

      engine.runRenderLoop(() => {
        scene.render();
      });
      window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        engine.resize();
      });
    }

    /**
     * 拉近仓房动画
     */
    function changePostion(pickResult: any) {
      if (pickResult.hit) {
        // 切换相机位置和目标点到斜上方
        var targetPosition = new BABYLON.Vector3(
            pickResult.pickedMesh._absolutePosition.x,
            pickResult.pickedMesh._absolutePosition.y + 100,
            pickResult.pickedMesh._absolutePosition.z + 100
        );
        var target = pickResult.pickedMesh._absolutePosition.clone();

        // 创建动画来平滑地移动相机位置和目标点
        var animationPosition = new BABYLON.Animation(
            "animationPosition",
            "position",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        var animationTarget = new BABYLON.Animation(
            "animationTarget",
            "target",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var keysPosition = [
          {frame: 0, value: camera.position.clone()},
          {frame: 50, value: targetPosition}
        ];
        var keysTarget = [
          {frame: 0, value: camera.target.clone()},
          {frame: 50, value: target}
        ];

        animationPosition.setKeys(keysPosition);
        animationTarget.setKeys(keysTarget);

        // 使用缓动动画函数添加更加平滑的移动效果
        animationPosition.setEasingFunction(new BABYLON.CubicEase());
        animationTarget.setEasingFunction(new BABYLON.CubicEase());

        camera.animations = [];  // 清空之前的动画
        camera.animations.push(animationPosition);
        camera.animations.push(animationTarget);

        scene.beginAnimation(camera, 0, 50, false);
      }
    }

    /**
     * 复位
     */
    function reserves(){
      // for(let i = 1;i<=14;i++){
      //   scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${i}`)[0]._children.filter((item)=> item.name == `plane_${i}`)[0].isVisible = false;
      // }
      Data.showFalseBoo = false;
      Data.winOpenClose = false
      Data.cameraDataFoo=false
      camera.setTarget(new BABYLON.Vector3(0, 0, 0))

      const reservePostion = new BABYLON.Vector3(0, 200, 370);
      const reserveRotation = new BABYLON.Vector3(0, Math.PI, 0);
      // 创建动画
      var animationPosition = new BABYLON.Animation(
          "cameraAnimationPosition",
          "position",
          30,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      var keysPosition = [
        { frame: 0, value: camera.position.clone() },
        { frame: 50, value: reservePostion }
      ];
      animationPosition.setKeys(keysPosition);

      var animationRotation = new BABYLON.Animation(
          "cameraAnimationRotation",
          "rotation",
          30,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      var keysRotation = [
        { frame: 0, value: camera.rotation.clone() },
        { frame: 50, value: reserveRotation }
      ];
      animationRotation.setKeys(keysRotation);

      // 创建动画组
      camera.animations = [];
      var animationGroup = new BABYLON.AnimationGroup("cameraAnimationGroup");
      animationGroup.addTargetedAnimation(animationPosition, camera);
      animationGroup.addTargetedAnimation(animationRotation, camera);

      // 启动动画
      animationGroup.play();

      var afterAnimationEnd = function () {
        console.log("所有动画已经结束");
        // 在这里添加您想要执行的代码
      };

      animationGroup.afterAnimationEnd = afterAnimationEnd;
        for (let i = 0; i < scene.meshes.length; i++) {
          // if (scene.meshes[i].name !== 'skyBox' && scene.meshes[i].name.split('_')[0] !== pickResult.pickedMesh?.name.split('_')[0]){
          scene.meshes[i].isVisible = true;
          // }
        }
        for(let i = 1;i<=14;i++){
          scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${i}`)[0]._children.filter((item)=> item.name == `plane_${i}`)[0].isVisible = false;
        }
        scene.getMeshByName("main_primitive0")._children[0].isVisible = false;
        scene.getMeshByName("窗户.001_primitive15")._children[0].isVisible = false;
        scene.getMeshByName("主屋_primitive0")._children[0].isVisible = false;

    }

    /**
     * 显示隐藏标签
     */
    function showFalse(){
      Data.showFalseBoo = !Data.showFalseBoo
      if(Data.showFalseBoo) {
        for(let i = 1;i<=14;i++){
          scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${i}`)[0]._children.filter((item)=> item.name == `plane_${i}`)[0].isVisible = true;
        }
        scene.getMeshByName("main_primitive0")._children[0].isVisible = true;
        scene.getMeshByName("窗户.001_primitive15")._children[0].isVisible = true;
        scene.getMeshByName("主屋_primitive0")._children[0].isVisible = true;
      }else{
        for(let i = 1;i<=14;i++){
          scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${i}`)[0]._children.filter((item)=> item.name == `plane_${i}`)[0].isVisible = false;
        }
        scene.getMeshByName("main_primitive0")._children[0].isVisible = false;
        scene.getMeshByName("窗户.001_primitive15")._children[0].isVisible = false;
        scene.getMeshByName("主屋_primitive0")._children[0].isVisible = false;
      }
    }

    /**
     * 点击仓房信息跳转仓房
     * @param data
     */
    function clicklocationInfoItem(data){

      Data.winOpenClose = false
      axiosItem(data.row.locationCode)
      changePostion({hit:true,pickedMesh:scene.getMeshByName("__root__")._children.filter((item)=> item.name == `仓${data.ceil.slice(0, 1)}`)[0]})

      scene.beginAnimation(camera, 0, 50, false,1.0,()=>{
        // 动画结束后执行
        Data.winOpenClose = true
        /**
         * 渲染数据
         */
        Data.electronicStorageCard = handleItem.electronicStorageCard;
        Data.inventoryAnalysisView = handleItem.inventoryAnalysisView;
        Data.inStockInfoView = handleItem.inStockInfoView;
        Data.outStockInfoView = handleItem.outStockInfoView;
        Data.temperatureAndHumidityView = handleItem.temperatureAndHumidityView;
      });
      // 销毁之前的DOM元素
      var previousBubble = document.getElementById('bubble');
      if (previousBubble) {
        previousBubble.remove();
      }
    }

    /**
     * 关闭弹窗
     */
    function closewin(){
      Data.winOpenClose = false
      // Data.cameraDataFoo=false
      reserves()
    }

    /**
     * 返回主页面
     */
    function returnView(){
      Data.winOpenClose = false
      Data.cameraDataFoo=false
      reserves()
    }
    return{
      Data,
      config,
      init,
      reserves,
      showFalse,
      clicklocationInfoItem,
      closewin,
      returnView,
    }
  },
})
</script>

<style scoped>
@import url('./sgSZLS.css');

</style>
<template>
  <sgSZLS/>
</template>

<script lang="ts">
import { defineComponent, onMounted,reactive } from "vue";
// import * as BABYLON from 'babylonjs';
// import BabylonOne from './components/BabylonOne.vue';
// import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';
import Mesh = BABYLON.Mesh;
import dayjs from "dayjs";
import axios from "axios";
import { fun } from "./axios";
import sgSZLS from "./sgSZLS/index.vue"

export default defineComponent({
  components:{sgSZLS},
  setup() {
    /*const Data = reactive({
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
      nameData: <any>null,
      showFalseBoo:<any>false,
    });
    // 仓房列表数据
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
    let scene:any = null;
    let camera:any = null;
    let engine:any = null;
    var bubble:any = null;
    let isDragging = false;
    function init(){
      // 创建场景承接元素
      let canvasFor:any = document.getElementById('canvasFor');
      let canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasFor.appendChild(canvas)
      engine = new BABYLON.Engine(canvas,true)

      // 创建场景
      scene = new BABYLON.Scene(engine);

      camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
      camera.setPosition(new BABYLON.Vector3(0, 100, 170));
      camera.attachControl(canvas, true);
      camera.speed = 0.3;

      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
      light.intensity = 0.7

      // 创建天空盒
      const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox", scene);
      // skyboxMaterial.reflectionTexture = new BABYLON.HDRCubeTexture("images/scythian4k.hdr", scene, 2000);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;

      // 存储所有gui
      let planes:any = [];
      for(let i = 1;i<=4;i++){
        // 创建gui载体
        var plane = BABYLON.Mesh.CreatePlane("plane"+i,1,scene);
        plane.scaling = new BABYLON.Vector3(10, 10, 1);
        plane.position.y = -8;
        plane.rotation.x = Math.PI;
        // 创建GUI元素
        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
      
          // 创建GUI元素
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane,660,660);
        const image = new GUI.Image('but', './images/pnging.jpg');

        // 设置精灵图中要显示的图像的位置和大小
        // console.log(1212,image);
        image.width = "660px";
        image.height = "660px";
        // gui导入精灵图
        // var cellFlag = true;

        // if (cellFlag) {
        //     image.cellId = 1;
        //     image.cellHeight = 64;
        //     image.cellWidth = 64;
        // }
        // else {
        //     image.sourceWidth = 64;
        //     image.sourceHeight = 64;
        // }
        

        // setInterval(() => {
        //   if (cellFlag) {
        //       if (image.cellId < 10) image.cellId++;
        //       else image.cellId = 1;
        //   }
        //   else {
        //       image.sourceLeft += image.sourceWidth;

        //       if (image.sourceLeft >= 1408) image.sourceLeft = 0;
        //   }
        // }, 50);
        
        advancedTexture.addControl(image);
        planes.push(plane)
      }


      BABYLON.SceneLoader.Append("images/", "库区模型.glb", scene,(sceneData)=>{
        // console.log('moxing',sceneData);
        let canvasFor1:any = document.getElementById('canvasFor');
        bubble = document.createElement('div');
        bubble.setAttribute('id', 'bubble');
        canvasFor1.appendChild(bubble);

        // 仓房材质
        const material1 = new BABYLON.StandardMaterial("material", scene);
        const texture1 = new BABYLON.Texture("images/ground.jpg", scene);
        texture1.uScale = -5;
        texture1.vScale = 5;
        material1.diffuseTexture = texture1;
        const myMesh2 = scene.getMeshByName("ground");
        myMesh2.material = material1;
        const material = new BABYLON.StandardMaterial("material", scene);
        const texture = new BABYLON.Texture("images/grey.jpg", scene);
        // texture.uScale = 2;
        texture.vScale = 10;
        texture.wAng = Math.PI / 2;
        material.diffuseTexture = texture;

        const materia6 = new BABYLON.StandardMaterial("material", scene);
        const texture6 = new BABYLON.Texture("images/castle.jpg", scene);
        texture6.uScale = -3;
        texture6.vScale = 3;
        texture6.wAng = Math.PI / 2;
        materia6.diffuseTexture = texture6;

        // 创建材质
        const materia7 = new BABYLON.StandardMaterial("material", scene);
        // 加入图片
        const texture7 = new BABYLON.Texture("images/worn.jpg", scene);
        // 图片缩放
        texture7.uScale = -5;
        texture7.vScale = 5;
        // 图片旋转
        texture7.wAng = Math.PI / 2;
        // 把图片挂给材质
        materia7.diffuseTexture = texture7;
        // 把材质给模型
        for(let i = 1;i<=4;i++){
          scene.getMeshByName(i==1?`仓房1顶.`:`仓房${i}顶`).material = material;
          scene.getMeshByName(`仓房${i}`).material = materia6;
          scene.getMeshByName(`仓房${i}门`).material = materia7;
          scene.getMeshByName(`仓房${i}窗`).material = materia7;
        }

        // 将GUI元素附加到导入的模型
        for(let j = 1;j<=4;j++){
          planes[j-1].parent=scene.getMeshByName(j==1?`仓房1顶.`:`仓房${j}顶`)
          scene.getMeshByName(j==1?`仓房1顶.`:`仓房${j}顶`)._children[0].isVisible = false;
        }
        
      },(error)=>{
      });

      var highlightLayer = new BABYLON.HighlightLayer("highlightLayer", scene);
      var highlightedMesh:any;
      // 事件监听
      scene.onPointerObservable.add((eventData)=>{
        // console.log(eventData);
        if(eventData.type === BABYLON.PointerEventTypes.POINTERMOVE){
          // //  动画停止
          // scene.stopAnimation(camera)
          // // 销毁之前的DOM元素
          // var previousBubble = document.getElementById('bubble');
          // if (previousBubble) {
          //   previousBubble.remove();
          // }
        }else if(eventData.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          Data.nameData = eventData._pickInfo.pickedMesh.name
          Data.winOpenClose = false
          //  动画停止
          // scene.stopAnimation(camera)
          // 销毁之前的DOM元素
          var previousBubble = document.getElementById('bubble');
          if (previousBubble) {
            previousBubble.remove();
          }
          // scene.onPointerDown = (evt, pickResult)=>{
          //   const evt = eventData.event;
          //   const pickResult = eventData.pickInfo;
            
          //   if(!isDragging){
          //     if (evt.button === 0) {
          //     // if (pickResult.hit) {
          //       if (pickResult.pickedMesh?.name !== 'ground' && pickResult.pickedMesh?.name !== 'skyBox') {
          //         changePostion(pickResult)
          //         scene.beginAnimation(camera, 0, 60, false,1.0,function(){
          //           // console.log(pickResult);
                    
          //           // 动画结束后执行
          //           // openWin(evt,pickResult)
          //           if(pickResult.pickedMesh?.name === '仓房1顶.'){
          //             Data.cameraDataFoo = false;
          //             axiosItem('913707837973465501001000100101')
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === '仓房2顶'){
          //             Data.cameraDataFoo = false;
          //             axiosItem('913707837973465501001000200101')
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === '仓房3顶'){
          //             Data.cameraDataFoo = false;
          //             axiosItem('913707837973465501001000300101')
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === '仓房4顶'){
          //             Data.cameraDataFoo = false;
          //             axiosItem('913707837973465501001000400101')
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === 'plane'){
          //             Data.cameraDataFoo = true;
          //             axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000010}`,{headers:headers}).then((res)=>{
          //               Data.cameraData = res.data.data[0]
          //             })
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === 'plane1'){
          //             Data.cameraDataFoo = true;
          //             axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000025}`,{headers:headers}).then((res)=>{
          //               Data.cameraData = res.data.data[0]
          //             })
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === 'plane2'){
          //             Data.cameraDataFoo = true;
          //             axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000016}`,{headers:headers}).then((res)=>{
          //               Data.cameraData = res.data.data[0]
          //             })
          //             Data.winOpenClose = true
          //           }else if(pickResult.pickedMesh?.name === 'plane3'){
          //             Data.cameraDataFoo = true;
          //             axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000001}`,{headers:headers}).then((res)=>{
          //               Data.cameraData = res.data.data[0]
          //             })
          //             Data.winOpenClose = true
          //           }
          //         });
          //       // }
          //     }else {
          //       //  动画停止
          //         scene.stopAnimation(camera)
          //       // 销毁之前的DOM元素
          //       var previousBubble = document.getElementById('bubble');
          //       if (previousBubble) {
          //         previousBubble.remove();
          //       }
          //     }
          //   }
          //   // }
          // };
        }else if(eventData.type === BABYLON.PointerEventTypes.POINTERUP){
          const evt = eventData.event;
          const pickResult = eventData.pickInfo;
          if(Data.nameData === pickResult.pickedMesh?.name){
            if(!isDragging){
              if (evt.button === 0) {
                if (pickResult.pickedMesh?.name !== 'ground' && pickResult.pickedMesh?.name !== 'skyBox') {
                  changePostion(pickResult)
                  scene.beginAnimation(camera, 0, 50, false,1.0,function(){
                    // console.log(pickResult);
                    
                    // 动画结束后执行
                    // openWin(evt,pickResult)
                    if(pickResult.pickedMesh?.name === '仓房1顶.'){
                      Data.cameraDataFoo = false;
                      axiosItem('913707837973465501001000100101')
                      Data.winOpenClose = true
                    }else if(pickResult.pickedMesh?.name === '仓房2顶'){
                      Data.cameraDataFoo = false;
                      axiosItem('913707837973465501001000200101')
                      Data.winOpenClose = true
                    }else if(pickResult.pickedMesh?.name === '仓房3顶'){
                      Data.cameraDataFoo = false;
                      axiosItem('913707837973465501001000300101')
                      Data.winOpenClose = true
                    }else if(pickResult.pickedMesh?.name === '仓房4顶'){
                      Data.cameraDataFoo = false;
                      axiosItem('913707837973465501001000400101')
                      Data.winOpenClose = true
                    }else if(pickResult.pickedMesh?.name === 'plane4'){
                      Data.cameraDataFoo = true;
                      axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000010}`,{headers:headers}).then((res)=>{
                        Data.cameraData = res.data.data[0]
                      })
                    }else if(pickResult.pickedMesh?.name === 'plane1'){
                      Data.cameraDataFoo = true;
                      axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000025}`,{headers:headers}).then((res)=>{
                        Data.cameraData = res.data.data[0]
                      })
                    }else if(pickResult.pickedMesh?.name === 'plane2'){
                      Data.cameraDataFoo = true;
                      axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000016}`,{headers:headers}).then((res)=>{
                        Data.cameraData = res.data.data[0]
                      })
                    }else if(pickResult.pickedMesh?.name === 'plane3'){
                      Data.cameraDataFoo = true;
                      axios.get(`http://43.249.192.161:15001/Transfers/digitalTwinsCamera/getCreameData?cameraPoint=${320000001}`,{headers:headers}).then((res)=>{
                        Data.cameraData = res.data.data[0]
                      })
                    }
                  });
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
            };
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
      // return scene;
    }

    // 拉近仓房动画
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

    // 点击仓房打开弹窗
    function openWin(evt:any,pickResult: any) {
      // 销毁之前的DOM元素
      var previousBubble = document.getElementById('bubble');
      if (previousBubble) {
        previousBubble.remove();
      }
      
      // 创建新的DOM元素
      var canvas: any = engine.getRenderingCanvas();
      var canvasWidth = canvas.clientWidth;
      var canvasHeight = canvas.clientHeight;
      var screenX = evt.clientX;
      var screenY = evt.clientY;
      var pixelX = (screenX - canvas.getBoundingClientRect().left) * (canvas.width / canvasWidth);
      var pixelY = (screenY - canvas.getBoundingClientRect().top) * (canvas.height / canvasHeight);
      if(pickResult.pickedMesh?.name=='仓房2门'){
        bubble.id = 'bubble';
        bubble.style.position = 'absolute';
        bubble.style.left = pixelX + 'px';
        bubble.style.top = pixelY + 'px';
        bubble.style.background = 'rgba(255, 255, 255, 0.8)';
        bubble.style.padding = '10px';
        bubble.style.border = '1px solid #000';
        bubble.style.borderRadius = '5px';
        bubble.innerHTML  = '<video style="width:400px;height:200px" src="./images/video.mp4" autoplay></video>';
        document.body.appendChild(bubble);
      }else if(pickResult.pickedMesh?.name=='仓房3门'){
        bubble.id = 'bubble';
        bubble.style.position = 'absolute';
        bubble.style.left = pixelX + 'px';
        bubble.style.top = pixelY + 'px';
        bubble.style.background = 'rgba(255, 255, 255, 0.8)';
        bubble.style.padding = '10px';
        bubble.style.border = '1px solid #000';
        bubble.style.borderRadius = '5px';
        bubble.innerHTML  = '<img style="width:400px;height:200px" src="./images/123.gif" />';
        document.body.appendChild(bubble);
      }else if(pickResult.pickedMesh?.name=='仓房1门'){
        bubble.id = 'bubble';
        bubble.style.position = 'absolute';
        bubble.style.left = pixelX + 'px';
        bubble.style.top = pixelY + 'px';
        bubble.style.background = 'rgba(255, 255, 255, 0.8)';
        bubble.style.padding = '10px';
        bubble.style.border = '1px solid #000';
        bubble.style.borderRadius = '5px';
        bubble.innerHTML  = '<img style="width:400px;height:200px" src="./images/动画11.gif" />';
        document.body.appendChild(bubble);
      }else{
        bubble.id = 'bubble';
        bubble.style.position = 'absolute';
        bubble.style.left = pixelX + 'px';
        bubble.style.top = pixelY + 'px';
        bubble.style.background = 'rgba(255, 255, 255, 0.8)';
        bubble.style.padding = '10px';
        bubble.style.border = '1px solid #000';
        bubble.style.borderRadius = '5px';
        bubble.textContent = <string>pickResult.pickedMesh?.name;
        document.body.appendChild(bubble);
      }
    }
    // 复位
    function reserves(){
      for(let i = 1;i<=4;i++){
        scene.getMeshByName(i==1?`仓房1顶.`:`仓房${i}顶`)._children[0].isVisible = false
      }
      Data.showFalseBoo = false;
      Data.winOpenClose = false
      Data.cameraDataFoo=false
      camera.setTarget(new BABYLON.Vector3(0, 0, 0))
      
      const reservePostion = new BABYLON.Vector3(0, 100, 170);
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
    }

    onMounted(()=>{
      init();
      var element = document.getElementById('bubble');
      if (element) {
        element.remove();
      }
      weater();
    })

    // 接口
    let headers = {
      'Authorization': 'MjJxbGRsMndwNWs1M3cwcnB1cjIwZ2xjOnNrNDE2cHlweHF0eHJ1ZTFiYm45eTFycDNmdDcyM2tw',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Tenantid':'358774221851067147',
      'Token':'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJDdXJyZW50Q29tcGFueUlkIjoiMzYzNjAxNDczMDMzOTk0NDg1IiwiQ3VycmVudERlcHRJZCI6IjM2MzU5OTI1MjUzNTkwMjQ1NyIsIlV1aWQiOiJkNGUxNGZhNjFiYjc0NTM3OTlmMmE0ZjRhZmIxY2NmYSIsIlVzZXJJZCI6IjM1ODc3NDIyMTg1MTA2NzE0OCIsIkN1cnJlbnRUb3BDb21wYW55SWQiOiIzNjM2MDE0NzMwMzM5OTQ0ODUiLCJFbXBsb3llZUlkIjoiMzYzNjAwNTY2Nzk1ODk1NDE0IiwiaWF0IjoxNzExMzQzMjEyLCJuYmYiOjE3MTEzNDMyMTIsImV4cCI6MTcxMTM3MjAxMn0.PEfTQMXs8gzfmgdS8zByEHoEaU3C0TmzbkAL0TzqLUw'
    }
    // 初始化接口调用
    function weater(){
      // 天气
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/weather',
      {headers:headers}).then((res)=>{
        Data.weaterData = res.data
      });
      // 园区概览
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/overview',{headers:headers}).then((res)=>{
        Data.houseData = res.data.data
      })
      // 库存容量统计
      axios.post('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inventoryCapacity',{},{headers:headers}).then((res)=>{
        Data.inventoryCapacity = res.data.data
      })
      // 库存分析
      axios.post('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inventoryAnalysis',{},{headers:headers}).then((res)=>{
        Data.inventoryAnalysis = res.data.data[0]
      })
      // 仓房list
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/locationInfo/list',{headers:headers}).then((res)=>{
        // Data.locationInfoList = res.data.data
        config.data = res.data.data
      })
      // 出库情况
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/outStockInfo',{headers:headers}).then((res)=>{
        Data.outStockInfo = res.data.data
      })
      // 入库情况
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/inStockInfo',{headers:headers}).then((res)=>{
        Data.inStockInfo = res.data.data
      })
      // 告警分析
      axios.get('http://43.249.192.161:15001/Transfers/digitalReservoirInfo/warnInfo',{headers:headers}).then((res)=>{
        Data.warnInfo = res.data.data
      })
    }

    // 详情接口调用
    function axiosItem(data){
      // 货位卡接口
      axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/electronicStorageCard',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        Data.electronicStorageCard = res.data.data
      })
      // 库存分析
      axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inventoryAnalysis',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        Data.inventoryAnalysisView = res.data
      })
      // 入库情况
      axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/inStockInfo',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        Data.inStockInfoView = res.data.data
      })
      // 出库情况
      axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/outStockInfo',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        Data.outStockInfoView = res.data.data
      })
      // 粮情温度
      axios.post('http://43.249.192.161:15001/Transfers/digitalTwinBarnInfo/temperatureAndHumidity',{hwdm:data},{headers:{...headers,'Content-Type':'application/json'}}).then((res)=>{
        Data.temperatureAndHumidityView = res.data.data
      })
      
    }
    // 点击仓房信息跳转仓房
    function clicklocationInfoItem(data){
      console.log(data);
      // console.log(scene.getMeshByName('仓房2顶'));
      
      Data.winOpenClose = false
      axiosItem(data.row.locationCode)
      changePostion({hit:true,pickedMesh:scene.getMeshByName(data.ceil.slice(0, 1)==1?`仓房1顶.`:`仓房${data.ceil.slice(0, 1)}顶`)})
      
      scene.beginAnimation(camera, 0, 50, false,1.0,()=>{
        // 动画结束后执行
        Data.winOpenClose = true
      });
      // 销毁之前的DOM元素
      var previousBubble = document.getElementById('bubble');
      if (previousBubble) {
        previousBubble.remove();
      }
    }

    // 关闭弹窗
    function closewin(){
        Data.winOpenClose = false
        Data.cameraDataFoo=false
    }
    // 返回主页面
    function returnView(){
        Data.winOpenClose = false
        Data.cameraDataFoo=false
    }

    // msg.payload = 0
// for(let i = 0;i<=2;i++){
    let i = 0
   let time = setInterval(()=>{
    i++
      console.log(i);
   if(i == 3){
    clearInterval(time)
   }
   },500)
// }
    // 显示隐藏标签
    function showFalse(){
      Data.showFalseBoo = !Data.showFalseBoo
      if(Data.showFalseBoo) {
        for(let i = 1;i<=4;i++){
          scene.getMeshByName(i==1?`仓房1顶.`:`仓房${i}顶`)._children[0].isVisible = true
        }
      }else{
        for(let i = 1;i<=4;i++){
          scene.getMeshByName(i==1?`仓房1顶.`:`仓房${i}顶`)._children[0].isVisible = false
        }
      }
    }*/

    return{
      // Data,
      // config,
      // init,
      // reserves,
      // clicklocationInfoItem,
      // closewin,
      // returnView,
      // showFalse,
    }
  }
})
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>

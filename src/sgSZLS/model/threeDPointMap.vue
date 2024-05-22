<template>
  <div id="myChart" ref="myCharBox" style="height: 380px;width: 100%"></div>
  <div class="warehouseButtons">
    <div
        v-for="(item, index) in Data.chartZ"
        :key="index"
        @click="dressing(item)"
        :class="item.type ? 'SelectedBotton' : ''"
    >第{{ item.num }}层</div
    >
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts';
import 'echarts-gl';
import axios from "axios";
import {three3DPointData} from "../data/three3DPointData";

export default defineComponent({
    name: "3D点位图",
    setup() {
      let myChart: any = null;
      let myCharBox: any | null = ref(null);
      let Data = reactive({
        warehouseData: '', //当前仓房代码
        warehouseName: '', //当前仓房名称
        temperatureGather: <any>{}, //温度集合
        chartData: <any>[],
        chartZ: <any>[],
        DetailsData: <any>{},
      });

      let option: any = {
        tooltip: {
          show: true,
          formatter: function (params) {
            return `
            <div>第${params.data[1]}行</div>
            <div>第${-params.data[0]}列</div>
            <div>第${params.data[2]}层</div>
            <div>温度：${params.data[3].wd}</div>
           `;
          },
        },
        color: ['#cccccc'],
        xAxis3D: {
          name: '列',
          boundaryGap: [0, 0.01],
          //x轴坐标数字显示正数
          axisLabel: {
            formatter(params) {
              return -params;
            },
          },
          min: (v) => {
            return v.min - 1;
          },
          max: 0,
        },
        yAxis3D: {
          name: '行',
          min: 0,
          max: (v) => {
            return v.max + 1;
          },
        },
        zAxis3D: {
          name: '层',
        },
        grid3D: {
          // show: false,
          axisLine: {
            lineStyle: {
              color: '#FE8791', //轴线颜色
            },
          },
          axisPointer: {
            lineStyle: {
              color: '#FE8791', //坐标轴指示线
            },
            show: false, //不显示坐标轴指示线
          },
          viewControl: {
            //autoRotate: true,//旋转展示
            //projection: 'orthographic'
            beta: 10,
          },
          boxWidth: 180,
          boxHeight: -100,
          boxDepth: 100,
          // top: 100,
        },
        series: [
          {
            type: 'scatter3D',
            data: [],
            symbolSize: 10, //点的大小
            label: {
              show: false,
              position: 'left',
              textStyle: {
                fontSize: 16,
              },
              formatter: (params) => {
                return params.data[2];
              },
            },
            itemStyle: {
              normal: {
                color: () => {
                  return '#00FFA9';
                },
              },
            },
          },
        ],
      };

      /**
       * 初始化
       * @param cfdm
       * @param cfmc
       */
      function initeCharts(cfdm, cfmc){
        Data.warehouseData = cfdm;
        Data.warehouseName = cfmc;
        //获取温度集合
        Data.temperatureGather = {
          "ts": "2024-05-21 15:35:30.09",
          "humidity": 63,
          "temperature": 26.3,
          "averagetempera": 26.1,
          "mintempera": 23.5,
          "maxtempera": 27.7,
          "externaltempera": 36.7,
          "externalhumidity": 37.1,
          "librarycode": "913707837973465501001",
          "abarncode": "9137078379734655010010020"
        }
        // axios.get(`http://192.168.3.98:18760/api/iotplatform/paaSDataApi/humidityCable/${cfdm}`).then((res: any) => {
        //   if (res.isSuccess) {
        //     Data.temperatureGather = res.data;
        //   } else {
        //     // message.warning(res.msg);
        //   }
        // });
        //点位图
        Data.chartData = [];
        Data.chartZ = [];
        let chartZNum = 0;
        for (let i = 0; i < three3DPointData.length; i++) {
          if (three3DPointData[i].storey > chartZNum) {
            chartZNum = three3DPointData[i].storey;
          }
          Data.chartData.push([
            -three3DPointData[i].lie,
            three3DPointData[i].row,
            three3DPointData[i].storey,
            { wd: three3DPointData[i].temperature },
          ]);
        }
        for (let i = 1; i <= chartZNum; i++) {
          Data.chartZ.push({
            num: i,
            type: false,
          });
        }
        PointPosition3D(Data.chartData);
        if (myChart) {
          myChart.dispose();
        }
        myChart = echarts.init(myCharBox.value);
        // 绘制图表
        myChart.setOption(option);
        /*axios.get(`http://192.168.3.98:18760/api/iotplatform/paaSDataApi/bitmap/${cfdm}`).then(
            (res: any) => {
              Data.chartData = [];
              Data.chartZ = [];
              let chartZNum = 0;
              if (res.isSuccess) {
                for (let i = 0; i < res.data.length; i++) {
                  if (res.data[i].storey > chartZNum) {
                    chartZNum = res.data[i].storey;
                  }
                  Data.chartData.push([
                    -res.data[i].lie,
                    res.data[i].row,
                    res.data[i].storey,
                    { wd: res.data[i].temperature },
                  ]);
                }
                for (let i = 1; i <= chartZNum; i++) {
                  Data.chartZ.push({
                    num: i,
                    type: false,
                  });
                }
                PointPosition3D(Data.chartData);
                if (myChart) {
                  myChart.dispose();
                }
                myChart = echarts.init(myCharBox.value);
                // 绘制图表
                myChart.setOption(option);
              } else {
                PointPosition3D(Data.chartData);
                // message.warning(res.msg);
              }
            },
        );*/
      };

      /**
       * 3D点位图
       * @param data
       * @constructor
       */
      function PointPosition3D(data: any) {
        let temporary: any = [];
        let exist: any = [];
        option.series = [option.series[0]];
        option.series[0].data = data;
        for (let i = 0; i < Data.chartData.length; i++) {
          var Datalist = exist.filter((p) => {
            return p == Data.chartData[i];
          });
          if (Datalist.length == 0) {
            temporary = [];
            for (let r = 0; r < Data.chartData.length; r++) {
              if (
                  Data.chartData[i][0] == Data.chartData[r][0] &&
                  Data.chartData[i][1] == Data.chartData[r][1]
              ) {
                temporary.push(Data.chartData[r]);
              }
            }
            option.series.push({
              type: 'line3D',
              data: temporary,
            });
            exist.push(...temporary);
          }
        }
      }

      /**
       * 层选择
       * @param itme
       */
      function dressing(itme) {
        itme.type = !itme.type;
        let TochartZ = Data.chartZ.filter((p) => {
          return p.type;
        });
        if (TochartZ.length > 0) {
          let ChaerData: any = [];
          for (let i = 0; i < TochartZ.length; i++) {
            let e = Data.chartData.filter((p) => {
              return p[2] == TochartZ[i].num;
            });
            ChaerData = [...ChaerData, ...e];
          }
          PointPosition3D(ChaerData);
          setTimeout(() => {
            if (myChart) {
              myChart.dispose();
            }
            myChart = echarts.init(myCharBox.value);
            // 绘制图表
            myChart.setOption(option);
          });
        } else {
          PointPosition3D(Data.chartData);
          setTimeout(() => {
            if (myChart) {
              myChart.dispose();
            }
            myChart = echarts.init(myCharBox.value);
            // 绘制图表
            myChart.setOption(option);
          });
        }
      }
      return {
        myChart,
        myCharBox,
        Data,
        initeCharts,
        dressing,
      };
    }
})
</script>

<style scoped>
.warehouseButtons {
  position: absolute;
  top:5vh;
  right:1vw;

  //padding: 10% 0;
  width: 10%;
  //text-align: center;
  //display: flex;
  //flex-direction: column;
  //justify-content: space-evenly;

  div {
    color: #000;
    width: 80%;
    margin: 3px auto;
    background-color: #fff;
    border-radius: 3px;
    padding: 2px;
    cursor: pointer;
  }

  .SelectedBotton {
    background-color: #55affc;
    color: #fff;
  }
}
</style>
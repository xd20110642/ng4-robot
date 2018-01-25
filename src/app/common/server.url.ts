import {Injectable} from "@angular/core";
/*
注意：url增加要在定义属性里面和updateBaseUrl方法里面同时增加。
 */
@Injectable()
export class URLS  {
  public static  baseUrl = 'http://localhost:9666/';
  //public baseUrl = 'http://192.168.3.17:9666/';
  public static  redDll:any = {
  init:URLS.baseUrl+'api/v1/redRobotDll/init/',
  refreshPoint:URLS.baseUrl+'api/v1/redRobotDll/refreshPoint',
  refreshAngle:URLS.baseUrl+'api/v1/redRobotDll/refreshAngle/',
  clearWarn:URLS.baseUrl+'api/v1/redRobotDll/clearWarn/',
  changeWorkMode:URLS.baseUrl+'api/v1/redRobotDll/changeWorkMode/',
  runToZero:URLS.baseUrl+'api/v1/redRobotDll/runToZero/',
  changeMotor:URLS.baseUrl+'api/v1/redRobotDll/changeMotor/',
  moveObject:URLS.baseUrl+'api/v1/redRobotDll/moveObject/',
};
  public static  point = {
    create:URLS.baseUrl +'api/v1/point/create/',
    search: URLS.baseUrl +"api/v1/point/search/",
    del:URLS.baseUrl +"api/v1/point/del/",
    moveToPoint:URLS.baseUrl +"api/v1/point/runToPoint/",
  };
  public static  program= {
    create:URLS.baseUrl +'api/v1/program/create/',
    list:URLS.baseUrl +'api/v1/program/list/',
    listProgramItem : URLS.baseUrl +'api/v1/program/listProgramItem/',
    load : URLS.baseUrl +'api/v1/program/load/',
    download : URLS.baseUrl +'api/v1/program/download/',
    addPoint :  URLS.baseUrl +'api/v1/program/addPoint/',
    delPoint :  URLS.baseUrl +'api/v1/program/delPoint/',
    addNoCurve :URLS.baseUrl +'api/v1/program/addNoCurve/',
    start : URLS.baseUrl +'api/v1/program/start/',
    pause : URLS.baseUrl +'api/v1/program/pause/',
    stop : URLS.baseUrl +'api/v1/program/stop/',
    goon : URLS.baseUrl +'api/v1/program/goon/',
  };
  public static  port= {
    changeTran:URLS.baseUrl +'api/v1/port/changeTran/',
    setOutput:URLS.baseUrl +'api/v1/port/setOutput/',
    setAnalog:URLS.baseUrl +'api/v1/port/setAnalog/',
    getAnalog:URLS.baseUrl +'api/v1/port/getAnalog/',
    getOutput:URLS.baseUrl +'api/v1/port/getOutput/',
    getInput:URLS.baseUrl +'api/v1/port/getInput/',
  };
  public static  offlineProgram:any = {
    create:URLS.baseUrl +'api/v1/offlineProgram/create/',
    load:URLS.baseUrl +'api/v1/offlineProgram/load/',
    list:URLS.baseUrl +'api/v1/offlineProgram/search/',
    del:URLS.baseUrl +'api/v1/offlineProgram/del/',
  };

  public static initBaseUrl(){
    if (window.localStorage) {
      if(localStorage.getItem("baseUrl")){
        URLS.baseUrl = localStorage.getItem("baseUrl");

      }
      localStorage.setItem("baseUrl", URLS.baseUrl);
    }
    URLS.updateBaseUrl(URLS.baseUrl );
  }

  public static  updateBaseUrl(baseUrl:string){
    URLS.baseUrl = baseUrl;
    localStorage.setItem("baseUrl", URLS.baseUrl);

    URLS.redDll = {
      init:URLS.baseUrl+'api/v1/redRobotDll/init/',
      refreshPoint:URLS.baseUrl+'api/v1/redRobotDll/refreshPoint',
      refreshAngle:URLS.baseUrl+'api/v1/redRobotDll/refreshAngle/',
      clearWarn:URLS.baseUrl+'api/v1/redRobotDll/clearWarn/',
      changeWorkMode:URLS.baseUrl+'api/v1/redRobotDll/changeWorkMode/',
      runToZero:URLS.baseUrl+'api/v1/redRobotDll/runToZero/',
      changeMotor:URLS.baseUrl+'api/v1/redRobotDll/changeMotor/',
      moveObject:URLS.baseUrl+'api/v1/redRobotDll/moveObject/',
      // changeMotor:URLS.baseUrl+'api/v1/redRobotDll/changeMotor/',
      //  changeMotor:URLS.baseUrl+'api/v1/redRobotDll/changeMotor/',
    };
    URLS.point = {
      create:URLS.baseUrl +'api/v1/point/create/',
      search: URLS.baseUrl +"api/v1/point/search/",
      del:URLS.baseUrl +"api/v1/point/del/",
      moveToPoint:URLS.baseUrl +"api/v1/point/runToPoint/",
    };
    URLS.program= {
      create:URLS.baseUrl +'api/v1/program/create/',
      list:URLS.baseUrl +'api/v1/program/list/',
      listProgramItem : URLS.baseUrl +'api/v1/program/listProgramItem/',
      load : URLS.baseUrl +'api/v1/program/load/',
      download : URLS.baseUrl +'api/v1/program/download/',
      addPoint :  URLS.baseUrl +'api/v1/program/addPoint/',
      delPoint :  URLS.baseUrl +'api/v1/program/delPoint/',
      addNoCurve :URLS.baseUrl +'api/v1/program/addNoCurve/',
      start : URLS.baseUrl +'api/v1/program/start/',
      pause : URLS.baseUrl +'api/v1/program/pause/',
      stop : URLS.baseUrl +'api/v1/program/stop/',
      goon : URLS.baseUrl +'api/v1/program/goon/',
    };
    URLS.port= {
      changeTran:URLS.baseUrl +'api/v1/port/changeTran/',
      setOutput:URLS.baseUrl +'api/v1/port/setOutput/',
      setAnalog:URLS.baseUrl +'api/v1/port/setAnalog/',
      getAnalog:URLS.baseUrl +'api/v1/port/getAnalog/',
      getOutput:URLS.baseUrl +'api/v1/port/getOutput/',
      getInput:URLS.baseUrl +'api/v1/port/getInput/',
    };
    URLS.offlineProgram = {
      create:URLS.baseUrl +'api/v1/offlineProgram/create/',
      load:URLS.baseUrl +'api/v1/offlineProgram/load/',
      list:URLS.baseUrl +'api/v1/offlineProgram/search/',
      del:URLS.baseUrl +'api/v1/offlineProgram/del/',
    };
  }

};




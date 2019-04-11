import { ui } from './ui/layaMaxUI'; //  导入命名空间
import Mole from './Mole';
import Hammer from './Hammer';


//  公共属性也能够继承
export default class GameUI extends ui.gameBackgroundUI {
  // private mole: Mole;
  private moles: Array<Mole>;
  private moleNum: number = 9;
  private score: number = 0;

  private hammer: Hammer;

  constructor() {
    super();

    //  设置时间条
    this.timeBar.value = 1;

    //  初始化锤子
    this.hammer = new Hammer();
    this.addChild(this.hammer);
    this.hammer.start();

    //  创建打击地鼠后的回调函数，用于显示分数
    const hitFeedback: Laya.Handler = Laya.Handler.create(this, this.showScore, null, false);

    //  初始化地鼠数组
    this.moles = new Array<Mole>();
    for (let i = 1; i <= this.moleNum; i++) {
      //  获取box
      const box: Laya.Box = this.getChildByName('hole' + i) as Laya.Box;
      //  创建地鼠实例
      const mole: Mole = new Mole(
        box.getChildByName('unhitMole') as Laya.Sprite,
        box.getChildByName('hitMole') as Laya.Sprite,
        box.getChildByName('score') as Laya.Sprite,
        40,
        hitFeedback,
      );
      this.moles.push(mole);
    }

    //  开始生产地鼠
    Laya.timer.loop(1000, this, this.showMoles);
  }

  showMoles(): void {
    //  减少时间条
    this.timeBar.value -= 1 / 90;
    if (this.timeBar.value <= 0) {
      this.gameOver();
      return;
    }
    //  产生一个随机数
    const index: number = Math.floor(Math.random() * this.moleNum);
    this.moles[index].show();
  }

  //  击打回调函数
  showScore(type: number): void {
    //  计算分数
    this.score += (type === 1 ? -100 : 100);
    if (this.score < 0) {
      this.score = 0;
    }

    //  显示分数
    const scoreObj: Object = {};
    let tempscore: number = this.score;
    for (let i = 9; i >= 0; i--) {
      scoreObj['item' + i] = {
        index: tempscore % 10,
      };
      tempscore = (tempscore - tempscore % 10) / 10;
    }
    console.log(scoreObj);
    
    this.scoreBar.dataSource = scoreObj;
  }
  
  gameOver(): void {
    //  停止产生地鼠
    Laya.timer.clear(this, this.showMoles);
    this.hammer.visible = false;
    this.hammer.end();
    alert('游戏结束！');
  }

}
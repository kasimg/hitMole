/*
 * 地鼠类
 */
export default class Mole {
  private unhitState: Laya.Sprite;
  private hitState: Laya.Sprite;
  private downY: number; //  地鼠出生的y轴坐标
  private upY: number; //  地鼠上升到最高处时的y轴坐标

  private activated: boolean;
  private shown: boolean;
  private beHit: boolean;

  private moleType: number; //  地鼠的类型

  private hitFeedback: Laya.Handler; //  存放击打回调函数

  private score: Laya.Sprite; //  分数图片
  private scoreY: number;  //  分数图片的最高点

  /**
   * @param unhitState: 没被打的地鼠图片
   * @param hitState: 被打中的地鼠图片
   * @param score: 分数图片
   * @param downY: 地鼠出生点（最低点的y坐标）
   * @param hitFeedback: 打中地鼠的回调函数（显示分数）
   */
  constructor(
    unhitState: Laya.Sprite,
    hitState: Laya.Sprite,
    score: Laya.Sprite,
    downY: number,
    hitFeedback: Laya.Handler,
  ) {
    this.unhitState = unhitState;
    this.hitState = hitState;
    this.score = score;
    this.scoreY = this.score.y;
    this.downY = downY;
    this.upY = this.unhitState.y; // 最高点坐标就是未被击打地鼠图片的初始Y坐标

    //  初始化地鼠的状态
    this.reset();

    //  监听受击打操作
    this.unhitState.on(Laya.Event.MOUSE_DOWN, this, this.hit);

    //  存放受击打回调函数
    this.hitFeedback = hitFeedback;
  }

  //  重置地鼠状态
  reset(): void {
    this.unhitState.visible = false; 
    this.hitState.visible = false; //  隐藏两张地鼠的图片
    this.score.visible = false;
    this.activated = false;
    this.beHit = false;
    this.shown = false;  
  }

  //  出现
  show(): void {
    //  如果已经激活，那么就直接返回
    if (this.activated) {
      return;
    }

    //  产生随机数，确定地鼠的类型
    this.moleType = Math.random() < 0.3 ? 1 : 2;
    this.unhitState.loadImage('ui/mouse_normal_' + this.moleType + '.png');
    this.hitState.loadImage('ui/mouse_hit_' + this.moleType + '.png');
    this.score.loadImage('ui/score_' + this.moleType + '.png');
    
    //  否则改变地鼠的状态
    this.activated = true;
    this.shown = true;
    this.unhitState.y = this.downY;
    this.unhitState.visible = true;

    //  使地鼠缓慢从洞里钻出
    Laya.Tween.to(
      this.unhitState,
      {y: this.upY},
      1000,
      Laya.Ease.backOut,
      Laya.Handler.create(this, this.stay),
    );

  }

  //  停留
  stay(): void {
    //  如果地鼠已经出生而且没有被击中
    if (this.shown && !this.beHit) {
      Laya.timer.once(2000, this, this.hide);
    }
  }

  //  正常消失
  hide(): void {
    if (this.shown && !this.beHit) {
      this.shown = false;
    //  缓慢缩入地下
      Laya.Tween.to(
        this.unhitState,
        {y: this.downY},
        300,
        Laya.Ease.backIn,
        Laya.Handler.create(this, this.reset),
      );
    }
  }

  //  受击打并消失
  hit(): void {
    if (this.shown && !this.beHit) {
      this.beHit = true;
      this.shown = false;

      //  显示分数
      this.hitFeedback.runWith(this.moleType);

      Laya.timer.clear(this, this.hide);
      this.unhitState.visible = false;
      this.hitState.visible = true;
      Laya.timer.once(500, this, this.reset);  //  受击打后由于执行reset函数，把shown置为false导致stay和head后续无法执行
      this.showScore();
    }
  }

  //  显示分数
  showScore(): void {
    this.score.y = this.scoreY + 30;  //  分数的起始高度

    //  从无到有的缩放效果
    this.score.scale(0, 0);
    this.score.visible = true;
    Laya.Tween.to(this.score, {y: this.scoreY, scaleX: 1, scaleY: 1}, 300, Laya.Ease.backOut);
  }
}
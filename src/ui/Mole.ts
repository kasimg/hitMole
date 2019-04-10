/*
 * 地鼠类
 */
class Mole {
  private unhitState: Laya.Sprite;
  private hitState: Laya.Sprite;
  private downY: number; //  地鼠出生的y轴坐标
  private upY: number; //  地鼠上升到最高处时的y轴坐标

  constructor(unhitState: Laya.Sprite, hitState: Laya.Sprite, downY: number) {
    this.unhitState = unhitState;
    this.hitState = hitState;
    this.downY = downY;
    this.upY = this.unhitState.y; // 最高点坐标就是未被击打地鼠图片的初始Y坐标
  }
}
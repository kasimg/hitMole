import { ui } from './ui/layaMaxUI'; //  导入命名空间
/**
 * Hammer
 */
export default class Hammer extends ui.hammerUI {
  constructor() {
    super();
  }

  //  开始使用
  start(): void {
    Laya.Mouse.hide();
    Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
  }

  //  结束使用
  end(): void {
    Laya.Mouse.show();
    Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
  }

  onMouseDown(): void {
    this.hit.play(0, false);
  }

  onMouseMove(): void {
    this.pos(Laya.stage.mouseX - this.width / 3, Laya.stage.mouseY - this.height / 3);
  }
}
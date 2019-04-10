import { ui } from './layaMaxUI'; //  导入命名空间

class GameUI extends ui.gameBackgroundUI {
  private mole: Mole;

  constructor() {
    super();
    this.mole = new Mole(this.unhitMole, this.hitMole, 21);
  }
}
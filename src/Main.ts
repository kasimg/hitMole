import GameConfig from "./GameConfig";
import GameUI from "./GameUI";
import { ui } from "./ui/layaMaxUI";
class Main {
	constructor() {
		this.initBackground();
	}

	initBackground() {
		Laya.init(800, 600);
		Laya.stage.bgColor = '#ffcccc';

		const resArray = [
			{url: 'res/atlas/ui.atlas', type: Laya.Loader.ATLAS},
			{url: 'ui/back.png', type: Laya.Loader.IMAGE},
		];

		//  加载图像，使得图像资源能够被访问（非常必要！！！！！）
		Laya.loader.load(resArray, Laya.Handler.create(this, () => {
			const view: GameUI = new GameUI();
			Laya.stage.addChild(view);
		}));

	}

}
//激活启动类
new Main();

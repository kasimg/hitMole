import GameConfig from "./GameConfig";
// import {GameUI} from "./ui/layaMaxUI";
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
			Laya.Scene.open('../laya/pages/gameBackground.scene'); // 因为默认路径是bin，所以这里不能用相对路径
		}));

	}
}
//激活启动类
new Main();

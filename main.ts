import { App, Editor, FileView, Modal, Notice, Plugin, PluginSettingTab, Setting, ItemView, WorkspaceLeaf } from 'obsidian';
	const fileName = 'ewr/tet.md';
const data = 'tet';
var import_obsidian = require("obsidian");


export default class effortless_canvas extends Plugin {
	getActiveCanvas() {
		var _a;
		const maybeCanvasView = (_a = this.app.workspace.activeLeaf) == null ? void 0 : _a.view;
		return maybeCanvasView ? maybeCanvasView["canvas"] : null;
	};
	getFocusedFileData() {
		return [...this.getActiveCanvas().selection]
	};
	openFocusedNode() {
		this.app.workspace.openLinkText(
			this.getFocusedFileData()[0].file.path,
			"",
			"tab"
		)
	}
	printFocusedCanvasData_dev() {
		console.log(this.getActiveCanvas().selectionChanged)
	};
	
	focusOnNode(canvas, node) {
		canvas.zoomToBbox({
			minX: node.x - node.width * 1,
			minY: node.y - node.height * 1,
			maxX: node.x + node.width * 1,
			maxY: node.y + node.height * 1
		})
	};

	// 創建一個 Proxy，監聽 filePath 屬性的變化
	handler = {
		set(target, property, value) {
			if (property === 'path' && value !== target[property]) {
				// 在 filePath 值改變時執行你的函數
				console.log('yes');
				this.openFocusedNode();
				return true;
			} else {
				return false;
			}
		},
	};

	proxyObject = new Proxy(this.getFocusedFileData()[0].file, this.handler);

	FocusSpecificFile(data) {
		const canvasView = this.app.workspace.getActiveViewOfType(import_obsidian.ItemView);
		this.registerEvent(import_obsidian.HTMLElement.onClickevent())
		const canvas = "";
	if ((canvasView == null ? void 0 : canvasView.getViewType()) === "canvas") {
		const canvas2 = canvasView.canvas;
	};
	let node_data = data[0];
	switch (node_data.type) {
		case "file":
			new import_obsidian.Notice(`Selected ${node_data.file}`);
			this.focusOnNode(this.getActiveCanvas(), node_data);
			break;
		case "group":
			new import_obsidian.Notice(`Selected ${node_data.file}`);
			this.focusOnNode(this.getActiveCanvas(), node_data);
			break;
		case "text":
			new import_obsidian.Notice(`Selected ${node_data.text}`);
			this.focusOnNode(this.getActiveCanvas(), node_data);
			break;
		case "link":
			new import_obsidian.Notice(`Selected ${node_data.url}`);
			break;
		};
}
	async onload() {
		this.addCommand({
			id: `openFocusedNode`,
			name: `openFocusedNode`,
			callback: () => {
				this.openFocusedNode()
				;
			}
		});
		this.addCommand({
			id: `dev_used`,
			name: `dev_used`,
			callback: () => {
				this.printFocusedCanvasData_dev()
				;
			}
		});
		
	}
	onunload() {

	}
	
}


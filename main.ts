import { App, Editor, FileView, Modal, Notice, Plugin, PluginSettingTab, Setting, ItemView,MarkdownView, WorkspaceLeaf, WorkspaceRoot, MarkdownEditView } from 'obsidian';
import { isNull } from 'util';
var import_obsidian = require("obsidian");
import { ExampleView, VIEW_TYPE_EXAMPLE ,MarkdownSourceView} from "./view";
export const VIEW_TYPE_EXAMPLE = "example-view";

interface effortless_canvas_setting {
	PluginIsTurnedOn:boolean
}

const DEFAULT_SETTINGS: effortless_canvas_setting = {
	PluginIsTurnedOn:true
}

export class ExampleView extends MarkdownView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		const container = this.containerEl.children[1];

	}

	async onClose() {
		// Nothing to clean up.
	}
}
export default class effortless_canvas extends Plugin {
	settings: effortless_canvas_setting
	tabLeaf: WorkspaceLeaf | null = null;
	PluginIsTurnedOn = true;
	getActiveCanvas() {
		var _a;
		const maybeCanvasView = (_a = this.app.workspace.activeLeaf) == null ? void 0 : _a.view;
		return maybeCanvasView ? maybeCanvasView["canvas"] : null;
	};
	getFocusedFileData() {
		try {
			return [...this.getActiveCanvas().selection][0].file.path
		}
		catch (error) {
			console.log('no file')
			return(false)
		}
	};


	openFocusedNode() {
		if (this.getFocusedFileData() != false) {
			const focus_note = this.getFocusedFileData()
			this.app.workspace.openLinkText(
				focus_note,
				'',
				'tab'
			);
		}
	};
	printFocusedCanvasData_dev() {
		console.log(this.getFocusedFileData())
		console.log(this.app.workspace.activeLeaf.parent.children[1].id)
	};

	ModeSwitcher(PluginIsTurnedOn: boolean) {
		// if Plugin Is Turned On return false
		// if Plugin Isn't Turned On return true
		return (this.settings.PluginIsTurnedOn == false)
	};


	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		);
		
		//this.addRibbonIcon("dice", "Activate view", () => {
		//	this.activateView();
		//});

		this.addRibbonIcon("switch", "Turn on/off effortless canvas", () => {
			this.settings.PluginIsTurnedOn = this.ModeSwitcher(this.settings.PluginIsTurnedOn);
		});

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
				this.app.workspace.openLinkText(
					this.getFocusedFileData(),
					'',
					'tab'
				);
			}
		});

		this.registerEvent(this.app.workspace.on('file-open', (file) => {
			// 在這裡執行你的指令，file 是被選擇的文件對象
			
			if (this.getFocusedFileData() === false) {
				if (this.getActiveCanvas() == undefined) {
				// focusing on markdown / non-canvas type do nothing(for view/editing)
					return (0)
				}
				else {
				// focusing on canvas type then close all of md file
					this.app.workspace.detachLeavesOfType('markdown');
					return(0)
				}
			}	
			if (this.settings.PluginIsTurnedOn == true  ) { 
				this.app.workspace.detachLeavesOfType('markdown');
				
				this.openFocusedNode();
				this.printFocusedCanvasData_dev();

			}
		}));
	}

	onunload() {

	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}

}

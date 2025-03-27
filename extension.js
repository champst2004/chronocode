const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

let timeTracker = {};
let currentFileType = null;
let lastSwitchTime = Date.now();
const storageFilePath = path.join(__dirname, "time_data.json");

function loadPreviousData() {
    if (fs.existsSync(storageFilePath)) {
        try {
            const data = fs.readFileSync(storageFilePath, "utf8");
            timeTracker = JSON.parse(data);
        } catch (error) {
            console.error("Error reading time data:", error);
        }
    }
}

function saveData() {
    fs.writeFileSync(storageFilePath, JSON.stringify(timeTracker, null, 2));
}

function startTracking(context) {
    loadPreviousData();

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor && editor.document) {
            const fileType = path.extname(editor.document.fileName);
            if (fileType) {
                updateTimeSpent(fileType);
                currentFileType = fileType;
                lastSwitchTime = Date.now();
            }
        }
    });

    let trackingInterval = setInterval(() => {
        if (currentFileType) {
            updateTimeSpent(currentFileType);
        }
    }, 1000);

    context.subscriptions.push({
        dispose: () => clearInterval(trackingInterval),
    });
}

function updateTimeSpent(fileType) {
    const currentTime = Date.now();
    const today = new Date().toISOString().split("T")[0];
    const timeSpent = (currentTime - lastSwitchTime) / 1000;

    if (!timeTracker[today]) timeTracker[today] = {};
    if (!timeTracker[today][fileType]) timeTracker[today][fileType] = 0;

    timeTracker[today][fileType] += timeSpent;

    lastSwitchTime = currentTime;
    saveData();
}

function showStats(context) {
    const panel = vscode.window.createWebviewPanel(
        "timeTrackerStats",
        "Time Tracker Stats",
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    // Read the stats.html file
    const htmlPath = path.join(__dirname, "display.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    panel.webview.html = htmlContent;

    panel.webview.onDidReceiveMessage(async (message) => {
        if (message.command === "requestData") {
            panel.webview.postMessage({ command: "updateData", data: timeTracker });
        }
        else if (message.command === "export") {
            const options = {
                defaultUri: vscode.Uri.file(path.join(__dirname, "coding_time_logs.json")),
                filters: { "JSON Files": ["json"] }
            };

            const fileUri = await vscode.window.showSaveDialog(options);
            if (fileUri) {
                fs.writeFileSync(fileUri.fsPath, JSON.stringify(timeTracker, null, 2));
                vscode.window.showInformationMessage(`Exported stats to ${fileUri.fsPath}`);
            }
        }
    });

    panel.onDidChangeViewState((event) => {
        if (event.webviewPanel.active) {
            panel.webview.postMessage({ command: "updateData", data: timeTracker });
        }
    });
}

function activate(context) {
    startTracking(context);

    let disposable = vscode.commands.registerCommand(
        "extension.showTimeStats",
        () => showStats(context)
    );

    context.subscriptions.push(disposable);
}

function deactivate() {
    saveData();
}

module.exports = { activate, deactivate };

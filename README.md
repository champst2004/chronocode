# **ChronoCode - Time Tracking for VS Code**  

ChronoCode is a **VS Code extension** that helps developers track **time spent on different programming languages** while coding. It logs coding activity, calculates **daily streaks (like Duolingo),** and allows exporting logs for analysis.  

---

## **🚀 Features**  

✔ **Tracks time spent per programming language** (e.g., Python, JavaScript, C++)  
✔ **Daily Streak System** – Maintains streaks if a language is used **for 60+ seconds on consecutive days**  
✔ **Interactive UI** – Displays coding stats in a table format  
✔ **Export Logs** – Save coding time logs as JSON  
✔ **Lightweight & Works Offline** – No internet required  

### **🖥️ Screenshot**  
📌 *Coming soon* – Add screenshots/gifs of your extension in action!  

---

## **📦 Installation**  

1. Open **VS Code**  
2. Go to **Extensions Marketplace** (`Ctrl + Shift + X`)  
3. Search for **ChronoCode**  
4. Click **Install**  

Alternatively, install manually:  
```sh
code --install-extension chronocode.vsix
```

## ⚙️ How It Works
The extension detects when you open a file and tracks time based on its language.  
If you spend more than 60 seconds coding in a language for consecutive days, your streak increases.  
View your stats via the command:  
```bash
Ctrl + Shift + P → Show Coding Time Stats
```
## 🛠️ Requirements
VS Code (Version 1.70+)  
Node.js (for development & testing)  

## 📝 Release Notes
1.0.0 - Initial Release 🚀
✅ Basic time tracking for languages
✅ JSON log export

1.1.0 - Coming Soon 🔥
🚀 Weekly/monthly coding reports
🚀 Cloud sync for tracking across devices
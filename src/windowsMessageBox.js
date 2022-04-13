let windowsMessageBox = {
    initialized: false,

    init: function() {

        if (this.initialized)
            return;
        let cssUrl = "https://new.skwal.net/css/windowsMessageBox.css"
        var link = document.createElement("link");
        link.href = cssUrl;
        link.type = "text/css"
        link.rel = "stylesheet"
        document.body.appendChild(link)
        this.initialized = true;
    },

    removeAll: function() {
        let messageBoxes = $$(".windowsMessageBox");

        messageBoxes.forEach(function(messageBox) {
            remove(messageBox);
        })
    },

    show: async function(title, message, type = "error", buttons = [
        ["Ok", true]
    ], position = null) {
        if (!this.initialized)
            this.init();

        if (!["info", "error", "warning"].includes(type))
            throw new Error("Invalid message type : please use 'info', 'error' or 'warning'");
        if (!typeof buttons === "object")
            throw new Error("Invalid buttons : please use an array of [labal, returnValue]");
        if (!buttons.length > 0)
            throw new Error("Invalid buttons : please specify at least one button");
        if (typeof position != "object" && position != "random")
            throw new Error("Invalid position : please use [x, y] or 'random'");

        return new Promise(resolve => {

            function remove(element) {
                element.parentNode.removeChild(element);
            }

            function $$(selector) {
                return document.querySelectorAll(selector);
            }

            function GetRandomInt(min, max) {

                min = Math.ceil(min);
                max = Math.floor(max);
                RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
                return RandomInt;
            }

            function playSound(path) {
                new AudioContext()

                var audio = new Audio(path)
                audio.play()

                return audio
            }

            function setZIndex() {
                $$(".windowsMessageBox").forEach(element => {
                    if (element.style.zIndex > messageBox.style.zIndex - 1)
                        messageBox.style.zIndex = parseInt(element.style.zIndex) + 1
                })
            }

            playSound("https://new.skwal.net/assets/windowsSound-" + type + ".wav")



            let messageBoxesCount = $$(".windowsMessageBox").length;

            let messageBox = document.createElement("div");
            messageBox.classList.add("windowsMessageBox");

            messageBox.style.zIndex = messageBoxesCount + 1;


            if (position) {
                if (position == "random")
                    position = [GetRandomInt(0, window.innerWidth), GetRandomInt(0, window.innerHeight)];

                messageBox.style.left = position[0] + "px";
                messageBox.style.top = position[1] + "px";

            } else
                messageBox.style.left = messageBox.style.top = 100 + (messageBoxesCount + 1) * 15 + "px";


            messageBox.innerHTML = `
                <div class="titleBar">
                    <span class="title">${title}</span>
                    <img class="closeButton" src="https://new.skwal.net/assets/windowsCloseButton.png" alt="close button">
                </div>
                <div class="content">
                    <img src="https://new.skwal.net/assets/windowsMessageBox-${type}.png" alt="icon">
                    <span class="message">${message}</span>
                </div>
                <div class="buttons">

                </div>
            `

            setZIndex();


            let closeButton = messageBox.querySelector(".closeButton");
            closeButton.addEventListener("mousedown", () => {
                remove(messageBox);
                resolve(false);
            })

            messageBox.onmousedown = setZIndex;

            var buttonsContainer = messageBox.querySelector(".windowsMessageBox .buttons");

            buttons.forEach(button => {
                let buttonElement = document.createElement("button");
                buttonElement.classList.add("button");

                buttonElement.innerText = button[0];

                buttonsContainer.appendChild(buttonElement);

                buttonElement.onclick = function() {
                    remove(messageBox);

                    if (typeof button[1] != "undefined")
                        resolve(button[1]);
                    resolve(button[0]);
                }
            });

            var titleBar = messageBox.querySelector(".windowsMessageBox .titleBar");

            titleBar.onmousedown = function(event) {
                titleBar.isClicked = true;

                startMouseX = event.clientX
                startMouseY = event.clientY
                setZIndex()
                startMessagePosX = messageBox.style.left.substr(0, messageBox.style.left.length - 2)
                startMessagePosY = messageBox.style.top.substr(0, messageBox.style.top.length - 2)
            }

            titleBar.onmouseup = function() {
                titleBar.isClicked = false;
            }

            document.addEventListener("mousemove", function(event) {
                if (titleBar.isClicked) {

                    messageBox.style.left = startMessagePosX - (startMouseX - event.clientX) + "px"
                    messageBox.style.top = startMessagePosY - (startMouseY - event.clientY) + "px"
                }
            })

            document.body.appendChild(messageBox);
        });
    }
}
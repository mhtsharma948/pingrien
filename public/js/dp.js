"use strict";
class DpOnClick {
    constructor() {
        // debugger;
        var self = this;
        //***dp create function***
        var dpProp = document.createElement('div');
        dpProp.className = "DpProp";
        document.body.appendChild(dpProp);
        this.dpCreate(dpProp);
        var cwCheck = 0;
        //this.createChatWindow(cwCheck);

    }
    dragDrop(dragElement, dropZone, mainContainer) {
        //drag chat Content
        //var dpOnClick = new DpOnClick;

        var allowDrop = function (ev) {
            ev.preventDefault();
        };

        var drag = function (ev) {
            console.log(ev.target.className);
            ev.dataTransfer.setData("text/html", ev.target.className);
        };

        var drop = function (ev) {
            ev.preventDefault();
            var pickedDataClass = ev.dataTransfer.getData("text/html");
            var pickedData = chatWindow.getElementsByClassName(pickedDataClass);
            for (let i = 0; i < pickedData.length; i++) {
                var nodeCopy = pickedData[i].cloneNode(true);
                nodeCopy.style.marginTop = 2 + "px";
            }
            ev.target.appendChild(nodeCopy);
        };

        var dropForGrp = function (ev) {
            ev.preventDefault();
            var pickedDataClass = ev.dataTransfer.getData("text/html");
            var pickedData = mainContainer.getElementsByClassName(pickedDataClass);
            console.log(pickedData);
            console.log(pickedDataClass);
           /* for (let i = 0; i < pickedData.length; i++) {
                console.log("in");
            }*/
            var xhttp = new XMLHttpRequest();
            var dpProp = document.getElementsByClassName("DpProp");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.response);
                    var grpConn = JSON.parse(xhttp.response);
                    for (let i=0; i<grpConn.length; i++){
                        var dpContainer = document.createElement('div');
                        var img = document.createElement('img');
                        var uname = document.createElement('div');
                        var unameH3 = document.createElement('h3');

                        dpContainer.className = "DpContainer";
                        img.className = "Dp";
                        img.src = grpConn[i].dp;
                        uname.className = "Uname";
                        unameH3.innerHTML = grpConn[i].name;

                        dpProp[0].appendChild(dpContainer);
                        dpContainer.appendChild(img);
                        dpContainer.appendChild(uname);
                        uname.appendChild(unameH3);

                    }

                    var dp = document.getElementsByClassName("Dp");
                    var dpContainer = document.getElementsByClassName("DpContainer");
                    for (let i = 0; i < dp.length; i++) {
                        console.log(dp);
                        dp[i].addEventListener('click', self.createChatWindow);
                    }
                    //self.dragDrop(dp, dpContainer, dpProp);
                }
            };

            xhttp.open("post", "/addGrpConnections", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("fromUserName=" +"mohit"+ "&toUserName1="+"prateek" + "&toUserName2="+"abc" + "&dp="+"/images/DSC_0533.JPG");
        }

        for (var i = 0; i < dragElement.length; i++) {
            dragElement[i].draggable = "true";
            dropZone[i].addEventListener("drop", dropForGrp);
            dropZone[i].addEventListener("dragover", allowDrop);
            dragElement[i].addEventListener("dragstart", drag);
        }
    };
    getMessage(messageWindow, forceLoad) {
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var splittedText = xhttp.response.split(";");
                var getMsgData = JSON.parse(splittedText[0]);

                for (let i = 0; i < getMsgData.length; i++) {
                    if (forceLoad)
                        if (JSON.stringify(self.previousMsg) != JSON.stringify(getMsgData)) {
                            var prat = JSON.stringify("prateek");
                            var mohit = JSON.stringify("mohit");
                            if (getMsgData[i].msgType === "txt") {
                                if (currentUserName === JSON.stringify(getMsgData[i].fromUserName) && JSON.stringify(getMsgData[i].toUserName) === prat) {
                                    var myChatContent = document.createElement('div');
                                    myChatContent.className = 'MyChatContent';
                                    myChatContent.innerHTML = getMsgData[i].msg;
                                    messageWindow[0].appendChild(myChatContent);
                                }
                                if (JSON.stringify(getMsgData[i].fromUserName) === prat && JSON.stringify(getMsgData[i].toUserName) === mohit) {
                                    myChatContent = document.createElement('div');
                                    myChatContent.className = 'OtherChatContent';
                                    myChatContent.innerHTML = getMsgData[i].msg;
                                    messageWindow[0].appendChild(myChatContent);
                                }
                                self.dragDrop(myChatContent, messageWindow[0]);
                            }
                            if (getMsgData[i].msgType === "img") {
                                var showImage;
                                var myImage1;
                                if (currentUserName === JSON.stringify(getMsgData[i].fromUserName) && JSON.stringify(getMsgData[i].toUserName) === prat) {
                                    myImage1 = document.createElement('img');
                                    myImage1.className = 'MyImage1';
                                    myImage1.src = getMsgData[i].msg;
                                    showImage = getMsgData[i].msg;
                                    messageWindow[0].appendChild(myImage1);
                                }
                                if (JSON.stringify(getMsgData[i].fromUserName) === prat && JSON.stringify(getMsgData[i].toUserName) === mohit) {
                                    myImage1 = document.createElement('img');
                                    myImage1.className = 'OtherImage1';
                                    myImage1.src = getMsgData[i].msg;
                                    showImage = getMsgData[i].msg;
                                    messageWindow[0].appendChild(myImage1);
                                }
                                myImage1.addEventListener('click', new OpenImage(myImage1, showImage));
                            }
                        }

                }
                self.previousMsg = getMsgData;
                self.loadedOnce = true;
            }
        };
        xhttp.open("get", "/getMessage", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();

    }
    dpCreate(dpProp) {
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var conn = JSON.parse(xhttp.response);
                this.uName = conn;
                for (let i=0; i<conn.length; i++){
                    var dpContainer = document.createElement('div');
                    var img = document.createElement('img');
                    var uname = document.createElement('div');
                    var unameH3 = document.createElement('h3');

                    dpContainer.className = "DpContainer";
                    img.className = "Dp";
                    img.src = conn[i].connection.dp;
                    uname.className = "Uname";
                    unameH3.innerHTML = conn[i].connection.name;

                    dpProp.appendChild(dpContainer);
                    dpContainer.appendChild(img);
                    dpContainer.appendChild(uname);
                    uname.appendChild(unameH3);

                }

                var dp = document.getElementsByClassName("Dp");
                var dpContainer = document.getElementsByClassName("DpContainer");
                for (let i = 0; i < dp.length; i++) {
                    dp[i].addEventListener('click', self.createChatWindow);
                }
                //self.dragDrop(dp, dpContainer, dpProp);
            }
        };

        xhttp.open("get", "/getConnection", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();

    };
    createChatWindow() {
        //***chat window create function***
        var cwCheck = 0;
        if (cwCheck === 0) {
            cwCheck += 1;
            self.chatWindow = document.createElement('div');
            var chatWindow = self.chatWindow;
            chatWindow.className = "ChatWindow";
            chatWindow.innerHTML = '<div class="DraggableElement" draggable="true">' +
                '<font size="5">Mohit</font>' +
                '<div class="CloseDiv">' +
                '<a class="Close">✕</a>' +
                '</div>' +
                '</div>' +
                '<div class="MessageWindow" >' +
                '</div>' +
                '<div class="InputContainer">' +
                '<input type="text" class="TextField">' +
                '<div class="sendBtn">send</div>' +
                '</div>';

            var textField = chatWindow.getElementsByClassName("TextField");
            var sendBtn = chatWindow.getElementsByClassName("sendBtn");

            var drag = new Draggable(chatWindow);

            self.loadedOnce = false;

            setInterval(function () {
                // debugger;
                // console.log(self.loadedOnce);
                if (self.loadedOnce)
                    var forceLoad = false;
                else
                    forceLoad = true;
                this.getMessage(messageWindow, forceLoad, chatWindow);
            }, 1000);
            var sendMessage = function () {
                var textFieldData = textField[0].value;
                console.log(textField[0].value);
                var msgType = "txt";
                var toUserName = "mohit";
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var msgData = JSON.parse(xhttp.response);
                        if (msgData.msgType === "txt") {
                            console.log(msgData.msg);
                            // myChatContent[0].innerHTML = msgData.msg;
                            // messageWindow[0].appendChild(myChatContent[0]);
                            var myChatContent = document.createElement('div');
                            myChatContent.className = 'MyChatContent';
                            myChatContent.innerHTML = msgData.msg;
                            messageWindow[0].appendChild(myChatContent);
                            textField[0].value = "";
                            console.log(textField[0]);
                        }
                    }
                };

                xhttp.open("post", "/sendMessage", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send("msg=" + textFieldData + "&msgType=" + msgType + "&toUserName=" + toUserName);
            };
            sendBtn[0].addEventListener("click", sendMessage);
            //exit function
            var cross = chatWindow.getElementsByClassName("Close");
            var crossDiv = chatWindow.getElementsByClassName("CloseDiv");
            var messageWindow = chatWindow.getElementsByClassName("MessageWindow");
            cross[0].addEventListener("click", function () {
                chatWindow.style.visibility = "hidden";
                cwCheck -= 1;
            });

            cross[0].addEventListener("mousedown", function () {
                crossDiv[0].style.backgroundColor = "#AA0000";
            });

            document.body.appendChild(chatWindow);
        } else {
            self.chatWindow.style.visibility = "visible";
        }
    };
}
new DpOnClick();
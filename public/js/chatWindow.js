"use strict";
class Draggable {
    constructor(element) {
        this.element = element;
        var self = this;
        var move = function (event) {
            event.stopPropagation();
            event.preventDefault();
            var originalLeft = parseInt(window.getComputedStyle(self.element).left);
            var originalTop = parseInt(window.getComputedStyle(self.element).top);
            var mouseDownX = event.clientX;
            var mouseDownY = event.clientY;

            function dragMe(event) {
                self.element.style.left = originalLeft + event.clientX - mouseDownX + "px";
                self.element.style.top = originalTop + event.clientY - mouseDownY + "px";
                self.element.style.zIndex = 100;
                event.stopPropagation();
                if (element.offsetTop <= 80) {
                    self.element.style.top = 80 + "px";
                }
                if (element.offsetLeft <= 0) {
                    self.element.style.left = 0 + "px";
                }

            }

            function dropMe(event) {
                document.removeEventListener('mousemove', dragMe, true);
                document.removeEventListener('mouseup', dropMe, true);
                event.stopPropagation();
            }

            document.addEventListener('mousemove', dragMe, true);
            document.addEventListener('mouseup', dropMe, true);
        };
        var draggableElement = this.element.getElementsByClassName("DraggableElement")[0];
        draggableElement.addEventListener('mousedown', move, false);

        //increase z-index
        element.addEventListener('click', function () {
            self.element.style.zIndex = parseInt(self.element.style.zIndex) + 1;
        });
    }

}

class OpenImage {
    constructor(MyImage1, showImage) {
        var fullScreenImageContainer = document.createElement('div');
        fullScreenImageContainer.className = "FullScreenImageContainer";

        var fullScreenImageDiv = document.createElement('div');
        fullScreenImageDiv.className = "FullScreenImageDiv";

        var fullScreenImg = document.createElement('img');
        fullScreenImg.className = "FullScreenImg";
        fullScreenImg.src = showImage;

        fullScreenImageContainer.appendChild(fullScreenImageDiv);
        fullScreenImageDiv.appendChild(fullScreenImg);
        MyImage1.addEventListener('click', function () {
            document.body.appendChild(fullScreenImageContainer);
        });
        window.document.onkeydown = function (ev) {
            if (ev.keyCode === 27 && fullScreenImageContainer != null) {
                fullScreenImageContainer.parentNode.removeChild(fullScreenImageContainer);
            }
        };
        fullScreenImageContainer.addEventListener('click', function () {
            if (event.target === fullScreenImageContainer)
                fullScreenImageContainer.parentNode.removeChild(fullScreenImageContainer);
        });
    }
}

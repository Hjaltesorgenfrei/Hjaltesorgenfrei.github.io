// Create a class for the element
export class Card extends HTMLElement {
    constructor(text, onclick, type) {
        // Always call super first in constructor
        super();
        // Create a shadow root

        // Create spans
        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-type', type);
        wrapper.classList.add('light', 'card', type);

        const info = document.createElement('p');
        info.setAttribute('class', 'text');

        var longpress = false;
        var presstimer = null;
        var longtarget = null;

        var cancel = function(e) {
            if (presstimer !== null) {
                clearTimeout(presstimer);
                presstimer = null;
            }

            this.classList.remove("longpress");
        };

        var click = function(e) {
            if (presstimer !== null) {
                clearTimeout(presstimer);
                presstimer = null;
            }

            this.classList.remove("longpress");

            if (longpress) {
                return false;
            }

            onclick(this);
        };

        var start = function(e) {
            console.log(e);

            if (e.type === "click" && e.button !== 0) {
                return;
            }

            longpress = false;

            this.classList.add("longpress");

            if (presstimer === null) {
                let thingy = this;
                presstimer = setTimeout(function() {
                    thingy.classList.add("remove");
                    thingy.classList.remove("selected");
                    longpress = true;
                }, 1000);
            }

            return false;
        };

        wrapper.addEventListener("mousedown", start);
        wrapper.addEventListener("touchstart", start);
        wrapper.addEventListener("click", click);
        wrapper.addEventListener("mouseout", cancel);
        wrapper.addEventListener("touchend", cancel);
        wrapper.addEventListener("touchleave", cancel);
        wrapper.addEventListener("touchcancel", cancel);

        // Take attribute content and put it inside the info span
        text = text ?? this.getAttribute('data-text');
        info.textContent = text;

        this.appendChild(wrapper);
        wrapper.appendChild(info);
    }
}
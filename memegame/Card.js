// Create a class for the element
export class Card extends HTMLElement {
    constructor(text, onclick, type) {
        // Always call super first in constructor
        super();
        // Create a shadow root

        // Create spans
        const wrapper = document.createElement('div');
        if (onclick) {
            wrapper.onclick = function() { onclick(this); };
        }
        wrapper.setAttribute('data-type', type);
        wrapper.classList.add('light', 'card', type);

        const info = document.createElement('p');
        info.setAttribute('class', 'text');

        // Take attribute content and put it inside the info span
        text = text ?? this.getAttribute('data-text');
        info.textContent = text;

        this.appendChild(wrapper);
        wrapper.appendChild(info);
    }
}
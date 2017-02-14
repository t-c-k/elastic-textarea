function ElasticTextarea (textarea, options) {
    // Define variables
    this.options  = options || {};
    this.textarea = textarea;
    this.wrapper  = document.createElement("div");
    this.pre      = document.createElement("pre");

    // Build elastic textarea
    this.addEventListener("input", this);
    this.setClass(this.options.class);
    this.setId(this.options.id);
    this.updateText();
    this.wrapTextarea();
}

ElasticTextarea.prototype.addEventListener = function (event, listener) {
    this.textarea.addEventListener(event, listener, false);
};

ElasticTextarea.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "input":
            this.updateText();
    }
};

ElasticTextarea.prototype.setClass = function (className) {
    // Set default class
    this.wrapper.className = "elastic-textarea";

    // Add custom class
    if (className) {
        this.wrapper.className += " " + className;
    }
};

ElasticTextarea.prototype.setId = function (id) {
    // Set custom ID
    if (id) {
        this.wrapper.id = id;
    }
};

ElasticTextarea.prototype.updateText = function () {
    this.pre.textContent = this.textarea.value + "\n";
};


ElasticTextarea.prototype.wrapTextarea = function () {
    var textareaIsFocused = this.textarea == document.activeElement;

    // Replace textarea with the wrapper
    this.textarea.parentNode.insertBefore(this.wrapper, this.textarea);

    // Append elements to the wrapper
    this.wrapper.appendChild(this.pre);
    this.wrapper.appendChild(this.textarea);

    // Refocus the textarea
    if (textareaIsFocused) { this.textarea.focus(); }
};

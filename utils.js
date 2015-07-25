exports.support = (function support() {
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
}());

var keys = [
    'screenX', 'screenY', 'clientX', 'clientY',
    'ctrlKey', 'altKey', 'shiftKey', 'metaKey',
    'button'
];

exports.serializeClick = function(e) {
    var serialized = {};
    keys.forEach(function(key) {
        serialized[key] = e[key];
    });

    return serialized;
}

exports.dispatchClick = function(serialized) {
    var $el, event;
    if ($el = document.elementFromPoint(serialized.clientX, serialized.clientY)) {
        serialized.bubbles = true;
        serialized.cancelable = true;
        serialized.view = window;

        event = new MouseEvent('click', serialized);
        event.synthetic = true;

        $el.dispatchEvent(event);
    }
}

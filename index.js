var support = require('./utils').support;
var serializeClick = require("./utils").serializeClick;
var dispatchClick = require("./utils").dispatchClick;


module.exports = function($parent, $element, delay) {
    if (support && document.addEventListener) {
        var started = false;
        var timer, clicked;

        $element.style.cssText = [
            '-webkit-transform: translate3d(0,0,0);',
            'transform: translate3d(0,0,0);',
            'position: fixed;',
            'top: 0;',
            'right: 0;',
            'left: 0;',
            'bottom: 0;',
            'opacity: 0;',
            'z-index: 9;',
            'pointer-events: none'
        ].join('');

        $parent.addEventListener('scroll', function scroll() {
            if (started===false) {
                started = true;
                $element.style.pointerEvents = 'auto';
            }

            clearTimeout(timer);
            timer = setTimeout(function() {
                $element.style.pointerEvents = 'none';
                started = false;

                if (clicked) {
                    dispatchClick(clicked);
                    clicked = false;
                }
            }, delay||500);
        }, false);

        // capture all clicks and store x, y coords for later
        document.addEventListener('click', function clickCatcher(event) {
            if (event.target===$element && !event.synthetic) {
                clicked = serializeClick(event);
            }
        }, false);
    }

    return function() {
        clearTimeout(timer);
        $element.style.cssText = '';
        document.removeEventListener('click', clickCatcher, false);
        $parent.removeEventListener('scroll', scroll);
    }
}

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

        var onScroll = function(event) {
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
        }

        var onClick = function(event) {
            if (event.target===$element && !event.synthetic) {
                clicked = serializeClick(event);
            }
        }

        // handle pointerEvents on scroll event
        $parent.addEventListener('scroll', onScroll, false);
        // capture all clicks and store x, y coords for later
        document.addEventListener('click', onClick, false);

        return function() {
            clearTimeout(timer);
            $element.style.cssText = '';
            document.removeEventListener('click', onClick, false);
            $parent.removeEventListener('scroll', onScroll, false);
        }
    }
}

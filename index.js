var support = require('./utils').support;
var serializeClick = require("./utils").serializeClick;
var dispatchClick = require("./utils").dispatchClick;


module.exports = function(ele, delay) {
    if (support && document.addEventListener) {
        var cover = document.createElement('div');
        var started = false;
        var timer, clicked;

        cover.id = 'fps60-container';
        cover.style.cssText = [
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

        document.body.appendChild(cover);

        ele.addEventListener('scroll', function scroll() {
            if (started===false) {
                started = true;
                cover.style.pointerEvents = 'auto';
            }
            clearTimeout(timer);

            timer = setTimeout(function(){
                cover.style.pointerEvents = 'none';
                started = false;

                if (clicked) {
                    dispatchClick(clicked);
                    clicked = false;
                }
            }, delay||500);
        }, false);

        // capture all clicks and store x, y coords for later
        document.addEventListener('click', function clickCatcher(event) {
            if (event.target === cover && !event.synthetic) {
                clicked = serializeClick(event);
            }
        }, false);
    }
}

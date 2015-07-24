var support = require('./utils').support,
    dispatchClick = require("./utils").dispatchClick;


module.exports = function(ele, delay) {
    if (document.addEventListener) {
        var cover = document.createElement('div'),
            body = document.body,
            coverStyle = cover.style,
            scrollStarted = false,
            timer,
            clicked = false,
            pos = { x: 0, y: 0 };

        coverStyle.cssText = [
            '-webkit-transform: translate3d(0,0,0);',
            'transform: translate3d(0,0,0);',
            'position: fixed;',
            'top: 0;',
            'left: 0;',
            'opacity: 0;',
            'z-index: 9;',
            'pointer-events: none'
        ].join('');
        body.appendChild(cover);

        ele.addEventListener('scroll', function scroll() {
            if(!scrollStarted) {
                coverStyle.pointerEvents = 'auto';
                coverStyle.right = 0;
                coverStyle.bottom = 0;
                scrollStarted = true;
            }
            clearTimeout(timer);

            timer = setTimeout(function(){
                coverStyle.pointerEvents = 'none';
                coverStyle.right = '';
                coverStyle.bottom = '';
                scrollStarted = false;
                if(clicked) {
                    dispatchClick(pos);
                    clicked = false;
                }
            }, delay);
        }, false);

        // capture all clicks and store x, y coords for later
        document.addEventListener('click', function clickCatcher(event) {
            if(event.target === cover && !event.synthetic) {
                pos.x = event.clientX;
                pos.y = event.clientY;
                clicked = true;
            }
        }, false);
    }
}

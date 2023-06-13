"use strict";
exports.__esModule = true;
function Content(props) {
    // console.log('props', props.item)
    return (React.createElement("div", null,
        React.createElement("b", null,
            props.item.name,
            props.item.exerciseCount)));
}
exports["default"] = Content;

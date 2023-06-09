"use strict";
exports.__esModule = true;
function Part(props) {
    var _a;
    var assertNever = function (value) {
        throw new Error("Unhandled discriminated union member: " + JSON.stringify(value));
    };
    switch (props.item.kind) {
        case 'basic':
            console.log('basic', props.item);
            return React.createElement("div", null, props.item.description);
        case 'group':
            console.log('group', props.item);
            return React.createElement("div", null, props.item.groupProjectCount);
        case 'background':
            console.log('background', props.item);
            return (React.createElement("div", null,
                React.createElement("p", null, props.item.description),
                " ",
                React.createElement("p", null, props.item.backgroundMaterial)));
        case 'special':
            console.log('special', props.item);
            return (React.createElement("div", null,
                React.createElement("p", null, props.item.description),
                "require skill:", (_a = props.item.requirements) === null || _a === void 0 ? void 0 :
                _a.map(function (requirement, idx) { return (React.createElement("span", { key: idx },
                    " ",
                    requirement)); })));
        default:
            return null;
    }
}
exports["default"] = Part;

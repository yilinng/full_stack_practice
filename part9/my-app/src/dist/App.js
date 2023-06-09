"use strict";
exports.__esModule = true;
var Content_1 = require("./components/Content");
var Header_1 = require("./components/Header");
var Total_1 = require("./components/Total");
var Part_1 = require("./components/Part");
var App = function () {
    var courseName = 'Half Stack application development';
    var courseParts = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic'
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group'
        },
        {
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic'
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
            kind: 'background'
        },
        {
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic'
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special'
        },
    ];
    var total = courseParts.reduce(function (carry, part) { return carry + part.exerciseCount; }, 0);
    return (React.createElement("div", null,
        React.createElement(Header_1["default"], { name: courseName }),
        courseParts.map(function (item, index) { return (React.createElement("div", { key: index },
            React.createElement(Content_1["default"], { item: item }),
            React.createElement(Part_1["default"], { item: item }))); }),
        React.createElement(Total_1["default"], { total: total })));
};
exports["default"] = App;

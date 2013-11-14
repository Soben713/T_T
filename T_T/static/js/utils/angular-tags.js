//angular.markup('(())', function(text, textNode, parentElement){
//    if (parentElement[0].nodeName.toLowerCase() == 'script') return;
//    text = text.replace(/\(\(/g,'{{').replace(/\)\)/g, '}}');
//    textNode.text(text);
//    return angular.markup('{{}}').call(this, text, textNode, parentElement);
//});
//
//angular.attrMarkup('(())', function(value, name, element){
//    value = value.replace(/\(\(/g,'{{').replace(/\)\)/, '}}');
//    element[0].setAttribute(name, value);
//    return angular.attrMarkup('{{}}').call(this, value, name, element);
//});

var customInterpolationApp = angular.module('customInterpolationApp', []);

customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


customInterpolationApp.controller('DemoController', function DemoController() {
    this.label = "This binding is brought you by // interpolation symbols.";
});
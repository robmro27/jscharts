angular.module("app", ["chart.js"])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
})      
.controller("ChartsController", function ($scope, $timeout) {
    
    $scope.canvas1 = document.getElementById("chart1");
    $scope.canvas2 = document.getElementById("chart2");
   
    initChart1("Concepts", "Click on 1 concept to see categories");
    
    function initChart1(title, subTitle) {
        $scope.chart1Visibility = true;
        $scope.chart2Visibility = false;
        $scope.chart3Visibility = false;
        $scope.data1 = [{"First1": 100,},{"First2": 100},{"First3": 100}];
        $timeout(function(){
             $scope.$apply()
        });
        chart1 = doughnut('chart1', $scope.data1, title, subTitle);
    };
    
    function initChart2(title, subTitle) {
        $scope.chart1Visibility = true;
        $scope.chart2Visibility = true;
        $scope.chart3Visibility = false;
        $scope.data2 = [{"Second1": 45,},{"Second2": 100},{"Second3": 80}];
        $timeout(function(){
             $scope.$apply()
        });
        chart2 = doughnut('chart2', $scope.data2, title, subTitle);
    };
    
    function initChart3(title, subTitle) {
        $scope.chart1Visibility = true;
        $scope.chart2Visibility = true;
        $scope.chart3Visibility = true;
        $scope.data3 = [{"Third1": 30,},{"Third2": 20},{"Third3": 10}];
        $timeout(function(){
             $scope.$apply()
        });
        chart3 = doughnut('chart3', $scope.data3, title, subTitle);
    };
    
    $scope.canvas1.onclick = function (evt) {
        var clicked = chart1.getElementsAtEvent(evt)[0]._model;
        // some ajax call or parsing data and ther display 2 chart
        console.log($scope.chart2Visibility);
        $scope.chart3Visibility = false;
        initChart2(clicked.label, clicked.label);
    };
    
    $scope.canvas2.onclick = function (evt) {
        var clicked = chart2.getElementsAtEvent(evt)[0]._model;
        // some ajax call or parsing data and ther display 3 chart
        console.log(clicked);
        $scope.chart3Visibility = true;
        initChart3(clicked.label, clicked.label);
    };
    
});
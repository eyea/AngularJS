/**
依赖，ng-cordova
*/

angular.module("businessApp")
   .directive("touchActiveDrictive", function() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs){
                var _this = element[0];
                var _thisClassName = _this.className ;
                var _innerThis = angular.element(_this).find('a')[0];
                var _innerThisClassName = _innerThis.className ;

                _this.addEventListener('touchstart',function(){
                    _this.className = _thisClassName + ' item-active';
                    _innerThis.className = _innerThisClassName + ' item-active';
                    setTimeout(function(){
                        _this.className = _thisClassName;
                        _innerThis.className = _innerThisClassName;
                    },300);
                },false);
            }
        }
    });

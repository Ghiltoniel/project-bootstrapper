'use strict';

angular.module('app')
.factory("ExempleService", function() {
	return {
		method: function(){
			return 'ok';
		}
	};
});
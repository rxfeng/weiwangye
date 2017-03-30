//获取城市
function getCity(onSuccess, onError, data) {
	$.ajax({
		url: '../city.json',
		type: 'get',
		dataType: 'json',
		data: {},
		success: function (result) {
			onSuccess(result);
		},
		error: function(result) {
			onError(result);
		}
	});
}
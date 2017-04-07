//获取城市
function getCity(onSuccess, onError, data) {
	console.log(data.city);
	$.ajax({
		url: '../city.json',
		type: 'get',
		dataType: 'json',
		data: JSON.stringify(data),
		success: function (result) {
			onSuccess(result);
		},
		error: function(result) {
			onError(result);
		}
	});
}
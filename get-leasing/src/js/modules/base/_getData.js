const getData = (callback) => {

  $.ajax({
	  method: 'GET',
	  url: './data/data.json',
	  dataType: 'JSON',
	  success: (data) => {
	  	callback(data);
	  },
	  error: (error) => {
	  	console.log(error);
	  }
  });

};

module.exports = getData;

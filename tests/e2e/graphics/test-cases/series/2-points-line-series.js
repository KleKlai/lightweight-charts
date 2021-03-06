function generateBar(i, target) {
	var step = (i % 20) / 1000;
	var base = i / 5;
	target.open = base * (1 - step);
	target.high = base * (1 + 2 * step);
	target.low = base * (1 - 2 * step);
	target.close = base * (1 + step);
}

function generateData() {
	var res = [];
	var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
	for (var i = 0; i < 500; ++i) {
		var item = {
			time: time.getTime() / 1000,
		};
		time.setUTCDate(time.getUTCDate() + 1);

		generateBar(i, item);
		res.push(item);
	}
	return res;
}

// eslint-disable-next-line no-unused-vars
function runTestCase(container) {
	var chart = LightweightCharts.createChart(container);

	var mainSeries = chart.addBarSeries();
	var lineSeries = chart.addLineSeries();

	var data = generateData();
	var lineData = [
		{ time: data[0].time, value: data[0].close },
		{ time: data[data.length - 1].time, value: data[data.length - 1].close },
	];

	mainSeries.setData(data);
	lineSeries.setData(lineData);

	chart.timeScale().scrollToPosition(-5);
}

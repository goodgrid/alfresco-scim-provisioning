var filter = args["filter"];
var maxItems = args["count"];
var startIndex = args["startIndex"]

var filterArr = ((filter)?filter.split(" eq "):undefined);

var q = "TYPE:\"cm:authorityContainer\"" + ((filterArr)?" AND @cm\\:authorityName:" + filterArr[1]:"");

var page = 	{
	maxItems: maxItems,
	skipCount: startIndex
}

var count = search.query({
	query: q,
	page: page
}).length;

var groups = search.query({
	query: q,
	page: page
});

var result = {
	"totalResults": count,
	"itemsPerPage": maxItems,
	"startIndex": startIndex,
	"resources": []
};

for each (var group in groups) {
	result.resources.push({
		"id":group.properties["sys:node-uuid"],
	});
}

model.result = result;


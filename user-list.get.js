var filter = args["filter"];
var maxItems = args["count"];
var startIndex = args["startIndex"]

var filterArr = ((filter)?filter.split(" eq "):undefined);

var q = "TYPE:\"cm:person\"" + ((filterArr)?" AND @cm\\:userName:" + filterArr[1]:"");

var page = 	{
	maxItems: maxItems,
	skipCount: startIndex
}

var count = search.query({
	query: q,
	page: page
}).length;

var users = search.query({
	query: q,
	page: page
});

var result = {
	"totalResults": count,
	"itemsPerPage": maxItems,
	"startIndex": startIndex,
	"resources": []
};

for each (var user in users) {
	result.resources.push({
		"id":user.properties["sys:node-uuid"],
		"userName":user.properties["cm:userName"],
		"active":(user.hasAspect("cm:personDisabled")?false:true),
		"familyName":user.properties["cm:lastName"],
		"givenName":user.properties["cm:firstName"],
		"email": user.properties["cm:email"]
	});
}

model.result = result;


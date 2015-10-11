var tags = ["cms",
    "javascript",
    "js",
    "ASP.NET MVC",
    ".net",
    ".net",
    "css",
    "wordpress",
    "xaml",
    "js",
    "http",
    "web",
    "asp.net",
    "asp.net MVC",
    "ASP.NET MVC",
    "wp",
    "javascript",
    "js",
    "cms",
    "html",
    "javascript",
    "http",
    "http",
    "CMS"];

function generateTagCloud(tags, minFontSize, maxFontSize) {
    var docFrag = document.createDocumentFragment(),
        span = document.createElement('span'),
        occurrences = {},
        minCount = tags.length,
        maxCount = 0,
        fontStep;

    for (var i = 0, length = tags.length; i < length; i += 1) {
        if (occurrences[tags[i]]) {
            occurrences[tags[i]] += 1;
        } else {
            occurrences[tags[i]] = 1;
        }

        if (occurrences[tags[i]] < minCount) {
            minCount = occurrences[tags[i]];
        } else if (occurrences[tags[i]] > maxCount) {
            maxCount = occurrences[tags[i]];
        }
    }

    fontStep = (maxFontSize - minFontSize) / (maxCount - minCount);

    for (var prop in occurrences) {
        span.style.display = 'block';
        span.style.fontSize = (minFontSize + (occurrences[prop] - minCount) * fontStep) + 'px';
        span.innerHTML = prop + ': ' + occurrences[prop] + ' times, font-size: ' + span.style.fontSize;

        docFrag.appendChild(span.cloneNode(true));
    }

    root.appendChild(docFrag);
}

generateTagCloud(tags,17,42);
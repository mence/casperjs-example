'use strict';
var casper    = require('casper').create();
var links     = [];
var testSite  = {
    title: 'Hacker News',
    url: 'http://news.ycombinator.com'
};

function getLinks() {
    var links = document.querySelectorAll('td.title');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
  })
}

casper.start(testSite.url, function () {
    if (this.getTitle() == testSite.title) {
        this.echo('Title ' + testSite.title + ' loads correctly.','INFO');
    }
});

casper.then(function() {
  links = links.concat(this.evaluate(getLinks));
  this.echo(links.length + ' links found.', 'INFO');
})

casper.run();
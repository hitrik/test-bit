const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/hitrik/test-bit.git'
}, console.log).then(console.log);

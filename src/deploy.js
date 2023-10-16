const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'main',
    repo: 'https://github.com/hitrik/test-bit.git'
}, console.log).then(console.log);

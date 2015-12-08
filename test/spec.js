var specs = require.context('./src', true, /_spec\.js$/);
specs.keys().forEach(specs);

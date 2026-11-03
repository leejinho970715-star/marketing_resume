// Keep Vercel's OAuth User-Agent valid for non-ASCII Windows device names.
// This only changes the CLI process; normal Vercel authentication still applies.
const os = require('node:os');
const hostname = os.hostname.bind(os);
os.hostname = () => encodeURIComponent(hostname());
require('node:module').syncBuiltinESMExports();

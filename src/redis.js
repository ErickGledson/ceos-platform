const redis = require('ioredis');
const client = new redis({ password: 'root', port: 6379, host: 'redisservice' });

async function cacheRequestMiddleware(request, response, next) {
    const data = await client.get(request.url);

    if (!data) {
        await next();
        return await client.set(request.url, response.body);
    }

    response.body = data;
}

async function updateCacheRequestMiddleware(request, response, next) {
    await next();
    await client.del(request.url);
}

module.exports = {
    client,
    cacheRequestMiddleware,
    updateCacheRequestMiddleware
};


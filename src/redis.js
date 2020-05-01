const redis = require('ioredis');
const client = new redis({ password: 'root', port: 6379, host: 'redisservice' });

async function cacheRequestMiddleware(ctx, next) {
    const client = ctx.state.redis;
    const data = await client.get(ctx.request.url);

    if (!data) {
        await next();
        return await client.set(ctx.request.url, ctx.body);
    }

    ctx.body = data;
}

async function updateCacheRequestMiddleware(ctx, next) {
    const client = ctx.state.redis;
    await next();
    await client.del(ctx.request.url);
}

module.exports = {
    client,
    cacheRequestMiddleware,
    updateCacheRequestMiddleware
};


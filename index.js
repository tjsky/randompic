addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const background_urls = [
        'https://ww2.sinaimg.cn/large/be6ad69bgw1eys2ubi8loj218g0p0h3y.jpg',
        'https://ww4.sinaimg.cn/large/be6ad69bgw1eys2ubqm6ij218g0p0ql4.jpg',
        'https://ww3.sinaimg.cn/large/be6ad69bgw1eys2ubroxej218g0p0nki.jpg',
        'https://ww3.sinaimg.cn/large/be6ad69bgw1eys2ubpohkj218g0p01a1.jpg',
        'https://ww2.sinaimg.cn/large/be6ad69bgw1eys2ubkx6ij218g0p07ht.jpg'
    ];

    var index = Math.floor(Math.random() * background_urls.length);
    const imageUrl = background_urls[index];

    // 代理请求修改Referer解决微博图床防盗链问题
    const reqHeaders = new Headers(request.headers);
    let outHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": reqHeaders.get('Access-Control-Allow-Headers') || "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token"
    });

    try {
        // 构建代理请求
        const proxyResponse = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'Referer': 'https://weibo.com/' // 设置Referer头部以解决防盗链
            }
        });

        if (!proxyResponse.ok) {
            throw new Error(`Failed to fetch image: ${proxyResponse.status} ${proxyResponse.statusText}`);
        }

        const contentType = proxyResponse.headers.get('content-type');

        // 返回代理的结果
        return new Response(proxyResponse.body, {
            status: proxyResponse.status,
            statusText: proxyResponse.statusText,
            headers: {
                ...Object.fromEntries(proxyResponse.headers.entries()),
                'content-type': contentType || 'image/jpeg',
                'Access-Control-Allow-Origin': '*', // CORS支持
            }
        });
    } catch (err) {
        return new Response(`Error fetching image: ${err.message}`, { status: 500 });
    }
}

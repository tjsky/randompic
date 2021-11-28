addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

	var background_urls = [
'https://ww2.sinaimg.cn/large/be6ad69bgw1eys2ubi8loj218g0p0h3y.jpg',
'https://ww4.sinaimg.cn/large/be6ad69bgw1eys2ubqm6ij218g0p0ql4.jpg',
'https://ww3.sinaimg.cn/large/be6ad69bgw1eys2ubroxej218g0p0nki.jpg',
'https://ww3.sinaimg.cn/large/be6ad69bgw1eys2ubpohkj218g0p01a1.jpg',
'https://ww2.sinaimg.cn/large/be6ad69bgw1eys2ubkx6ij218g0p07ht.jpg'
 /*需要随机到的图片的链接*/
    ]
	var index = Math.floor((Math.random()*background_urls.length));
	res = await fetch(background_urls[index])
    return new Response(res.body, {
        headers: { 'content-type': 'image/jpeg' },
    })
}

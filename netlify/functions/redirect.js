exports.handler = async (event, context) => {
    // Link TikTok ngắn ban đầu
    const shortUrl = "https://vt.tiktok.com/ZS9rX1jo9U2y6-3hK3c/";

    try {
        // Server gửi request chìm để lấy URL đã giải mã (đã chuyển hướng)
        const response = await fetch(shortUrl, {
            method: 'GET',
            redirect: 'follow', // Tự động đi theo các phản hồi chuyển hướng từ TikTok
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
            }
        });

        // Link đích dài hoàn chỉnh thu được
        const finalUrl = response.url;

        // Trả về lệnh chuyển hướng 302 dẫn khách tới link dài đó
        return {
            statusCode: 302,
            headers: {
                Location: finalUrl,
                'Cache-Control': 'no-cache'
            }
        };
    } catch (error) {
        // Trường hợp lỗi, chuyển tạm về link ngắn
        return {
            statusCode: 302,
            headers: {
                Location: shortUrl
            }
        };
    }
};
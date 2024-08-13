var data = {
    modules: {
        pictures: {
            tabs: [
                {
                    name: '七年级',
                    groups: [
                        {
                            title: 'Test', // 标题
                            pictures: [ // 图片列表
                                {
                                    title: 'Test Picture', // 标题
                                    filename: 'test_picture_1.png', // 对于img文件夹的路径或HTTP(S)网址
                                    description: 'This is a test picture.' // 介绍
                                },
                                {
                                    title: 'Test 2 - Minecraft Wallpaper',
                                    filename: 'https://wallpapercave.com/wp/QVjcxmp.jpg',
                                    description: '用HTTP/HTTPS来使用外部图片。'
                                }
                            ]
                        }
                    ]
                },{
                    name: '八年级',
                    groups: [
                        {
                            title: 'Test',
                            pictures: [
                                {
                                    title: 'Never Gonna Give You Up',
                                    filename: 'https://ts2.cn.mm.bing.net/th?id=OVP.w4xqu1iFQ4EStIfKIq3MNQIIGT',
                                    description: 'Never Gonna Give You Up\noOoOoOoOo'
                                },
                                {
                                    title: 'Never Gonna Let You Down',
                                    filename: 'https://ts2.cn.mm.bing.net/th?id=OVP.w4xqu1iFQ4EStIfKIq3MNQIIGT',
                                    description: 'Never Gonna Let You Down\noOoOoOoOo'
                                },
                                {
                                    title: 'Never Gonna Run Around',
                                    filename: 'https://ts2.cn.mm.bing.net/th?id=OVP.w4xqu1iFQ4EStIfKIq3MNQIIGT',
                                    description: 'Never Gonna Run Around\noOoOoOoOo'
                                },
                                {
                                    title: 'And desert you',
                                    filename: 'https://ts2.cn.mm.bing.net/th?id=OVP.w4xqu1iFQ4EStIfKIq3MNQIIGT',
                                    description: 'And desert you\noOoOoOoOo'
                                }
                            ]
                        },
                        {
                            title: 'Test 2',
                            pictures: [
                                {
                                    title: 'test pic',
                                    filename: 'https://cn.bing.com/th?id=OHR.MichiganLighthouse_ZH-CN0581377136_UHD.jpg',
                                    description: 'test'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '九年级',
                    groups: []
                }
            ]
        },
        summary: {
            title: '班级简介',
            content: 
`测试文本测试文本

We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching but you're too shy to say it
Inside we both know what's been going on
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you`
        }
    },
    appearance: {
        background: {
            image: './img/background.png',
            blur: '2px'
        }
    }
};
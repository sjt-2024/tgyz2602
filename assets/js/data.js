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
                        },
                        {
                            title:'安全着陆',
                            pictures: [
                                {
                                    title: '安全着陆',
                                    filename:'https://img1.kuwo.cn/star/albumcover/300/12/24/1275053320.jpg',
                                    description: '二人赚'
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
`你应该知道,我们这么独特只会出现在2班,
 要想明白你是否适合热闹的2班.
 我们知道学习之路少不了困难,
 但你放心我们会努力攻克下难关!
 书山是我们常去的俱乐部,
 只要拿起笔就从不知疲倦度.
 每天学习少不了艰苦,
 我们从不会对吃苦说不!`
        }
    },
    appearance: {
        background: {
            image: './img/background.png',
            blur: '2px'
        }
    }
};
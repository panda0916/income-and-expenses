//變數接收express
const express = require('express')
//命名成自己要的例如app
const app = express()
//處利文件路徑
const path = require('path')
//讓伺服器不是只有get post 也能用put delete
const methodOverride = require('method-override')
//接受隨機id
const { v4: uuid } = require('uuid')
// 靜態網頁...static 使用
app.use(express.static(path.join(__dirname, 'static')))
// 可用req.body訪問數據
app.use(express.urlencoded({ extended: true }))
// _method 的字段，该字段的值将被用作覆盖的 HTTP 方法。 例如action="/?_method=PATCH"
app.use(methodOverride('_method'))
// 告訴資料在 views path.join(__dirname, 'views')絕對路徑
app.set('views', path.join(__dirname, 'views'))
// 告訴他是ejs
app.set('view engine', 'ejs')
let project = [
    {
        id: uuid(),
        matter: '買牛奶',
        yuan: 50,
        justburden: '支出'
    },
    {
        id: uuid(),
        matter: '買牛奶2',
        yuan: 50,
        justburden: '支出'
    },
    {
        id: uuid(),
        matter: '領薪水',
        yuan: 30000,
        justburden: '收入'
    },
]



// get 在 abc資料夾裡/index的文件 {回傳自己project}
app.get('/', (req, res) => {
    res.render('abc/index', { project });
})

app.post('/', (req, res) => {
    const { id, matter, yuan, justburden, action, yn } = req.body;
    if (action === 'add') {
        if (yn === 'just') {
            project.push({ id: uuid(), matter, yuan, justburden: '收入' });
        }
        else if (yn === 'burden') {
            project.push({ id: uuid(), matter, yuan, justburden: '支出' });
        }
    } else if (action === 'switch') {
        const justburdens = project.find(c => c.id === id);
        if (justburdens.justburden === '收入') {
            justburdens.justburden = '支出';
        } else if (justburdens.justburden === '支出') {
            justburdens.justburden = '收入';
        }
    }
    res.redirect('/');
})

app.patch('/', (req, res) => {
    const { matterId, newMatterText } = req.body;
    const foundComment = project.find(c => c.id === matterId);
    if (foundComment) {
        foundComment.matter = newMatterText;
    }
    res.redirect('/');
});

app.patch('/yuan', (req, res) => {
    const { yuanId, newYuan } = req.body;
    const foundYuan = project.find(c => c.id === yuanId);
    if (foundYuan) {
        foundYuan.yuan = parseInt(newYuan);
    }
    res.redirect('/');
});

app.delete('/', (req, res) => {
    const { id } = req.body
    project = project.filter(c => c.id !== id)
    res.redirect('/')
})
















// app.listen(3100) 讓伺服器接收3100
app.listen(3200, () => {
    console.log('ON PORT 3200!')
})
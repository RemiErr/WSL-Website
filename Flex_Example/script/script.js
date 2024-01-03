/* Fetch API 讀取檔案內容 */
// https://medium.com/unitsexhibition/關於ajax與那些前端的request方法-720a7c9cd220
// https://stackoverflow.com/questions/36631762/returning-html-with-fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

let urlf;

// 取得檔案的 DOM 節點
const DOC_DOM = (u='') => fetch(u||urlf)
.catch((err) => {
    // 回報錯誤訊息
    console.log('Failed to fetch page: ', err);
}).then(e => e.text()).then(e => {
    // 初始化 DOM 解析器
    let parser = new DOMParser();
    // 解析傳遞到的文檔內容
    let doc = parser.parseFromString(e, "text/html");
    return doc;
});

// 取得檔案的純文字資料
// const DOC_TEXT = (u='') => fetch(u||urlf).then(e => e.text());

/* Get Scrollbar position */
// https://www.jiyik.com/tm/xwzj/web_3130.html

// function getPos() {
//         console.log('y: ' + $('inner_text').scrollTop);
// };

// 設定卷軸位置
function setPos(part){
    if (part !== 0){
        // 捲動到特定 id 位置
        $(part).scrollIntoView();
    }else{
        // 捲軸位置歸零
        $('inner_text').scrollTop = 0;
    }
};


// 設定路徑
function url(path){
    urlf = path;

    // 延遲讀取資料，先將網頁至頂
    setPos(0)
    setTimeout(()=>{
        setTitle();
        setContent();
        setMenuPart();
    }, 350);
}

// 更改頂部標題
function setTitle(){
    DOC_DOM()
    .then(doc => {
        $('inner_head').innerHTML = doc.getElementById('title').innerText;
    });
}

// 插入文章內容
function setContent(){
    DOC_DOM()
    .then(doc => {
        // 更新副標題 id，後續 jump 用
        let n = 0;
        doc.querySelectorAll('#part').forEach(it => {
            it.id = 'part' + (n++);
        });

        $('inner_text').innerHTML = doc.getElementById('body').innerHTML;
        // Google 語法著色器
        PR.prettyPrint();
    });
}

// 更新選單 "段落" 部分
function setMenuPart(){
    DOC_DOM()
    .then(doc => {
        let n = 0;
        $('inner_part').innerHTML = '';
        doc.querySelectorAll('[id^="part"]').forEach(it => {
            let p = "'part" + (n++) + "'";
            $('inner_part').innerHTML += '<div class="item" onclick=setPos(' + p + ')>' + it.innerHTML + '</div>';
        });
    });
}

// 更新程式碼輸出訊息
function chack(uva){
    let input = $(uva+'_input');
    let output = $(uva+'_output');

    if (input.value == null || input.value == ""){
        output.innerText = '📢 請輸入測資喔！';
    }
}


// http://api.prototypejs.org/ajax/Ajax/Request/
/*
function getFile(url){
    return new Ajax.Request(url, {
        method: 'get',
        onSuccess: () => {}
    });
};
*/
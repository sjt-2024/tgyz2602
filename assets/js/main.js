'use strict';

var Snackbar = window.customElements.get('s-snackbar');
var Dialog = window.customElements.get('s-dialog');

/**
 * 生成从minNum到maxNum的随机数
 * @param {number} maxNum 最大数
 * @param {number} minNum 最小数
 * @author lingbopro
 */
function randint(maxNum, minNum){
    if (typeof minNum === 'number') {
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    }
    else if (typeof maxNum === 'number') {
        return parseInt(Math.random()*minNum+1,10);
    }
    else {
        throw new TypeError('minNum and maxNum must be numbers.');
    }
}

var currentSemester = 0;

document.addEventListener('DOMContentLoaded', function () {
    if (!(Snackbar && Dialog)) {
        fullscreenLoadingTip.open('组件库未成功加载。请检查网络连接，然后重试');
        return;
    }
    let mainTabEl = document.getElementById('main-tab');
    let dom = ''
    data.semesters.forEach(function (current, index) {
        dom += `
<s-tab-item selected="${index == 0 ? 'true' : 'false'}">
    <div slot="text">${current.name}</div>
</s-tab-item>`
    });
    mainTabEl.innerHTML = dom;
    mainTabEl.children[0].selected = true;
    mainTabChanged();
    // window.setInterval(function (){
    //     coolButtons(document.querySelector('#tab-content>.buttons'));
    // }, 1000);
    fullscreenLoadingTip.close();
});

function viewPicture(id) {
    let dialogEl = document.getElementById('picture-view-dialog');
    let pictureInfo = data.semesters[currentSemester].pictures[id];
    if (pictureInfo) {
        document.getElementById('picture-view-title').innerText = pictureInfo.title;
        document.getElementById('picture-view-image').src = './img/' + pictureInfo.filename;
        document.getElementById('picture-view-image').alt = pictureInfo.title;
        document.getElementById('picture-view-description').innerText = pictureInfo.description;
    }
    dialogEl.show();
}

function mainTabChanged() {
    let tabIndex = document.getElementById('main-tab').selectedIndex;
    let tabContentEl = document.getElementById('tab-content');
    currentSemester = tabIndex >= 0 ? tabIndex : 0;
    let dom = '';
    data.semesters[currentSemester].pictures.forEach(function (current, index) {
        dom += `
<s-ripple onclick="viewPicture(${index})"">
    <div class="headline">${current.title}</div>
    <div class="description">${current.description}</div>
</s-ripple>`
    });
    tabContentEl.innerHTML = `
<div class="buttons">${dom}</div>`;
    coolButtons(document.querySelector('#tab-content>.buttons'));
}

var fullscreenLoadingTip = {
    open: function (text = undefined) {
        if (text) {
            this.setInnerText(text);
        }
        document.getElementById('fullscreen-loading-tip').classList.remove('done');
    },
    close: function () {
        document.getElementById('fullscreen-loading-tip').classList.add('done');
    },
    setInnerText: function (text) {
        if (typeof text === 'string') {
            document.getElementById('fullscreen-loading-tip').innerText = text;
        }
    },
    setInnerHTML: function (html) {
        if (typeof html === 'string') {
            document.getElementById('fullscreen-loading-tip').innerHTML = html;
        }
    }
}

function coolButtons(buttonsEl) {
    let children = buttonsEl.children;
    let styles = [
        `background: var(--s-color-surface-container-low, #f6f2f7);
        color: var(--s-color-primary, #5256a9);
        box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));`,
        `background: var(--s-color-secondary-container, #e2e0f9);
        color: var(--s-color-on-secondary-container, #191a2c);`,
        `outline: solid 1px var(--s-color-outline, #777680);
        background: none;
        color: var(--s-color-primary, #5256a9);`,
        `background: none;
        color: var(--s-color-primary, #5256a9);
        padding: 0px 16px;`
    ];
    for (let i = 0; i < children.length; i++) {
        let style = styles[randint(0, styles.length - 1)];
        children[i].setAttribute('style', style);
    }
}
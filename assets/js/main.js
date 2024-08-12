'use strict';

var Snackbar = window.customElements.get('s-snackbar');
var Dialog = window.customElements.get('s-dialog');

/**
 * 生成从minNum到maxNum的随机数
 * @param {number} maxNum 最大数
 * @param {number} minNum 最小数
 * @author lingbopro
 */
function randint(maxNum, minNum) {
    if (typeof minNum === 'number') {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    } else if (typeof maxNum === 'number') {
        return parseInt(Math.random() * minNum + 1, 10);
    } else {
        throw new TypeError('minNum and maxNum must be numbers.');
    }
}

var pageEl = document.querySelector('s-page');

var currentSemester = 0;
var currentPicture = -1;

document.addEventListener('DOMContentLoaded', function () {
    if (!(Snackbar && Dialog)) {
        fullscreenLoadingTip.open('组件库未成功加载。请检查网络连接，然后重试');
        return;
    }
    let navEl = document.getElementById('nav');
    for (let element of navEl.children) {
        if (element.tagName.toLowerCase() == 's-ripple') {
            element.addEventListener('click', function () {
                let pageName = element.dataset.page;
                gotoPage(pageName);
            });
        }
    }
    navEl.children[0].click();
    fullscreenLoadingTip.close();
});

function gotoPage(name) {
    let pagesContainerEl = document.getElementById('pages-container');
    for (let element of pagesContainerEl.children) {
        element.classList.remove('active');
    }
    let navEl = document.getElementById('nav');
    for (let element of navEl.children) {
        if (element.tagName.toLowerCase() == 's-ripple') {
            if (element.dataset.page == name) {
                element.classList.add('checked');
            }
            else {
                element.classList.remove('checked');
            }
        }
    }
    document.getElementById('page-' + name).classList.add('active');
    // 单独处理某些页面
    switch (name) {
        case 'home':
            document.getElementById('card-info-title').innerText = data.sidebar.title;
            document.getElementById('card-info-content').innerText = data.sidebar.content;
            break;
        case 'pictures':
            let mainTabEl = document.getElementById('main-tab');
            let dom = '';
            data.semesters.forEach(function (current, index) {
                dom += `
<s-tab-item>
    <div slot="text">${current.name}</div>
</s-tab-item>`;
            });
            mainTabEl.innerHTML = dom;
            // 也不知道为啥样式有问题，因此手动模拟切换
            if (mainTabEl.children.length >= 1) {
                mainTabEl.children[1].click();
                window.setTimeout(function () {
                    mainTabEl.children[0].click();
                }, 100);
            }
            mainTabChanged();
            // window.setInterval(function (){
            //     coolButtons(document.querySelector('#tab-content>.buttons'));
            // }, 1000);
            break;
        default:
            break;
    }
}

function viewPicture(id) {
    let dialogEl = document.getElementById('picture-view-dialog');
    let pictureInfo = data.semesters[currentSemester].pictures[id];
    if (pictureInfo) {
        document.getElementById('picture-view-title').innerText = pictureInfo.title;
        document.getElementById('picture-view-image').src = './img/' + pictureInfo.filename;
        document.getElementById('picture-view-image').alt = pictureInfo.title;
        document.getElementById('picture-view-description').innerText = pictureInfo.description;
        currentPicture = id;
    }
    dialogEl.show();
}

function downloadPicture() {
    let picture = data.semesters[currentSemester].pictures[currentPicture];
    let src = document.getElementById('picture-view-image').src;
    let linkEl = document.getElementById('download-link');
    linkEl.href = src;
    linkEl.download = `${picture.title}`;
    linkEl.click();
}

function pictureViewDialogClosed() {
    currentPicture = -1;
}

function mainTabChanged() {
    let tabIndex = document.getElementById('main-tab').selectedIndex;
    let tabContentEl = document.getElementById('tab-content');
    let buttonsEl = document.getElementById('content-buttons');
    currentSemester = tabIndex >= 0 ? tabIndex : 0;
    let dom = '';
    if (data.semesters[currentSemester].pictures.length > 0) {
        data.semesters[currentSemester].pictures.forEach(function (current, index) {
            dom += `
<s-ripple onclick="viewPicture(${index})"">
    <div class="headline">${current.title}</div>
    <div class="description">${current.description}</div>
</s-ripple>`;
        });
        buttonsEl.innerHTML = dom;
        tabContentEl.classList.remove('empty');
        coolButtons(document.getElementById('content-buttons'));
    } else {
        buttonsEl.innerHTML = '';
        tabContentEl.classList.add('empty');
    }
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
    },
};

function themePickerChanged() {
    let themePickerEl = document.getElementById('theme-picker');
    switch (themePickerEl.selectedIndex) {
        case 0:
            pageEl.theme = 'auto';
            break;
        case 1:
            pageEl.theme = 'light';
            break;
        case 2:
            pageEl.theme = 'dark';
            break;
        default:
            break;
    }
}

function toggleSidebar() {
    document.getElementById('sidebar-drawer').toggle('start')
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
        padding: 0px 16px;`,
    ];
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName.toLowerCase() == 's-ripple') {
            let style = styles[randint(0, styles.length - 1)];
            children[i].setAttribute('style', style);
        }
    }
}

function showDeveloperList() {
    gotoPage('developers');
}

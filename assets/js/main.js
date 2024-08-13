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

/**
 * 获取URL参数
 * @param {string} key
 */
function getUrlParam(key) {
    let usp = new URLSearchParams(window.location.search);
    return usp.get(key);
}
/**
 * 设置URL参数
 * @param {string} key
 * @param {string} value
 */
function setUrlParam(key, value) {
    let usp = new URLSearchParams(window.location.search);
    usp.set(key, value);
    history.pushState('', '', '?' + usp.toString());
}
/**
 * 删除URL参数
 * @param {string} key
 */
function deleteUrlParam(key) {
    let usp = new URLSearchParams(window.location.search);
    usp.delete(key);
    history.pushState('', '', '?' + usp.toString());
}

var pageEl = document.querySelector('s-page');

var currentTab = 0;
var currentPictureGroup = -1;
var currentPicture = -1;

document.addEventListener('DOMContentLoaded', function () {
    if (!(Snackbar && Dialog)) {
        fullscreenLoadingTip.open('组件库未成功加载。请检查网络连接，然后重试');
        return;
    }
    gotoPage(getUrlParam('page'));
    setTheme(getUrlParam('theme'));
    pageEl.style.setProperty('background-image', data.appearance.background.image == 'none' ? 'none' : `url('${data.appearance.background.image}')`);
    pageEl.style.setProperty('--background-blur', data.appearance.background.blur);
    let navEl = document.getElementById('nav');
    for (let element of navEl.children) {
        if (element.tagName.toLowerCase() == 's-ripple') {
            element.addEventListener('click', function () {
                let pageName = element.dataset.page;
                gotoPage(pageName);
            });
        }
    }
});

function gotoPage(name) {
    let pagesContainerEl = document.getElementById('pages-container');
    let pageEl = document.getElementById('page-' + name);
    if (!pageEl) {
        gotoPage('home');
        return;
    }
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
    pageEl.classList.add('active');
    setUrlParam('page', name);
    // 单独处理某些页面
    switch (name) {
        case 'home':
            document.getElementById('card-info-title').innerText = data.modules.summary.title;
            document.getElementById('card-info-content').innerText = data.modules.summary.content;
            break;
        case 'pictures':
            let mainTabEl = document.getElementById('main-tab');
            let dom = '';
            data.modules.pictures.tabs.forEach(function (current, index) {
                dom += `
<s-tab-item id="tab-${index}">
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

function viewPicture(groupId, pictureId) {
    let dialogEl = document.getElementById('picture-view-dialog');
    let pictureInfo = data.modules.pictures.tabs[currentTab].groups[groupId].pictures[pictureId];
    if (pictureInfo) {
        let src =
            pictureInfo.filename.startsWith('http://') || pictureInfo.filename.startsWith('https://')
                ? pictureInfo.filename
                : './img/' + pictureInfo.filename;
        document.getElementById('picture-view-title').innerText = pictureInfo.title;
        document.getElementById('picture-view-image').src = src;
        document.getElementById('picture-view-image').alt = pictureInfo.title;
        document.getElementById('picture-view-description').innerText = pictureInfo.description;
        currentPictureGroup = groupId;
        currentPicture = pictureId;
    }
    dialogEl.show();
}

function downloadPicture() {
    let picture = data.modules.pictures.tabs[currentTab].groups[currentPictureGroup].pictures[currentPicture];
    let src = document.getElementById('picture-view-image').src;
    let linkEl = document.getElementById('download-link');
    linkEl.href = src;
    linkEl.download = `${picture.title}`;
    linkEl.click();
}

function pictureViewDialogClosed() {
    currentPicture = -1;
    currentPictureGroup = -1;
}

function mainTabChanged() {
    let tabIndex = document.getElementById('main-tab').selectedIndex;
    let tabContentEl = document.getElementById('tab-content');
    let picturesEl = document.getElementById('pictures');
    currentTab = tabIndex >= 0 ? tabIndex : 0;
    currentPictureGroup = -1;
    let groupsDom = '';
    if (data.modules.pictures.tabs[currentTab].groups.length > 0) {
        data.modules.pictures.tabs[currentTab].groups.forEach(function (currentGroup, groupIndex) {
            let innerDom = '';
            currentGroup.pictures.forEach(function (currentPicture, pictureIndex) {
                innerDom += `
<s-ripple class="picture" id="picture-${groupIndex}-${pictureIndex}" onclick="viewPicture(${groupIndex},${pictureIndex})"">
    <div class="headline">${currentPicture.title}</div>
    <div class="description">${currentPicture.description}</div>
</s-ripple>`;
            });
            groupsDom += `
<s-card class="picture-group" id="group-${groupIndex}" type="outlined">
    <s-ripple class="picture-group-title" onclick="toggleGroupFold(${groupIndex})">
        <div class="headline">${currentGroup.title}</div>
        <s-icon class="icon" type="chevron_down"></s-icon>
    </s-ripple>
    <div class="sub-pictures-container">
        <div class="sub-pictures">${innerDom}</div>
    </div>
</s-card>`;
        });
        picturesEl.innerHTML = groupsDom;
        tabContentEl.classList.remove('empty');
        coolButtons(document.getElementById('pictures'));
    } else {
        picturesEl.innerHTML = '';
        tabContentEl.classList.add('empty');
    }
}

function toggleGroupFold(groupId) {
    let groupEl = document.getElementById('group-' + groupId);
    groupEl.classList.toggle('open');
    if (groupEl.classList.contains('open')) {
        groupEl.querySelector('.icon').type = 'chevron_up';
    }
    else {
        groupEl.querySelector('.icon').type = 'chevron_down';
    }
}

function themePickerChanged() {
    let themePickerEl = document.getElementById('theme-picker');
    switch (themePickerEl.selectedIndex) {
        case 0:
            setTheme('auto')
            break;
        case 1:
            setTheme('light');
            break;
        case 2:
            setTheme('dark');
            break;
        default:
            break;
    }
}

function setTheme(theme) {
    let themes = ['auto', 'light', 'dark'];
    if (themes.includes(theme)) {
        pageEl.theme = theme;
        setUrlParam('theme', theme);
        let themePickerEl = document.getElementById('theme-picker');
        let i = 0;
        for (let child of themePickerEl.children) {
            if (child.tagName.toLowerCase() == 's-picker-item') {
                if (i == themes.indexOf(theme)) {
                    child.selected = true;
                }
                else {
                    child.selected = false;
                }
                i++;
            }
        }
        // themePickerEl.children[themes.indexOf(theme)].selected = true;
    }
    else {
        setTheme('auto');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar-drawer').toggle('start')
}

function coolButtons(buttonsEl) {
    let children = buttonsEl.querySelector('.picture');
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
    // Sober没提供方法，只能自己来了
    document.getElementById('info-sheet').shadowRoot.querySelector('.wrapper').classList.remove('show');
}

let input;
let button;
let audioButton;
let slider;
let jumpButton;
let dropdown;
let iframe;
let jump = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10); // 將輸入框置於視窗左上角
  input.size(200, 40); // 調整輸入框大小
  input.value('淡江大學教育科技學系'); // 預設文字
  input.style('font-size', '24px'); // 調整字體大小
  textFont('Noto Color Emoji'); // 設置字體為支援 Emoji 的字體
  
  // 添加按鈕來啟動 AudioContext
  audioButton = createButton('啟動音頻');
  audioButton.position(10, 60);
  audioButton.style('font-size', '24px'); // 調整按鈕字體大小
  audioButton.style('padding', '10px 20px'); // 調整按鈕內邊距
  audioButton.mousePressed(startAudio);
  
  // 添加滑桿來調整文字大小
  slider = createSlider(20, 50, 32);
  slider.position(input.x + input.width + 10, 10); // 將滑桿置於輸入框的右側
  
  // 添加按鈕來啟動文字跳動
  jumpButton = createButton('文字跳動');
  jumpButton.position(slider.x + slider.width + 10, 10); // 將按鈕置於滑桿的右側
  jumpButton.style('font-size', '24px'); // 調整按鈕字體大小
  jumpButton.style('padding', '10px 20px'); // 調整按鈕內邊距
  jumpButton.mousePressed(toggleJump);
  
  // 添加下拉選單
  dropdown = createSelect();
  dropdown.position(jumpButton.x + jumpButton.width + 100, 10); // 將下拉選單置於按鈕的右側，並向右移動 50 像素
  dropdown.option('淡江大學首頁'); // 添加選項
  dropdown.option('淡江大學教育科技學系首頁');
  dropdown.option('HackMD 筆記');
  dropdown.style('font-size', '24px'); // 調整下拉選單字體大小
  dropdown.style('padding', '10px 20px'); // 調整下拉選單內邊距
  dropdown.changed(handleDropdownChange);
  
  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(10, 100); // 將 iframe 置於下方
  iframe.size(windowWidth - 20, windowHeight - 120); // 調整 iframe 大小
}

function startAudio() {
  getAudioContext().resume().then(() => {
    console.log('AudioContext 已啟動');
  });
}

function toggleJump() {
  jump = !jump;
  if (jump) {
    let txt = input.value();
    offsets = Array.from({ length: txt.length }, () => random(0, 1000));
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '淡江大學首頁') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '淡江大學教育科技學系首頁') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === 'HackMD 筆記') {
    iframe.attribute('src', 'https://hackmd.io/@VaSL8OyHRUmypCfrbOyhVA/HkhPZYGj1l');
  }
}

function draw() {
  background(173, 216, 230); // 設置背景顏色為淺藍色
  let txt = input.value();
  let baseTextSize = slider.value(); // 根據滑桿的值設置基礎文字大小
  textAlign(LEFT, CENTER); // 將文字對齊方式設置為左對齊
  fill(255, 0, 0); // 設置文字顏色為紅色
  
  // 在每個字之間添加空格
  let spacedTxt = txt.split('').join(' ');
  
  // 計算可以在一行中顯示的文字數量
  let txtWidth = textWidth(spacedTxt + ' ');
  let repeatCount = txtWidth > 0 ? Math.ceil(width / txtWidth) : 1; // 計算填滿整個視窗所需的重複次數
  let displayText = (spacedTxt + ' ').repeat(repeatCount);
  
  // 顯示文字
  let lineHeight = textAscent() + textDescent() + 10; // 每行的高度，包含間隔
  for (let y = 0; y <= height; y += lineHeight) { // 從 y 座標 0 開始顯示
    for (let i = 0; i < displayText.length; i++) {
      let char = displayText[i];
      let offsetY = 0;
      let textSizeValue = baseTextSize;
      if (jump && char !== ' ') {
        offsetY = sin((frameCount + offsets[i % offsets.length]) * 0.1) * 10;
        textSizeValue = baseTextSize + sin((frameCount + offsets[i % offsets.length]) * 0.1) * 10;
      }
      textSize(textSizeValue);
      text(char, 10 + textWidth(displayText.substring(0, i)), y + offsetY); // 將文字從左側開始顯示
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(10, 10); // 調整輸入框位置到左上角
  slider.position(input.x + input.width + 10, 10); // 調整滑桿位置
  jumpButton.position(slider.x + slider.width + 10, 10); // 調整按鈕位置
  dropdown.position(jumpButton.x + jumpButton.width + 50, 10); // 調整下拉選單位置，並向右移動 50 像素
  iframe.size(windowWidth - 20, windowHeight - 120); // 調整 iframe 大小
}

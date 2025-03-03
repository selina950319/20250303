let input;
let button;
let audioButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10); // 將輸入框置於視窗左上角
  input.size(200, 40); // 調整輸入框大小
  input.value('✨❤️⚽'); // 預設文字
  input.style('font-size', '24px'); // 調整字體大小
  textFont('Noto Color Emoji'); // 設置字體為支援 Emoji 的字體
  
  // 添加按鈕來啟動 AudioContext
  audioButton = createButton('啟動音頻');
  audioButton.position(10, 60);
  audioButton.mousePressed(startAudio);
}

function startAudio() {
  getAudioContext().resume().then(() => {
    console.log('AudioContext 已啟動');
  });
}

function draw() {
  background(173, 216, 230); // 設置背景顏色為淺藍色
  let txt = input.value();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255, 0, 0); // 設置文字顏色為紅色
  
  // 在每個字之間添加空格
  let spacedTxt = txt.split('').join(' ');
  
  // 計算可以在一行中顯示的文字數量
  let txtWidth = textWidth(spacedTxt + ' ');
  let repeatCount = txtWidth > 0 ? Math.ceil(width / txtWidth) : 1;
  let displayText = (spacedTxt + ' ').repeat(repeatCount);
  
  // 顯示文字
  let lineHeight = textAscent() + textDescent() + 10; // 每行的高度，包含間隔
  for (let y = 100; y <= height; y += lineHeight) { // 從 y 座標 100 開始顯示
    text(displayText, width / 2, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(10, 10); // 調整輸入框位置到左上角
}

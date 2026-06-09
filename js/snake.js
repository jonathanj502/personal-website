(function () {
  'use strict';

  var canvas = document.getElementById('snakeCanvas');
  var scoreEl = document.getElementById('snakeScore');
  var msgEl = document.getElementById('snakeMsg');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var CELL = 12;
  var COLS = Math.floor(canvas.width / CELL);
  var ROWS = Math.floor(canvas.height / CELL);
  var FPS = 10;

  var snake, dir, next, food, score, state, raf, last;

  function css(prop) {
    return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  }

  function rand(max) { return Math.floor(Math.random() * max); }

  function spawnFood() {
    var pos;
    do {
      pos = { x: rand(COLS), y: rand(ROWS) };
    } while (snake.some(function (s) { return s.x === pos.x && s.y === pos.y; }));
    return pos;
  }

  function init() {
    var mx = Math.floor(COLS / 2), my = Math.floor(ROWS / 2);
    snake = [{ x: mx, y: my }, { x: mx - 1, y: my }, { x: mx - 2, y: my }];
    dir = { x: 1, y: 0 };
    next = { x: 1, y: 0 };
    score = 0;
    food = spawnFood();
    state = 'idle';
    scoreEl.textContent = '0';
    msgEl.textContent = 'press any key or tap to start';
    draw();
  }

  function step(ts) {
    if (state !== 'running') return;
    raf = requestAnimationFrame(step);
    if (ts - last < 1000 / FPS) return;
    last = ts;

    dir = next;
    var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
        snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
      state = 'dead';
      msgEl.textContent = 'game over — press any key or tap to restart';
      draw();
      return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      food = spawnFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function draw() {
    var bg     = css('--bg');
    var border = css('--border');
    var text   = css('--text');
    var muted  = css('--muted');
    var imgBg  = css('--img-bg');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* grid dots */
    ctx.fillStyle = imgBg;
    for (var gx = 0; gx < COLS; gx++) {
      for (var gy = 0; gy < ROWS; gy++) {
        ctx.fillRect(gx * CELL + CELL / 2 - 1, gy * CELL + CELL / 2 - 1, 1.5, 1.5);
      }
    }

    /* food */
    ctx.fillStyle = muted;
    ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

    /* snake */
    snake.forEach(function (s, i) {
      ctx.fillStyle = i === 0 ? text : muted;
      var pad = i === 0 ? 1 : 2;
      ctx.fillRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
    });
  }

  function start() {
    if (state === 'dead') { init(); }
    state = 'running';
    msgEl.textContent = '';
    last = performance.now();
    raf = requestAnimationFrame(step);
  }

  var DIRS = {
    ArrowUp:    { x: 0, y: -1 }, w: { x: 0, y: -1 },
    ArrowDown:  { x: 0, y: 1 },  s: { x: 0, y: 1 },
    ArrowLeft:  { x: -1, y: 0 }, a: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },  d: { x: 1, y: 0 },
  };

  document.addEventListener('keydown', function (e) {
    var d = DIRS[e.key];
    if (d) {
      e.preventDefault();
      if (d.x !== -dir.x || d.y !== -dir.y) next = d;
      if (state === 'idle' || state === 'dead') start();
    } else if (e.key === ' ') {
      e.preventDefault();
      if (state === 'idle' || state === 'dead') start();
    }
  });

  /* touch controls */
  var touchStart = null;
  canvas.addEventListener('touchstart', function (e) {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (state === 'idle' || state === 'dead') start();
  }, { passive: true });

  canvas.addEventListener('touchend', function (e) {
    if (!touchStart) return;
    var dx = e.changedTouches[0].clientX - touchStart.x;
    var dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    var d;
    if (Math.abs(dx) > Math.abs(dy)) {
      d = dx > 0 ? DIRS.ArrowRight : DIRS.ArrowLeft;
    } else {
      d = dy > 0 ? DIRS.ArrowDown : DIRS.ArrowUp;
    }
    if (d.x !== -dir.x || d.y !== -dir.y) next = d;
  }, { passive: true });

  /* redraw on theme change */
  var observer = new MutationObserver(function () { if (state !== 'running') draw(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  init();
})();

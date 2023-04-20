(() => {
  // 创建会在值变更时自动执行回调的引用对象
  const createRef = (
    initialValue = undefined,
    onchangeCallback = undefined
  ) => {
    const ref = {
      current: initialValue,
      onchange: onchangeCallback,
    };

    return {
      get current() {
        return ref.current;
      },
      set current(value) {
        ref.current = value;
        typeof ref.onchange === "function" && ref.onchange(ref.current);
      },
      get onchange() {
        return ref.onchange;
      },
      set onchange(callback) {
        ref.onchange = callback;
        callback(ref.current);
      },
    };
  };

  // 更新间隔
  const UPDATE_INTERVAL = 20; /* 毫秒 */

  // 容器占位符
  const CONTAINER_PLACEHOLDER = "今天吃什么";

  // 食物列表
  const FOODS = [
    "湘菜大碗饭",
    "木桶饭",
    "摇滚炒鸡",
    "元气煲饭",
    "新疆干脆面",
    "朝鲜冷面",
    "二餐石锅",
    "山西油泼面",
    "重庆小面",
    "麦多馅饼",
    "胡辣汤",
    "肉夹馍",
    "炸鸡排",
    "爱尚麻辣烫",
    "自选餐",
    "鸡公煲",
  ];

  // 背景文字随机颜色列表
  const BG_TEXT_COLORS = [
    "#99CCFF",
    "#CCFF99",
    "#FFFFCC",
    "#FF99CC",
    "#009933",
    "#FFCC00",
  ];

  // 获取列表随机项
  const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

  // 随机食物
  const foodRef = createRef(CONTAINER_PLACEHOLDER);
  const doShuffleFood = () => {
    foodRef.current = getRandomItem(FOODS);
  };

  // 开始/停止随机食物定时器
  const timerRef = createRef();
  const toggleShuffleFood = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    } else {
      timerRef.current = setInterval(doShuffleFood, UPDATE_INTERVAL);
    }
  };

  // 绑定随机按钮动作
  const shuffleButtonEl = document.querySelector("#shuffle-button");
  shuffleButtonEl.onclick = toggleShuffleFood;

  // 绑定计时器变更回调
  timerRef.onchange = (handle) => {
    shuffleButtonEl.textContent = handle === undefined ? "吃什么" : "选中!";
  };

  // 绑定食物变更回调
  const containerEl = document.querySelector("#container");
  foodRef.onchange = (food) => {
    containerEl.textContent = food;
  };

  // 生成随机背景文字
  const BACKGROUND_TEXT_CLASS_NAME = "background-text";
  const spawnBackgroundTextEl = () => {
    // 随机文本参数
    const x = Math.random() * window.innerWidth;
    const fontSize = `${Math.random() * 20 + 15}px`;
    const color = getRandomItem(BG_TEXT_COLORS);
    const food = getRandomItem(FOODS);
    const moveSpeed = Math.random() * 5;

    // 创建 DOM
    const spanEl = document.createElement("span");
    spanEl.className = BACKGROUND_TEXT_CLASS_NAME;
    spanEl.style.left = `${x}px`;
    spanEl.style.position = "fixed"; // TODO: move to style.css
    spanEl.style.fontSize = fontSize;
    spanEl.style.color = color;

    // 初始化 DOM 控制对象
    const control = {
      y: Math.random() * (window.innerHeight - spanEl.clientHeight),
      lifespan: Math.random() * 100,
      timer: undefined,
    };

    // 更新元素
    const updateEl = () => {
      spanEl.style.top = `${control.y}px`;
      spanEl.style.opacity = control.lifespan / 100;
      spanEl.textContent = timerRef.current ? food : foodRef.current;
    };

    // 初始化并添加元素到页面
    updateEl();
    document.body.appendChild(spanEl);

    // 在生命周期内更新动画帧
    const update = () => {
      control.y -= moveSpeed;
      control.lifespan--;

      // 生命周期结束时移除
      if (control.lifespan <= 0) {
        clearInterval(control.timer);
        spanEl.remove();

        return;
      }

      updateEl();
    };
    control.timer = setInterval(update, UPDATE_INTERVAL);
  };

  // 更新背景文字
  const backgroundTextSelector = `.${BACKGROUND_TEXT_CLASS_NAME}`;
  const updateBackgroundText = () => {
    const count = document.querySelectorAll(backgroundTextSelector).length;
    for (let i = count; i < 50; i++) {
      spawnBackgroundTextEl();
    }
  };
  setInterval(updateBackgroundText, UPDATE_INTERVAL);
})();

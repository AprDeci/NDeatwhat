var stop = true
var box = document.querySelector('.box')
var contain = document.querySelector('.contain')
var back = document.querySelector('.back')
var foods = "湘菜大碗饭 木桶饭 摇滚炒鸡 元气煲饭 新疆干脆面 朝鲜冷面 二餐石锅 山西油泼面 重庆小面 麦多馅饼 胡辣汤 肉夹馍 炸鸡排 爱尚麻辣烫 自选餐 鸡公煲"
var food = foods.split(' ')
var tests=[]
var colors=['#99CCFF','#CCFF99','#FFFFCC','#FF99CC','#009933','#FFCC00']
var eattimess = 0;
function draw(){ 
    back.innerHTML=''
    if(stop){
        box.innerHTML = '吃什么'
    }else{
        contain.innerHTML= food[parseInt(Math.random()*food.length)]
        box.innerHTML = '选中!'
}

for(var i = 0;i<tests.length;i++){
            test = tests[i]
            var span = document.createElement('span')
            span.style.position = 'absolute'
            span.style.left = test.sx + 'px'
            span.style.top = test.sy + 'px'
            span.style.color = test.color
           // span.style.fontSize = test.size+ 'px'
            span.style.fontSize = test.size+ 'px'
            span.style.opacity = 1 - test.age/100
            test.sy -= test.vx 
            test.age++;
            if(test.age>100){
                tests.splice(i,1)
            }
            if(stop){
                span.innerHTML = contain.innerHTML
            }
            else{
                span.innerHTML = test.str
            }
            back.appendChild(span)
        }
if(tests.length<50){
            tests.push({
                str:food[parseInt(Math.random()*food.length)],
                //sx:Math.random()*window.innerWidth,
                sx:Math.random()*window.screen.availWidth-30,
                //sy:Math.random()*window.innerHeight,
                sy:Math.random()*document.body.offsetHeight,
                color:colors[parseInt(Math.random()*colors.length)],
                size:Math.random()*20+15,               
                age:Math.random()*100,
                vx:Math.random()*5
            })
           }
        }
    
    
setInterval(draw,20)
# 在这里：
https://enzo1994.github.io/indianmifan/prizeWheel/ （记得科学上网）

# 使用：
`npm start`

# 怎么写的：
最近一直在思考转盘如何实现，因为涉及到按指定结果旋转这一问题，今天早上起来起床一瞬间突发奇想，说一下我的思路 ：

首先，用户抽到了什么，这个结果一定是由后台决定（当然要是啥奖品也不打算给，前台写死也行，小心被用户翻JS发现）；

然后，既然说到转盘，**旋转度数**肯定是核心；

所以，中奖结果就是通过旋转度数来体现，这就成了一个映射表：**中奖结果 => 旋转度数：中奖结果对应的度数范围**，（我们先不考虑多旋转多少圈的问题）

![网上找的转盘图片](https://img-blog.csdnimg.cn/20190928173837617.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5OTIzODgx,size_16,color_FFFFFF,t_70)
### 先看看样式
```html
<div className="prize__wrapper">   <!--相对定位-->
    <div className="prize-pointer__container"></div>   <!--绝对定位，放在正中间，z-index最大-->
    <div className="prize-wheel__container" style={wheelStyle}></div>  
</div>
```
这里使用react实现（会JavaScript就能看懂）：

### 第一步、写出映射表：度数范围对应中奖结果：
```javascript
this.state = {
           prizeMap: {
                '0-45': 'no',
                '45-90': 'no',
                '90-135': '2',
                '135-180': 'no',
                '180-225': '1',
                '225-270': 'no',
                '270-315': 'no',
                '315-360': '3'
            },
      }
```
 在开始按钮的点击事件写入以下内容：
### 第二步、从后台拿到用户抽奖结果，比如是no，我们获取所有no可能的数值范围：
```javascript
const possibleRangeArr = Object.entries(this.state.prizeMap).map(([key, value]) => {
            if (value == result) {  // 如果映射表的value和传入的中奖结果一致，
                return key  //则提取出来
            }
 	}).filter(Boolean)  //去掉数组內空值
 	
console.log(possibleRangeArr)  //["0-45", "45-90", "135-180", "225-270", "270-315"]
```
### 第三步、再在这个范围数组内随机拿到更具体的范围（转盘上每个格子内容都不一样的则不需要这个步骤）
```javascript
const randomRangeStr = possibleRangeArr[Math.floor(Math.random() * possibleRangeArr.length)]
console.log(randomRangeStr)// "225-270"
```
### 第四步、拆分范围字符串，得到范围数组：
```javascript
const randomRangeArr = randomRangeStr.split('-')
console.log(randomRangeArr) // ["225","270"] randomRangeArr[1]是最小值，randomRangeArr[2]是最大值
```
### 第五步、通过范围数组随机取到准确旋转角度
```javascript
const randomAngle = Math.floor(Math.random() * (randomRangeArr[1] / 1 - 5 - (randomRangeArr[0] / 1 + 5)) + randomRangeArr[0] / 1)  
console.log(randomAngle) // 243
```
### 第六步、把旋转角度设置给轮盘：
这里的css3transform使用的是rotateZ围绕Z轴旋转，旋转的起始位置是固定不变的，就是说每次旋转角度都是相对于你元素摆放的起始位置，所以每次旋转都需要递增相同圈数，才能保证每次旋转都出现旋转同样圈数的效果，我们需要给次数设置一个递增变量，我们这里模拟旋转5圈到指定位置
```javascript
this.setState({ currentAngle: randomAngle + 360 * 5 * this.state.rotateTimes, rotateTimes: this.state.rotateTimes + 1})
```

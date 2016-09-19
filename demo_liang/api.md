# 商家消费营销接口文档

> Server开发时，相关URL和请求字段、返回字段请根据情况适当调整

## 卡券列表、卡券详情、订单详情

#### 卡券列表页接口
每张卡券增加是否能够多选的字段

#### 卡券详情页接口
> 规则列表中，增加了链接，server配置```<a href="http://baidu.com">链接</a>```这种字符串

返回接口，增加一个type类型，标明该类型优惠券

#### 订单详情
server增加一种订单类型并填充相关数据即可，前端无改动

## 人人开店
#### 开通借贷宝支付
***URL：*** /openJDBPay

***RD最终接口：*** http://jdb-dev.com/merchant/shop/wikis/EveryOneOpenStoreOpenPay  
***RD: 衣志英***    

***参数：***
```javascript
{
	// 公共参数
	memberId: '2131232', // 用户id
	logo: 'http://****.png', // TODO： 待确认 // 商家logo（选填）
	name: '沃尔玛', // 商家名称 （必填）
	addr: '大屯路东' // 商家地址	（必填）
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	"data": null
}
```

#### 修改商家设置信息
***URL：*** /business/setting/modify

***参数：***
```javascript
{
	// 公共参数
	id: '21313123', // 用户id
	logo: 'http://****.jpg', // 商家logo
	name: '沃尔玛' // 商家名称
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	data: null
}
```

#### 获取商家信息
***URL***： /business/setting/get   
***RD最终接口：***  http://jdb-dev.com/merchant/shop/wikis/EveryOneOpenStoreGetPay      
***RD: 衣志英***    

***参数：***
```javascript
{
	// 公共参数
	memberId： '2123123', //用户id
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	data: {
		logo: 'http://*****.jpg', // 商家logo
		logoEditable: true, // 商家可否修改商家logo
		name: '沃尔玛', // 商家名称
		nameEditable: false, // 商家可否修改商家名称
		addr: '仰山公园', // 商家地址
		addrEditable: true, // 商家可否修改地址
		income: 1817.77, // 浮点型，累计收入，单位元，保留两位小数
		inviteCode: 'EFNFED', // 商家邀请码
		settingList: { // 我是商家页，显示的设置列表
			'reduce': {
				show: true, // 是否显示
				text: '配置优惠金额' // 对应的文案
			},
			'deliver': {
				show: true,
				text: '申请寄送物料'
			},
			'setting': {
				show: true,
				text: '设置'
			}
		}
	}
}
```

#### 获取商家优惠金额
***URL：*** /business/discount/get

***参数：***
```javascript
{
	// 公共参数
	memberId: '213123', // 用户id
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	"data": {
		"canModify": true, // 判断用户是否可以修改金额，多少天内只允许修改一次
		"protectedDays": 7, // 多少天之内只能修改一次
		"minMoney": 5, //可配置的最小金额 （单位元）
		"maxMoney": 20, // 可配置的最大金额（单位元）
		"activeMoney": 15 // 当前的优惠金额（单位元）	
	}
}
```


#### 修改商家优惠金额
***URL：*** /business/discount/modify   
***RD最终接口：***  http://jdb-dev.com/merchant/shop/wikis/OpenPersonStoreSetCouponAmount


***参数：***
```javascript
{
	// 公共参数
	money: 16 // 优惠金额
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	}	
}
```

####  获取寄送物料信息
***URL：***/business/sendInfo/get

***参数：***
```javascript
{
	// 公共参数
	memberId: '123312', // 用户id
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	data: {
	    memberId: '123312', // 商家id
		name: '胡晓晖', // 收货人（默认为借贷宝用户姓名）
		phone: '18513622589', // 手机号 （默认为借贷宝用户手机号）
		addr: '仰山公园', // 店铺地址
		canModify: true, // 是否可以修改寄送信息
		protectedDays: 7 // 多少天之内不可以重新修改寄送信息
	}
}
```

#### 修改寄送物料信息
***URL：***/business/sendInfo/modify

***参数：***
```javascript
{
	// 公共参数
	id: '21313123', // 用户id (必填)
	name: '胡晓晖', // 收货人（默认为借贷宝用户姓名）(必填)
	phone: '18513622589', // 手机号 （默认为借贷宝用户手机号）(必填)
	addr: '仰山公园' // 店铺地址 (必填)
}
```
***返回：***
```javascript
{
	"error": {
        "returnCode": 0,
        "returnMessage": "success",
        "returnUserMessage": "success"
	},
	data: {
		name: '胡晓晖', // 收货人（默认为借贷宝用户姓名）
		phone: '18513622589', // 手机号 （默认为借贷宝用户手机号）
		addr: '仰山公园', // 店铺地址
		canModify: true, // 是否可以修改寄送信息
		protectedDays: 7 // 多少天之内不可以重新修改寄送信息
	}
}
```
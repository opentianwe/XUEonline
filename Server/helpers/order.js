const mysql = require('../msOp')
function orderCode() {
	var orderCode='';
	for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
	{
	  orderCode += Math.floor(Math.random() * 10);
	}
	orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
	return orderCode;
  }
class order{

	 constructor(CommodityID,UserEmal,isdol = 1,isPaid = false) {
		this.CommodityID = CommodityID
		this.UserEmal = UserEmal
		this.isPaid = isPaid
		this.isdol = isdol
	 }
	
	
	 Creat(callback){
		var UserEmal = this.UserEmal
		var CommodityID = this.CommodityID
		var code = orderCode()
		var isPaid = this.isPaid
		var isdol = this.isdol
		mysql.queryCommodityInfoByID(CommodityID,function(data,err){
			if(err || data == [])
			{
				callback(null)
				return null
			}
			var dol = data[0].RMB
			var Yen = data[0].Yen
			var Orname = data[0].name
			var integral = data[0].integral
			if(isdol == 1)
			{
				Yen = 0

			}else if(isdol == 2)
			{
				dol = 0
			}
			
			//是否已经付款
			if(isPaid)
			{
				mysql.queryUserTIDbyemal(UserEmal,function(datas,err) {
					if(err || datas.length == 0)
					{
						mysql.queryUserPbyEmal(UserEmal,function(datas,err) {
							if(err || datas.length == 0)
							{
								callback(null)
								return null
							}else
							{
								mysql.CreatOrder(datas[0].ID,UserEmal,code,CommodityID,2,dol,integral,Yen,function(data,err) {
									if(err)
									{
										return null
									}else
									{
										callback({number:code,$:dol,Emal:UserEmal,UserID:datas[0].ID,Orname:Orname,integral:integral})
									}
									
								})
							}
							
						
						})
						return null
					}else
					{
						mysql.CreatOrder(datas[0].ID,UserEmal,code,CommodityID,2,dol,integral,Yen,function(data,err) {
							if(err)
							{
								return null
							}else
							{
								callback({number:code,$:dol,Emal:UserEmal,UserID:datas[0].ID,Orname:Orname,integral:integral})
							}
							
						})
					}
					
				})
			}else
			{
				mysql.queryUserTIDbyemal(UserEmal,function(datas,err) {
					if(err || datas.length == 0)
					{
						mysql.queryUserPbyEmal(UserEmal,function(datas,err) {
							if(err || datas.length == 0)
							{
								callback(null)
								return null
							}else
							{
								mysql.CreatOrder(datas[0].ID,UserEmal,code,CommodityID,1,dol,integral,Yen,function(data,err) {
									if(err)
									{
										return null
									}else
									{
										callback({number:code,$:dol,Emal:UserEmal,UserID:datas[0].ID,Orname:Orname,integral:integral})
									}
									
								})
							}
							
						
						})
						return null
					}else
					{
						mysql.CreatOrder(datas[0].ID,UserEmal,code,CommodityID,1,dol,integral,Yen,function(data,err) {
							if(err)
							{
								return null
							}else
							{
								callback({number:code,$:dol,Emal:UserEmal,UserID:datas[0].ID,Orname:Orname,integral:integral})
							}
							
						})
					}
					
				})
			}
			
		})
	 
	}
}

module.exports = order
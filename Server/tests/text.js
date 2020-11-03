const Appointment = require("../models/Appointment")

Appointment.queryAppointment_isSpecialOffer_Byemail("XUEonline2020@gmail.com","147258369@qq.com")
.then((data)=>
{
    console.log(data)
})

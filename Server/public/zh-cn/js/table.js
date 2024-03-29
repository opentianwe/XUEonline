new Vue({
    el: "#app",
    data: {
        list: [],
        ttps: "./upload/",
        pageNO: 1,
        //页码
        Singlepage: 1,
        Totalpage: 1,
        temp: true,
        type: 1,
        arry: ["中文教师", "日文教师", "英语教师", "韩语教师", '男老师', '女老师'],
        search: "",
        temp: true,
        ht: './ter.html?id=',
        listId: 0,
    },
    methods: {
        getsearch: function (index) {

            this.temp = true
            this.pageNO = index || this.pageNO
            console.log(this.pageNO)
            if (this.search == "") {
                alert("您还未输入内容,请重新输入内容")
                return;
            } else {
                axios({
                    method: "get",
                    url: "./Tsearch?search=" + this.search + "&index=" + this.pageNO + "&np=16"

                })
                    .then(res => {
                        this.list = res.data.lists;
                        this.Singlepage = res.data.Singlepage;
                        this.Totalpage = res.data.Totalpage;
                        var a = '中文'
                        var b = '日文'
                        var c = "英文"
                        var d = '韩文'
                        var f = ','
                        // s
                        var obj = {
                            "1": a,
                            "2": b,
                            "3": c,
                            "4": d,
                            "5": f
                        }
                        for (let i = 0; i < this.list.length; i++) {
                            var str = this.list[i].Lesson.split(',')
                            this.list[i].Lesson = []
                            str.forEach(element => {
                                this.list[i].Lesson.push(obj[element])
                            });
                            a = this.list[i].Lesson.toString()
                            this.list[i].Lesson = a
                        }
                        console.log(this.list[0])

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }

        },
        searchEnterFun(e) {
            var keyCode = window.event ? e.keyCode : e.which;
            if (keyCode == 13) {
                this.getsearch();
            }
        }
        ,
        getimgurl: function (http, imgurl) {
            var url = http + imgurl
            return url
        },

        getList: function (i, index) {
            this.temp = false
            this.pageNo = i || this.pageNo
            this.type = index || this.type;
            axios({
                method: "get",
                url: "./Atinfo?index=" + this.pageNO + "&np=12&type=" + this.type,
            })
                .then(res => {

                    this.list = res.data.lists;
                    this.Singlepage = res.data.Singlepage;
                    this.Totalpage = res.data.Totalpage;
                    var a = '中文'
                    var b = '日文'
                    var c = "英文"
                    var d = '韩文'
                    var f = ','
                    // s
                    var obj = {
                        "1": a,
                        "2": b,
                        "3": c,
                        "4": d,
                        "5": f
                    }
                    // for (let i = 0; i < this.list.length; i++) {
                    //    this.list[i].Lesson 
                    // }

                    for (let i = 0; i < this.list.length; i++) {
                        var str = this.list[i].Lesson.split(',')
                        this.list[i].Lesson = []
                        str.forEach(element => {
                            this.list[i].Lesson.push(obj[element])
                        });
                        a = this.list[i].Lesson.toString()
                        this.list[i].Lesson = a
                    }
                    console.log(this.list[0])

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        goType: function (i) {
            this.isTure()
            this.type = i
            this.pageNO = 1
            this.getList(1)
        },
        curPage: function (index) {

            this.pageNO = index;

            if (this.temp == false) {
                this.isTure()
                this.getList(index)
            } else {
                this.isTure()
                console.log(index)
                this.getsearch(index)
            }

        },
        isTure() {
            $('#ifwarp').css('opacity', "0")
            setTimeout(function () {
                $('#ifwarp').css('opacity', "1")
            }, 250)
        }
        ,
        prePage: function () {
            if (this.pageNO > 1) {
                this.pageNO--
                if (this.temp == false) {
                    this.isTure()
                    this.getList(this.pageNo)
                    return
                } else {
                    this.isTure()
                    this.getsearch(this.pageNo)
                    return
                }
            }
            layer.msg('已经是第一页了', { icon: 5 })
        },
        nextPage: function () {
            if (this.pageNO < this.Totalpage) {
                this.pageNO++;
                if (this.temp == false) {
                    this.isTure()
                    this.getList(this.pageNo)
                    return
                } else {
                    this.isTure()
                    this.getsearch(this.pageNo)
                    return
                }
            }
            layer.msg('已经到最后一页了', { icon: 5 })
        },

    },

    mounted: function () {
        this.getList()
    },

})
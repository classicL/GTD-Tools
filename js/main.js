(function(){
	var _ID123 = _ID123 || {};
    //if(!_ID123){ var _ID123 = {};}
    console.log(_ID123);
    var active = {
		category: null,
		subCategory: null,
		task:null
	},
	categoryList = [];
	categoryList.identifier = 0;
	localStorage.category_list = '';
	//添加分类
	$(".add-category").addEventListener("click",function(){
		$(".prompt-bg").style.display = "block";
		$(".prompt").style.display = "block";
		$(".prompt-title").innerHTML = "添加分类";
		$(".input").focus();

		$(".prompt-done").addEventListener("click",function(){
			var f = arguments.callee;
			$(".prompt-done").removeEventListener("click",f);
			$(".prompt-bg").style.display = "none";
			$(".prompt").style.display = "none";
            $(".input").value?addNewCategory($(".input").value):false;
			$(".input").value = "";
		})
	});
	//添加子分类
	$(".add-sub-category").addEventListener("click",function(){
		if(active.category == $(".category-default")){return;}
		$(".prompt-bg").style.display = "block";
		$(".prompt").style.display = "block";
		$(".prompt-title").innerHTML = "添加子分类";
		$(".input").focus();

		$(".prompt-done").addEventListener("click",function(){
			var f = arguments.callee;
			$(".prompt-done").removeEventListener("click",f);
			$(".prompt-bg").style.display = "none";
			$(".prompt").style.display = "none";
			$(".input").value?addNewSubCategory(active.category,$(".input").value):false;
			$(".input").value = "";
		})
	});
	$(".prompt-cancle").addEventListener("click",function(){
		$(".prompt-bg").style.display = "none";
		$(".prompt").style.display = "none";
	});
	//添加任务
	$(".add-task").onclick = function(){
		$(".baocun-wancheng").style.color = "black";

			$(".content-input").value = "";
			$(".title-input").value = "新任务";
			$(".date-input").value = "";
		var fn = arguments.callee;
		this.onclick = null;
		var _this = this;
		if(active.subCategory == null){return;}
		$(".content-input").style.display="block";
		$(".title-input").style.display="block";
		$(".date-input").style.display="block";
		$(".baocun-wancheng").className = "iconfont icon-baocun tt-icon cp fade50 baocun-wancheng";
		$(".baocun-wancheng").onclick = function(){
			if(!$(".title-input").value){return}
			$(".baocun-wancheng").onclick = function(){
				taskDone();
			};
			addNewTask($(".title-input").value,$(".date-input").value,$(".content-input").value);
			$(".content-input").style.display="none";
			$(".title-input").style.display="none";
			$(".date-input").style.display="none";
			$(".task-content").innerHTML = $(".content-input").value;
			$(".task-title").innerHTML = $(".title-input").value;
			$(".task-date").innerHTML = $(".date-input").value;
			$(".content-input").value = "";
			$(".title-input").value = "新任务";
			$(".date-input").value = "";
			$(".baocun-wancheng").className = "iconfont icon-wancheng tt-icon cp fade50 baocun-wancheng";
			$(".add-task").onclick = fn;			
		}
	};
	$(".icon-edit").onclick = function(){
		$(".content-input").style.display="block";
		$(".title-input").style.display="block";
		$(".date-input").style.display="block";
		$(".baocun-wancheng").className = "iconfont icon-baocun tt-icon cp fade50 baocun-wancheng";
		$(".content-input").value = active.task.content;
		$(".title-input").value = active.task.title;
		$(".date-input").value = active.task.date;
		$(".baocun-wancheng").onclick = function(){
			if(!$(".title-input").value){return}
			$(".baocun-wancheng").className = "iconfont icon-wancheng tt-icon cp fade50 baocun-wancheng";
			$(".baocun-wancheng").onclick = function(){
				taskDone();
			};
			$(".content-input").style.display="none";
			$(".title-input").style.display="none";
			$(".date-input").style.display="none";
			$(".task-content").innerHTML = $(".content-input").value;
			$(".task-title").innerHTML = $(".title-input").value;
			$(".task-date").innerHTML = $(".date-input").value;
			active.task.content = $(".content-input").value;
			active.task.title = $(".title-input").value;
			active.task.date = $(".date-input").value;
			active.task.innerHTML = active.task.title;
			LSTask(active.subCategory,active.task)
		}
	};
	$(".baocun-wancheng").onclick = function(){
		taskDone();
	};
	function addNewCategory(title,init){
		var category = document.createElement("div");
		category.className = "category";
		category.id = "C-" + categoryList.identifier++;
		category.title = title;
		category.sub = [];
		category.sub.identifier = 0;
		category.innerHTML = "<div class=\"category-title cp\"><i class=\"category-icon iconfont\">&#xe624;</i><span class=\"category-title-name\">" + title + "</span><span class=\"delete delete-category\">x</span></div>		<ul class=\"sub-category-list\"></ul>";
		$(".category-list").appendChild(category);
		categoryList.push(category);
		changeCategory(category);
		category.querySelector(".category-title").onclick = categoryTitleClick;
		if(!init){LSCategory(category)}
	}
	function LSCategory(obj){
		_ID123[obj.id] = {};
		_ID123[obj.id]["title"] = obj.title;
		_ID123[obj.id]["sc"] = {};

		localStorage._ID123 = JSON.stringify(_ID123);
	}
    //function deleteCategory(obj){
    //    if(confirm('确定删除分类 ' + obj.title + ' 么？')){
    //        delete _ID123[obj.id];
    //    }
    //    localStorage._ID123 = JSON.stringify(_ID123);
    //    init();
    //}
    //document.onclick = function(e){
    //    if(e.target.className === "delete delete-category"){
    //        deleteCategory(e.target.parentNode.parentNode);
    //    }
    //};
	function addNewSubCategory(sup,title,id,init){
		var subCategory = document.createElement("li");
		subCategory.className = "sub-category cp";
		subCategory.id = id || sup.id + "-" + sup.sub.identifier++;
		subCategory.title = title;
		subCategory.task = [];
		subCategory.task.identifier = 0;
		subCategory.innerHTML = "<i class=\"task-icon iconfont\">&#xe60d;</i>" + title + "<span class=\"delete delete-sub-category\">x</span>"
		sup.querySelector(".sub-category-list").appendChild(subCategory);
		sup.querySelector(".sub-category-list").style.display = "block";
		subCategory.onclick = subCategoryClick;

		sup.sub.push(subCategory);
		changeSubCategory(subCategory);
		if(!init){LSSubCategory(sup,subCategory)}
	}
	function LSSubCategory(sup,obj){
		_ID123[sup.id]["sc"][obj.id] = {};
		_ID123[sup.id]["sc"][obj.id].title = obj.title;
		_ID123[sup.id]["sc"][obj.id]['task'] = {};

		localStorage._ID123 = JSON.stringify(_ID123);
		// console.log(JSON.stringify(_ID123));
	}
	function addNewTask(title,date,content,isDone,init){
		var task = document.createElement("div");
		task.title = title;
		task.id = active.subCategory.task.identifier++;
		task.date = date;
		task.isDone = task.isDone||false;
		task.content = content;
		task.className = "task";
		task.innerHTML = title;
		active.subCategory.task.push(task);
		task.onclick = taskClick;
		// console.log(active.subCategory.task);
		$(".date-list").appendChild(task);
		changeTask(task);
		active.task = task;
		if(isDone){
			taskDone();
		}
		if(!init){LSTask(active.subCategory,task);}
	}
	function LSTask(sup,obj){
		_ID123[sup.parentNode.parentNode.id]["sc"][sup.id]['task'][obj.id] = {};
		var _task = _ID123[sup.parentNode.parentNode.id]["sc"][sup.id]['task'][obj.id];
		_task.title = obj.title;
		_task.date = obj.date;
		_task.isDone = obj.isDone;
		_task.content = obj.content; 
		localStorage._ID123 = JSON.stringify(_ID123);
	}
	function init(){
		if(!localStorage._ID123){return}
		_ID123 = JSON.parse(localStorage._ID123);
        console.log(_ID123);
		for(var i in _ID123){
			console.log(_ID123[i].title);
			addNewCategory(_ID123[i].title,true);
			for(var k in _ID123[i].sc){
				console.log(_ID123[i].sc[k].title)
				addNewSubCategory(active.category,_ID123[i].sc[k].title,k,true);
				for(var j in _ID123[i].sc[k].task){
					console.log(_ID123[i].sc[k].task[j].title);
					addNewTask(_ID123[i].sc[k].task[j].title,_ID123[i].sc[k].task[j].date,_ID123[i].sc[k].task[j].content,_ID123[i].sc[k].task[j].isDone,true)
				}
			}
		}
	}
	function categoryTitleClick(){
		if(getStyle(this.parentNode.querySelector(".sub-category-list"),"display") == "none"){
			this.parentNode.querySelector(".sub-category-list").style.display = "block";
		}else if(active.category == this.parentNode){
			this.parentNode.querySelector(".sub-category-list").style.display = "none";
		}
		changeCategory(this.parentNode);
	}
	function subCategoryClick(){
		changeSubCategory(this);
	}
	function taskClick(){
		changeTask(this);
	}
	function changeCategory(obj){
		if(active.category == obj){return;}
		if(active.category !== null){
			active.category.querySelector(".category-title").className = "category-title cp";
		}
		active.category = obj;
		obj.querySelector(".category-title").className = "category-title cp activeC";
	}
	function changeSubCategory(obj){
		for (var i = 0; i < categoryList.length; i++) {
			for (var j = 0; j < categoryList[i].sub.length; j++) {
				categoryList[i].sub[j].className = "sub-category cp";
				for(var k = 0; k <categoryList[i].sub[j].task.length; k++){
					categoryList[i].sub[j].task[k].style.display = "none";
				}
			}
		}
		obj.className = "sub-category cp active";
		for (var i = obj.task.length - 1; i >= 0; i--) {
			obj.task[i].style.display = "block";
		}
		active.subCategory = obj;
		if(obj.task[0]){
			changeTask(obj.task[0])
		}else{
			$(".content-input").value = "";
			$(".title-input").value = "新任务";
			$(".date-input").value = "";
			$(".task-content").innerHTML = '';
			$(".task-title").innerHTML = '';
			$(".task-date").innerHTML = '';
			$(".baocun-wancheng").style.color = "black";
		}
	}
	function changeTask(obj){
		for (var i = 0; i < categoryList.length; i++) {
			for (var j = 0; j < categoryList[i].sub.length; j++) {
				for(var k = 0; k<categoryList[i].sub[j].task.length; k++){
					categoryList[i].sub[j].task[k].className = "task";
				}
			}
		}
		
		obj.className = "task active";
		$(".task-content").innerHTML = obj.content;
		$(".task-title").innerHTML = obj.title;
		$(".task-date").innerHTML = obj.date;
		active.task = obj;
		if(obj.isDone == true){
			$(".baocun-wancheng").style.color = "green";
		}else{
			$(".baocun-wancheng").style.color = "black";
		}
	}
	function taskDone(){
		active.task.isDone = true;
		active.task.style.fontWeight = "normal";
		$(".baocun-wancheng").style.color = "green";
		LSTask(active.subCategory,active.task);
	}

	//获取样式
	function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	}

	function $(selector){
			return document.querySelector(selector);
	}
	init();
})();	



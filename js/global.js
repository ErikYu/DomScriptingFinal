function addLoadEvent(func){
	var oldonload=window.onload;
	if (typeof(oldonload)!="function") {
		window.onload=func;
	} else {
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	} else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
//增加class属性
function addClass(element, value){
	if (!element.className) {
		element.className=value;
	} else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}
//当前页的nav高亮
//根据当前页面url高亮nav
//根据当前页面设置header背景
//window.location.href检测当前页面的URL
//string.indexOf(sunstring)在字符串中寻找字符串的位置吗，没有匹配返回-1
function highlightPage(){
	if(!document.getElementsByTagName) return false;//检测DOM方法
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName("header");
	if(headers.length==0) return false;//检测是否有header元素
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;//检测是否有nav元素
	var links=navs[0].getElementsByTagName("a")
	var linksUrl;
	for (var i=0; i<links.length; i++) {
		linksUrl=links[i].getAttribute("href");
		if (window.location.href.indexOf(linksUrl)!=-1) {
			links[i].className="here";
			//获取a元素的文本节点数值的小写
			var linkText=links[i].lastChild.nodeValue.toLowerCase();
			//给当前页面body增加id属性linkText
			document.body.setAttribute("id", linkText);
		}
	}
}

function moveElement(elementID, final_x, final_y, interval){
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left=0;
	}
	if (!elem.style.top) {
		elem.style.top=0;
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	if(xpos==final_x && ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		dist=final_x-xpos;
		xpos+=(Math.ceil(dist/10))
//		dist=Math.ceil((final_x-xpos)/10);
//		xpos=xpos+dist;
	}
	if(xpos>final_x){
		dist=-final_x+xpos;
		xpos-=(Math.ceil(dist/10))
//		dist=Math.ceil((-final_x+xpos)/10);
//		xpos=xpos-dist;
	}
	if(ypos<final_y){
		dist=final_y-ypos;
		ypos+=(Math.ceil(dist/10))
//		dist=Math.ceil((final_y-ypos)/10);
//		ypos=ypos+dist;
	}
	if(ypos>final_y){
		dist=-final_y+ypos;
		ypos-=(Math.ceil(dist/10))
//		dist=Math.ceil((-final_y+ypos)/10);
//		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
	elem.movement=setTimeout(repeat, interval);
}

function prepareSlideshow(){
	if(!document.getElementById("intro")) return false;
	var intro=document.getElementById("intro");
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id", "slideshow");
	var newImg=document.createElement("img");
	newImg.setAttribute("id", "preview");
	newImg.setAttribute("src", "img/slideshow.gif");
	newImg.setAttribute("alt", "a glimpse of what awaits you");
	newDiv.appendChild(newImg);
	insertAfter(newDiv, intro);
	var links=document.getElementsByTagName("a");
	var destination;
	for(var i=0; i<links.length; i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview", 0, 0, 5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview", -150, 0, 5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview", -300, 0, 5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview", -450, 0, 5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview", -650, 0, 5);
			}
		}
	};
}
//根据id匹配设置section的display值
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0; i<sections.length; i++){
		if (sections[i].getAttribute('id')==id) {
			sections[i].style.display="block";
		} else{
			sections[i].style.display="none";
		}
	}
}
//将section部分display设置为none；
//根据href值通过split()方法获取id值，splict("#")将字符串由分隔符分为两个字符串

function prepareInternalnav(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var article=document.getElementsByTagName("article");
	if(article.length==0) return false;
	var navs=article[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}
//创建一个占位符
function preparePaceholder(){
	if(!document.createElement) return false; 
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeHolder=document.createElement("img");
	placeHolder.setAttribute("id", "placeholder");
	placeHolder.setAttribute("src", "img/placeholder.gif");
	placeHolder.setAttribute("alt", "myGallery");
	var description=document.createElement("p");
	description.setAttribute("id", "description");
	var descText=document.createTextNode("Choose an image!");
	description.appendChild(descText);
	var imgGallery=document.getElementById("imagegallery");
	insertAfter(description, imgGallery);
	insertAfter(placeHolder, description);
}
function showPic(whichPic){
	if(!document.getElementById("placeholder")) return false;
	if(!document.getElementById("description")) return false;
	var source=whichPic.getAttribute("href");
	var placeHolder=document.getElementById("placeholder");
	var description=document.getElementById("description");
	if(whichPic.getAttribute("title")){
		var title=whichPic.getAttribute("title");
	} else{
		var title=" ";
	}
	if(description.firstChild.nodeType==3){
		description.firstChild.nodeValue=title;//为何要做此判断，查书
	}
	placeHolder.setAttribute("src", source);
	return false;//具体实现翻翻以前的书吧 少年！
}
//点击调用函数showPic()
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(i=0; i<links.length; i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}
//奇偶数行区分开
function stripeTable(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0; i<tables.length; i++){
		var rows=tables[i].getElementsByTagName("tr");
		for(j=0; j<rows.length; j++){
			if(j%2==0){
				addClass(rows[j],"odd")
			} else{
				continue;
			}
		}
	}
}

function hightlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0; i<rows.length; i++){
		rows[i].oldClassName=rows[i].className
		rows[i].onmouseover=function(){
			addClass(this, "highlight")
		};
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		};
	}
}
/*土办法
 * 想想这个方法能不能实现去除重复的？
function displayAbbr(){
	if(!document.getElementsByTagName) return false;
	var abbrs=document.getElementsByTagName("abbr");
	if (abbrs.length<1) {
		return false;
	}
	var tables=document.getElementsByTagName("table");
	var table=tables[tables.length-1];
	var dl=document.createElement("dl");
	for(var i=0; i<abbrs.length; i++){
		var dt=document.createElement("dt");
		var dd=document.createElement("dd");
		var dtText=document.createTextNode(abbrs[i].textContent);
		var ddText=document.createTextNode(abbrs[i].title);
		dt.appendChild(dtText);
		dd.appendChild(ddText);
		dl.appendChild(dt);
		insertAfter(dd,dt);
	}
	insertAfter(dl, table)
}
*/

//高大上一些
//数组操作
function displayAbbr(){
	var abbreviations=document.getElementsByTagName("abbr");
	if (abbreviations.length<1) {
		return false;
	}
	var defs=[];
	for(i=0; i<abbreviations.length; i++){
		var currentAbbr=abbreviations[i];
		if(currentAbbr.childNodes.length<1) continue;
		var description=currentAbbr.getAttribute("title");
		var keys=currentAbbr.lastChild.nodeValue;
		defs[keys]=description;
	}
	var dlist=document.createElement("dl");
	for(keys in defs){
		var definition=defs[keys];
		var dtitle=document.createElement("dt");
		var dtitltText=document.createTextNode(keys);
		dtitle.appendChild(dtitltText);
		var ddesc=document.createElement("dd");
		var ddescText=document.createTextNode(definition);
		ddesc.appendChild(ddescText);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length<1) return false;
	var header=document.createElement("h3");
	var headerText=document.createTextNode("Abbreviations!");
	header.appendChild(headerText);
	var article=document.getElementsByTagName("article");
	if(article.length==0) return false;
	var container=article[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
//检查是否为空
function isFilled(field){
	if(field.value.replace(" ","").length==0)return false;
	var placeholder=field.placeholder || field.getAttribute("placeholder");
	return(field.value != placeholder);
}
//检查是否是email格式
function isEmail(field){
	return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
function validateForm(whichForm){
	
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTable);
addLoadEvent(hightlightRows);
addLoadEvent(displayAbbr);
var FadeDurationMS=1000;
function SetOpacity(object,opacityPct)
{object.style.filter='alpha(opacity='+opacityPct+')';object.style.MozOpacity=opacityPct/100;object.style.opacity=opacityPct/100;}

function ChangeOpacity(id,msDuration,msStart,fromO,toO)
{var element=document.getElementById(id);var msNow=(new Date()).getTime();var opacity=fromO+(toO-fromO)*(msNow-msStart)/msDuration;if(opacity>=100)
{SetOpacity(element,100);element.timer=undefined;}
else if(opacity<=0)
{SetOpacity(element,0);element.timer=undefined;}
else
{SetOpacity(element,opacity);element.timer=window.setTimeout("ChangeOpacity('"+id+"',"+msDuration+","+msStart+","+fromO+","+toO+")",10);}}

function FadeInImage(foregroundID,newImage,backgroundID)
{var foreground=document.getElementById(foregroundID);if(foreground.timer)window.clearTimeout(foreground.timer);if(backgroundID)
{var background=document.getElementById(backgroundID);if(background)
{if(background.src)
{foreground.src=background.src;SetOpacity(foreground,100);}
background.src=newImage;background.style.backgroundImage='url('+newImage+')';background.style.backgroundRepeat='no-repeat';var startMS=(new Date()).getTime();foreground.timer=window.setTimeout("ChangeOpacity('"+foregroundID+"',"+FadeDurationMS+","+startMS+",100,0)",10);}}else{foreground.src=newImage;}}
var slideCache=new Array();

function RunSlideShow(pictureID,backgroundID,imageFiles,displaySecs)
{var imageSeparator=imageFiles.indexOf(";");var nextImage=imageFiles.substring(0,imageSeparator);FadeInImage(pictureID,nextImage,backgroundID);var futureImages=imageFiles.substring(imageSeparator+1,imageFiles.length)
+';'+nextImage;setTimeout("RunSlideShow('"+pictureID+"','"+backgroundID+"','"+futureImages+"',"+displaySecs+")",displaySecs*1000);imageSeparator=futureImages.indexOf(";");nextImage=futureImages.substring(0,imageSeparator);if(slideCache[nextImage]==null)
{slideCache[nextImage]=new Image;slideCache[nextImage].src=nextImage;}}
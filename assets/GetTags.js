var SelectedXpath = "";
var quest_counter = 0;
var currentQuest = [];

//Change the output_code to show the XPath
function change_me(id){
	SelectedXpath = createXPathFromElement(id);
	$('#selected_xpath').html(SelectedXpath);
}

//Generate XPath code:
function createXPathFromElement(elm) {
	var allNodes = document.getElementsByTagName('*');
	for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode)
	{
		if (elm.hasAttribute('id')) {
			segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
			return segs.join("/");
		} else if (elm.hasAttribute('class')) {
			segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
		} else {
			for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
				if (sib.localName == elm.localName)  i++; }
			segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
		}
	}
	return segs.length ? '/' + segs.join('/') : null;
}

$(document).ready(function(){
	var DataToDB = {};
	var pageType = "thread";
	var threadQuest = [
		'site_link',  // TODO: make a javascript/python(via AJAX) to get site_link/page_link/page_number
		'page_link',
		'htmlelement_that_wraps_a_post',  // Don't touch the first 3 items!
		'forum_name',
		'forum_version',
		'post_title',
		'post_data',
		'poster_username',
		'thread_title',
		'page_number'
	];
	var forumQuest = [
		'site_link', // TODO: make a javascript/python(via AJAX) to get site_link/thread_link/page_number
		'thread_link',
		'htmlelement_that_wraps_a_thread',  // Don't touch the first 3 items!
		'thread_titles',
		'forum_name',
		'thread_replies',
		'thread_views',
		'thread_Starter',
		'thread_last_post_date',
		'page_number',
		'thread_ratings'
	];


	//init the type of the page:
	if(pageType == "thread"){
		currentQuest = threadQuest;
	} else if (pageType == "forum"){
		currentQuest = forumQuest;
	}

	//draggable by UI Jquery lib!
	$("#output_code").draggable();

	//AJAX sending request to getHTML.py
	$.ajax({
		type: "POST",
		url: "getHTML.py",
		success: function(response)
		{
			$('body').append(response);
		}
	});

	//init the output_code:
	$("#quest").text(currentQuest[quest_counter]);
	$('#selected_xpath_textbox').hide();

	//ENTER event handle, change the quest
		$(document).keypress(function(e) {
			if(e.which == 13) {
				DataToDB[currentQuest[quest_counter]] = SelectedXpath;
				quest_counter++;
	
				$("#quest").text(currentQuest[quest_counter]);
	
				if(quest_counter == 2){
					$('#selected_xpath_textbox').val(DataToDB[currentQuest[2]]).show();
					$("#quest").append("<br>Use ### for global ID")
				} else if(quest_counter == 3){
					DataToDB[currentQuest[2]] = $('#selected_xpath_textbox').val().hide();
				}
	
			}
	});

	//scrolling the output_code div to my view
	$(window).scroll(function () {
		var set1 = $(document).scrollTop();
		var p = $("#output_code").position();
		if((set1 - p.top > 150)||(set1 - p.top < -700)){
			$('#output_code').animate({top:set1 + "px"},{duration:500,queue:false});
		}
	});
});

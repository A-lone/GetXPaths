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
    // TODO take the pageType from the server and not manually:
	var pageType = "thread";
    // TODO: make a python(via AJAX) function to get site_link/page_link/page_number
	var threadQuest = [
		'site_link',
		'page_link',
		'htmlelement_that_wraps_a_post',
		'forum_name',
		'forum_version',
		'post_title',
		'post_data',
		'poster_username',
		'thread_title',
		'page_number'
	];

	var forumQuest = [
		'site_link',
		'thread_link',
		'htmlelement_that_wraps_a_thread',
		'thread_titles',
		'forum_name',
		'thread_replies',
		'thread_views',
		'thread_Starter',
		'thread_last_post_date',
		'page_number',
		'thread_ratings'
	];


	//Init the type of the page:
	if(pageType == "thread"){
		currentQuest = threadQuest;
	} else if (pageType == "forum"){
		currentQuest = forumQuest;
	}

	//Draggable by UI Jquery lib!
    $("#output_code").draggable();
    $("#output_DataToDB").draggable();

	//AJAX sending request to getHTML.py
    $.ajax({
        url: "/a",
        type: "POST",
        success: function(response){
            $('#output_view').html(response);
        }
    });

	//Init the output_code:
	$("#quest").text(currentQuest[quest_counter]);

    //Event handle for update_DataToDB button
    $('#output_DataToDB').on("click", "#update_DataToDB_button", function(){
        $.each(DataToDB, function(key){
            DataToDB[key] = $("#text_" + key).val();
        });

        $.ajax({
            url: "/a",
            type: "POST",
            data: JSON.stringify(DataToDB),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                alert(data);
            }
        });
    });

    //Event handle for GetByURL button
    $('#GetByURL').on("click", "#GetByURL_button", function(){
        $.ajax({
            url: "/a",
            type: "POST",
            data: JSON.stringify({"newURL": $("#GetByURL_input").val()}),
            contentType: "application/json",
            success: function(response) {
                $('#output_view').html(response);
            }
        });
    });

	//ENTER event handle, change the quest
		$(document).keypress(function(e) {
			if(e.which == 13 && quest_counter < currentQuest.length) {
				DataToDB[currentQuest[quest_counter]] = SelectedXpath;
                $("#output_DataToDB").append(currentQuest[quest_counter] + ": <textarea rows='1' cols='60' id='text_" + currentQuest[quest_counter] + "'/></textarea><br><br>");
                $('#text_' + currentQuest[quest_counter]).val(SelectedXpath);
                if(quest_counter == currentQuest.length - 1){
                    $("#output_DataToDB").append("<input type='button' id='update_DataToDB_button' value='Save!'>");
                }
				quest_counter++;
                $("#quest").text(currentQuest[quest_counter]);
			}
	});

	//scrolling the output_code div to my view
	$(window).scroll(function () {
        var set1 = $(document).scrollTop();
		var p = $("#output_code").position();
		if((set1 - p.top > 150)||(set1 - p.top < -700)){
			$('#output_code').animate({top:set1 + "px"},{duration:500,queue:false});
		}
        var p2 = $("#output_DataToDB").position();
        if((set1 - p2.top > 150)||(set1 - p2.top < -700)){
            $('#output_DataToDB').animate({top:set1 + "px"},{duration:500,queue:false});
        }
	});
});

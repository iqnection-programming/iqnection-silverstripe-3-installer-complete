// JavaScript Document
$(":root").addClass('js');
$(document).ready(function(){
	$(window).load(function(){
		$(":root").addClass('done');
		fixAllHeights();
	});
	// Code to set correct tracking account in GA across domains
	if (typeof ga == 'function'){
		ga(function(tracker) {
			clientId = tracker.get('clientId');
		});
		var domain=window.location.host.replace(/www\./,'').replace(/content\./,'').replace(/blog\./,'');
		$("a[href*='"+domain+"']").each(function(){
			if (!$(this).is("[href*='www']"))
				$(this).attr('href',$(this).attr('href')+'?clientId='+clientId);
		});
	}
/*
	setupFormField("#SearchForm_SearchFor", "Search");

	$('#SearchForm_SearchForm').submit(function(){
		if( !validateFormField("#SearchForm_SearchFor", "Search", "Please specify your search terms") )
			return false;
		return true;
	});
*/
	$("a[href^=tel]").click(function(e){
		if ($(window).width() > 600){
			e.preventDefault();
			return false;
		}
	});
	
	fixAllHeights();
	fixIframes();
});

$(window).resize(function(){
	fixAllHeights();
	fixIframes();
});

function fixIframes(){
	$("iframe").each(function(){
		if (!$(this).attr('ratio') && $(this).attr('height') && $(this).attr('width')){
			$(this).attr('ratio',($(this).attr('height')/$(this).attr('width')));
			var src=$(this).attr('src');
			$(this).attr('src',src+((src.indexOf("?") != -1)?"&":"?")+'wmode=transparent');
		}
	});
	setTimeout(function(){
		$("iframe").each(function(){
			if($(this).attr('ratio')){
				$(this).height($(this).width() * $(this).attr('ratio'));
			}
		});
	},500);
}

function fixAllHeights(){
	fixHeights({selector:'.parent_sameheight', method:'parent'});
	fixHeights({selector:'.internal #page_right', method:'parent'});
	fixHeights({selector:'.sameheight', method:'match'});	
}

// For info on how to use this function, check the wiki: http://iqwebwork.com/wiki/index.php?title=SilverStripe_Tips_%26_Tricks#Using_fixHeights.28.29_to_make_your_content_and_sidebar_the_same_height
function fixHeights(params)
{
	if(params){
		var selector = params.selector;
		var method = params.method;
		
		switch(method)
		{
			case "parent":
				$(selector).css('min-height','0px');
				$(selector).each(function(){
					$(this).css('min-height',($(this).parent().height())+'px');
				});	
				break;
			case "match":
				var max_height = [];
				$(selector).css("height", "auto");
				$(selector).each(function(){
					if (!max_height[$(this).attr("rel")]) max_height[$(this).attr("rel")] = 0;
					var my_height = $(this).outerHeight(false);
					if ($(this).attr("lang")) my_height += parseInt($(this).attr("lang"));
					max_height[$(this).attr("rel")] = Math.max(max_height[$(this).attr("rel")], my_height);
				});
				$(selector).each(function(){
					$(this).height(max_height[$(this).attr("rel")] - (parseInt($(this).css("padding-top"), 10) + parseInt($(this).css("padding-bottom"), 10) + parseInt($(this).css("border-top-width"), 10) + parseInt($(this).css("border-bottom-width"), 10)));
				});
				break;
			default: false;	
		}
	}
}

function setupFormField(name, value) {
	$(name).val(value);
	$(name).blur(function(){ if( $(name).val() == "" ) { $(name).val(value); } });	
	$(name).focus(function(){ if( $(name).val() == value ) { $(name).val(""); } });
}

function setupImageField(name, className) {
	$(name).addClass(className);
	$(name).blur(function(){ if( $(name).val() == "" ) { $(name).addClass(className); } });	
	$(name).focus(function(){ $(name).removeClass(className); });
}

function validateFormField(name, default_value, message) {
	if ($(name).val() == "" || $(name).val() == default_value) {
		alert(message);
		$(name).focus();
		return false;
	}
	return true;
}

function jScroll(anchor_name){
	var aTag = $("a[name='"+anchor_name+"']");
	$('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function ajaxLoad(url, resultFunc) {
	jQuery.ajax({
		url: url,
		global: false,
		dataType: "html",
		async: false,
		cache: false,
		success: function(data) {
			resultFunc(data);
		}
	});
	return;
}
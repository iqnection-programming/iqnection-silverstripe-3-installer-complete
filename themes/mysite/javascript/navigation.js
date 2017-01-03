var main_nav = "#nav_wrap > nav";
var touchbound = false;

// Pixel width where nav toggles desktop/mobile
var break_point = 900;

// for hamburger flyout nav, which side will it be located
var flyout_side = 'right';

// Set to true if javascript will dynamically space nav items
var space_nav = false;

// Set to 'li > a' or 'li' based on which element should get padding/margin
var space_tag = "li > a";

// Should be set to true if your first and last nav item are against site edges
var edges = false;

// Whether or not to use percentages when spacing teh nav. Only works when edges is false
var use_percent = false;

// Set type to 'padding' or 'margin'
var type = 'padding';

// This should be zero.  If it isn't, the font being used is ruining everything.
var width_fix = 1;

(function(w,d,$){
	"use strict";	
	w.onBeforeSwitchToDesktop = function(){
		$(":root").removeClass('mobile');
		return $.Deferred().resolve();
	};
	
	w.onBeforeSwitchToMobile = function(){
		$(":root").addClass('mobile');
		return $.Deferred().resolve();
	};
	
	w.openMobileNav = function(){
		var adjust = {};
		adjust[flyout_side] = '-2px';
		$("nav.mobile").stop(true,false).show().animate(adjust,300,'linear',function(){
			$(this).addClass('open');
			$("#nav_toggle").addClass('open');
		});
	};
	
	w.closeMobileNav = function(){
		$("#nav_toggle").removeClass('open');
		var adjust = {};
		adjust[flyout_side] = '-200%';
		$("nav.mobile").stop(true,false).animate(adjust,300,function(){ 
			$(this).removeClass('open').hide();
		});
	};
	
	w.setupMobileNav = function(){
		$("body").click(function(e){
			if ( (!$(e.target).parents('nav.mobile').length) && (!$(e.target).is('nav.mobile')) && ($('nav.mobile').is(':visible')) && (!$('nav.mobile').is(':animated')) ){
				w.closeMobileNav();
			}
		});
		$("#nav_toggle").unbind('click').click(function(){
			if($('nav.mobile').hasClass('open')){
				w.closeMobileNav();
			}else{
				w.openMobileNav();
			}
		});
		$("#nav_close").click(function(){
			w.closeMobileNav();
		});
	};
	
	w.setupDesktopNav = function(){	
		$(main_nav).each(function(){
			$(this).find('li').each(function() {
				// First we clear off mobile click if present
				$(this).find('> a').unbind('click');
				$(this).hover(function() {				
					if (!touchbound) { w.showDesktopNavDropdown($(this)); }
				}, function() {
					if (!touchbound) { w.hideDesktopNavDropdown($(this)); }
				});
			});
		});		
	};
	
	w.showDesktopNavDropdown = function(navItem){
		navItem.children('.dropdown').fadeIn(200);
	};
	
	w.hideDesktopNavDropdown = function(navItem){
		navItem.children('.dropdown').fadeOut(100);
	};
	
	w.isTouch = function() {
		if (!touchbound)
		{
			$(main_nav).each(function(){
				$(this).find('li').each(function(){
					
					$(this).unbind("hover");
					$(this).unbind("mouseover");
					$(this).unbind("mouseout");
					
					if ($(this).find("ul").length > 0)
					{
						$(this).unbind('mouseout');
						$(this).unbind('mouseover');
						
						//$(this).children("ul").prepend("<li><a href='"+$(this).children("a").attr("href")+"'>"+$(this).children("a").html()+"</a></li>");
					
						$(this).find("a").first().bind('click', function(e){ 
							e.preventDefault(); 
							
							if ($(this).attr("rel") === "open")
							{
								// clicking to close
								$(this).attr("rel", "closed");
								w.hideDesktopNavDropdown($(this).parent());
							}
							else
							{
								// are we clicking another top nav, or a sub nav
								if ($(this).parents().children('a[rel=open]').length > 0)
								{
									if ($(this).parent('li').children('.dropdown').length === 0)
									{
										$('nav .dropdown').hide();
										$("a[rel=open]").attr("rel", "closed");
									}							
									$(this).attr("rel", "open");
									w.showDesktopNavDropdown($(this).parent());	
								}
								else
								{						
									$('nav .dropdown').hide();
									$("a[rel=open]").attr("rel", "closed");
									$(this).attr("rel", "open");
									w.showDesktopNavDropdown($(this).parent());
								}
							}
							return false;
						});
					}
				});
			});
			
			touchbound = true;
		}
	};
	
	/*
	 * Toggles nav styles
	 * {nav} variable created in dropdowns.js
	 */
	w.responsiveNav = function(){
		/*
		 * DESKTOP NAV
		 */
		if($(w).width() > break_point){
			$(":root").removeClass('mobile');
			w.onBeforeSwitchToDesktop().done(function(){
				$(w.main_nav).each(function(){		
					if($(this).hasClass('mobile')){
						$(this).removeClass('mobile').addClass('desktop').removeAttr('style');
						
						/* Cleanup!
						 * 1. Remove our nav toggle link
						 * 2. Remove our cloned parent links in dropdowns
						 * 3. Run setupNav() from dropdowns.js to assign hover events
						 * 4. Hide open dropdowns
						 * 5. Run spaceNav() to space out nav items
						 */
						$('.mobile_top').remove();
						$(this).find('li').css('display','');
						$('nav.desktop a.open').removeClass('open');
						$('nav .dropdown').hide();
						w.setupDesktopNav();
					}
					if(space_nav) {w.spaceDesktopNav(this);}
				});
			});
		/*
		 * MOBILE NAV
		 */	
		} else {
			w.onBeforeSwitchToMobile().done(function(){
				$(":root").addClass('mobile');
				$(w.main_nav).each(function(i,nav){
					if ($(nav).hasClass('desktop')){
						$(nav).removeClass('desktop').addClass('mobile').css(flyout_side,'-200%');
						$(nav).find('> ul.fullwidth > '+space_tag).removeAttr('style');
						$(nav).find('li').each(function(){
							$(this).unbind('mouseenter').unbind('mouseleave');
							var a_tag = $(this).find('> a');
							// clear off desktop touch event
							a_tag.unbind('click mouseout mouseover mouseenter mouseleave');
							/* If a nav item has a dropdown menu we have to make it mobile friendly
							 * 1. Add a clone of the parent to the beginning of the dropdown items
							 * 2. Override parent's default action to instead open the dropdown menu
							 */
							if($(this).find('>.dropdown').length){
								a_tag.addClass('hc');
								// add the duplicate nav item as a child, but only if not heading page
								if((!$(this).find('>.dropdown').children('.mobile_top').length)&&(!a_tag.attr('heading'))){$(this).find('>.dropdown').first().prepend('<li class="mobile_top"><a href="'+a_tag.attr('href')+'">'+a_tag.html()+'</a></li>');}
								a_tag.unbind('click').click(function(e) {
									e.preventDefault();
									// reset all other nav items
									$('a').not(this).not("#nav_toggle").each(function(){
										$(this).removeClass('open').siblings('.dropdown').slideUp();
									});
									// toggle this nav item
									$(this).toggleClass('open').siblings('.dropdown').slideToggle();
								});
							}	
						});
						if (!$("#nav_close").length){
							$(nav).prepend('<a href="javascript:void(0)" id="nav_close">Close</a>');
						}
						w.setupMobileNav();
					}
				});
			});
		}
	};
	
	/*
	 * Spaces nav items on desktop
	 */
	w.spaceDesktopNav = function(fixnav){
		$(fixnav).each(function(){	
			var items = $(this).find('> ul.fullwidth > '+space_tag);
			var item_total = items.length;
			var nav_width = $(this).find('> ul.fullwidth').width();	
			var item_width = 0;
			var space;
			items.css('width','auto').each(function(){item_width+=Math.floor($(this).width());});
			if (edges && !use_percent){			
				space = Math.floor((((nav_width-width_fix)-item_width) / ((item_total - (edges ? 1 : 0))*2)));
				if(space){
					items.each(function(index){
						if(!edges || index !== 0){ $(this).css(type+'-left',space+'px'); }
						if(!edges || index !== (item_total - 1)){ $(this).css(type+'-right',space+'px'); }
					});
				}
			}else if (edges && use_percent){
				space = Math.floor( (nav_width-item_width) / ( (item_total * 2) - 2) );
				if(space){
					items.each(function(index){
						var newWidth = $(this).width() + ( ( (!index) || (index+1===items.length) ) ? space : space*2);
						var percentOfCt = (newWidth / nav_width)*100;
						$(this).css('width',percentOfCt.toFixed(2) + '%');
					});
				}
			}else{
				space = Math.floor( (nav_width-item_width) / item_total );
				if(space){
					items.each(function(){
						var newWidth = $(this).width() + space;
						var percentOfCt = (newWidth / nav_width)*100;
						$(this).css('width',percentOfCt.toFixed(2) + '%');
					});
				}
			}
		});
	};
		
	$(d).ready(function(){
		$(w).bind('touchstart', function(){ w.isTouch(); });
		if (navigator.msMaxTouchPoints) { $(w).bind('MSPointerDown', function(){ w.isTouch(); }); }
		w.addResponsiveAdjustment(w.responsiveNav);
	});

}(window,document,jQuery));
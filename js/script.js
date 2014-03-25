/*
••••••••••••••••••••••••

Powered by Type & Grids™
www.typeandgrids.com

••••••••••••••••••••••••
*/

jQuery.easing.def = "easeOutQuad";

var isHomeCurrentPage = true;
var isWorkCurrentPage = false;
var isAboutCurrentPage = false;
var isPubCurrentPage = false;



function fadeOut() {

	if(isHomeCurrentPage) {
		$("#home").fadeOut(0); //war 500
		$("#homePage").removeClass("currentPage");
		isHomeCurrentPage = false;
	} else if (isWorkCurrentPage) {
		$("#work").fadeOut(0);
		$("#workPage").removeClass("currentPage");
		isWorkCurrentPage = false;
	} else if (isAboutCurrentPage) {
		$("#about").fadeOut(0);	
		$("#aboutPage").removeClass("currentPage");
		isAboutCurrentPage = false;	
	} else if (isPubCurrentPage) {
		$("#pub").fadeOut(0);
		$("#pubPage").removeClass("currentPage");	
		isPubCurrentPage = false;
	}

}

$(document).ready(function()
{
	
	// Make enlarge buttons inactive if no onClick event
	$(".enlargeButton").each(function() {
        if ( $(this).attr("onClick") == undefined )  {
            $(this).addClass("projectNavInactive");
        };
    });
	
	// For fluid video embedding
	$(".video").fitVids();
	
	// Hide project info
	//$(".projectInfo").css("display", "none");
	// Don't hide video info
	$(".videoInfo").css("display", "inline");
	
	// Move projects to second column
	/*$("#col1:nth-child(2)").appendTo("#col2");
	$("#col1:nth-child(3)").appendTo("#col3");
	$("#col1:nth-child(5)").appendTo("#col2");
	$("#col1:nth-child(6)").appendTo("#col3");
	$("#col1:nth-child(8)").appendTo("#col2");
	$("#col1:nth-child(9)").appendTo("#col3");
	$("#col1:nth-child(11)").appendTo("#col2");
	$("#col1:nth-child(12)").appendTo("#col3");*/

	$(".project:odd").appendTo("#col2");
		
	// Project thumbnail hover
	$(".projectThumbnail").on("mouseenter", function(e)
	{
		$(this).children(".projectThumbnailHover").fadeIn(300);
		
		$(this).children(".projectThumbnailHover").find("h4").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h4").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h4").delay(100).animate({left: '15', opacity: 1}, 200);
		
		$(this).children(".projectThumbnailHover").find("h5").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h5").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h5").delay(250).animate({left: '15', opacity: 1}, 200);
	})
	
	$(".projectThumbnail").on("mouseleave", function(e)
	{
		$(this).children(".projectThumbnailHover").fadeOut(100);
		$(this).children(".projectThumbnailHover").find("h4").animate({left: '0', opacity: 0}, 0);
		$(this).children(".projectThumbnailHover").find("h5").animate({left: '0', opacity: 0}, 0);
	})
	
	// Hide hover effect on touch devices
	if (Modernizr.touch) {
		$(".projectThumbnailHover").css("display", "none");
		$(".projectThumbnailHover").css("visibility", "hidden");
		$(".projectThumbnail").unbind("mouseenter");
		$(".projectThumbnail").unbind("mouseleave");	
	}
	
	// Page navigation

	
	$("#logoDetailView").click(function()
	{
		window.location = "../../index.html";
	});
	
	$("#workPage").click(function()
		{
			if(!isWorkCurrentPage)
			{
				fadeOut();
				$("#work").fadeIn(500);
				isWorkCurrentPage = true;
				$("#workPage").attr("class", "currentPage");
			}
		});

	$("#aboutPage").click(function()
		{
			if(!isAboutCurrentPage)
			{
				fadeOut();
				$("#about").fadeIn(500);
				isAboutCurrentPage = true;
				$("#aboutPage").attr("class", "currentPage");
			}
		});

	$("#pubPage").click(function()
		{
			if(!isPubCurrentPage)
			{
				fadeOut();
				$("#pub").fadeIn(500);
				isPubCurrentPage = true;
				$("#pubPage").attr("class", "currentPage");
			}
		});

	$("#homePage, #logo").click(function()
		{
			if(!isHomeCurrentPage)
			{
				fadeOut();
				$("#home").fadeIn(500);
				isHomeCurrentPage = true;
				$("#HomePage").attr("class", "currentPage");
			}
		});
	
	/* var hash = window.location.hash;

	if(hash) {
		$("#" + hash).attr("class", "currentPage");
		fadeOut();
	} else { */
	// Make home page current page
	$("#homePage").attr("class", "currentPage");
	
	// Hide About page
	//$("#about").css("display", "none");
	$("#about").fadeOut(0);
	$("#work").fadeOut(0);
	$("#pub").fadeOut(0);



	
	// For site fade site in
	$(".container").css("display", "none");
	
});

// Remove site preloader after site is loaded
$(window).load(function() {
	$('#sitePreloader').delay(100).fadeOut(250, function() {
		$(this).remove();
	});
	
	// Fade site in
	$(".container").delay(0).fadeIn(250);
});

// Portfolio slider setup
jQuery(document).ready(function($) {
	var sliderProps = {
		autoScaleSlider: true,
	   	autoScaleSliderWidth: 460,
	   	autoScaleSliderHeight: 284,
	   	captionShowEffects: '',
	   	controlNavEnabled: false,
	   	keyboardNavEnabled: true,
	   	directionNavEnabled: false,
	   	startSlideIndex: 0,
	   	imageScaleMode: 'fill' },
		openedProjectInfo,
		isAnimating = false,
		currOpenProject;

	function closeOpenedProject(el) {
		openedProjectInfo.slideUp(900);
		openedProjectInfo.parent().find('.portfolioSlider').fadeOut();
		openedProjectInfo = false;
		if(el && el.length) {
			el.css('visibility', 'visible');
		}
	}

	/*$(".projectThumbnail").click(function(e) {
		if(isAnimating) {
			return;
		}
		isAnimating = true;
		
		var firstImgLoaded = false,
			projectEl = $(this).parent('.project'),
			projectNav = projectEl.find('.projectNav'),
			
			//
			projectInfo = projectEl.find('.projectInfo'),
			//
			
			newOpenProjectInfo = projectEl.find(".projectInfo"),
			currEl = $(this).find(".thumbnailImage");
				
		if( !projectEl.data('slider-inited') ) {
			var portfolioSliderData = projectEl.find('.portfolioSliderData'),
				imgPreloaderOverlay;
		
			if(portfolioSliderData.length > 0) {
				imgPreloaderOverlay = $('<div class="first-img-preloader"><div class="preloader-graphics"></d</div>');
				projectEl.append(imgPreloaderOverlay);

				portfolioSliderData
					.addClass('portfolioSlidesContainer')
					.wrap($('<div class="portfolioSlider"></div>'))
					.find('li').addClass('portfolioSlide');
			
				var sliderEl = projectEl.find('.portfolioSlider');
				currEl.clone().addClass('portfolioImage myImage').appendTo(sliderEl.find('li').eq(0).removeAttr('data-src'));
				var imgLoadCounter = 0;
				
				var sliderInstance = sliderEl.portfolioSlider(sliderProps).data('portfolioSlider');
				var numSlides = sliderInstance.numSlides;
				
				// Fixes bug when resizing window on About page
				$("#logo, #workPage").click(function() {
					function bugFix() {
						sliderInstance.updateSliderSize();
						$(".projectThumbnailHover").fadeOut(800);
					}
					setTimeout(bugFix, 710);
				});
				
				//var currItemCounter = projectNav.find('.projectNavCounter'),
				var currItemCounter = projectInfo.find('.projectNavCounter'),
					arrowNext = projectNav.find('.projectNavButtons .next'),
					arrowPrev = projectNav.find('.projectNavButtons .prev'),
					arrowPrevBlocked = false,
					arrowNextBlocked = false;

				function updateNextPrevButtons() {
					if(sliderInstance.currentSlideId <= 0) {
						arrowPrev.addClass('projectNavInactive');
						arrowPrevBlocked = true;
					} else {
						arrowPrev.removeClass('projectNavInactive');
						arrowPrevBlocked = false;
					}

					if(sliderInstance.currentSlideId >= numSlides - 1) {
						arrowNext.addClass('projectNavInactive');
						arrowNextBlocked = true;
					} else {
						arrowNext.removeClass('projectNavInactive');
						arrowNextBlocked = false;
					}
				}

				sliderInstance.settings.beforeSlideChange = function() {
					currItemCounter.text( (sliderInstance.currentSlideId + 1) + ' of ' + numSlides );
					updateNextPrevButtons();
				};
				
				arrowNext.click(function() {
					if(!arrowNextBlocked) {
						sliderInstance.next();
					}
				});
				arrowPrev.click(function() {
					if(!arrowPrevBlocked) {
						sliderInstance.prev();
					}
				});

				sliderInstance.settings.beforeSlideChange.call();
				updateNextPrevButtons();
				projectEl.data('slider-inited', true);
				
				imgPreloaderOverlay.css({
					width: currEl.width(),
					height: currEl.height()
				}).fadeIn();

				sliderInstance.settings.imgLoadComplete = function() {
					imgLoadCounter++;

					if(imgLoadCounter >= 2) {
						sliderInstance.settings.imgLoadComplete = false;
						setTimeout(function() {
							//sliderInstance.updateSliderSize()
							sliderInstance.goTo(1);
							isAnimating = false;
							currEl.css('visibility', 'hidden');
							imgPreloaderOverlay.stop().fadeOut();
						}, 400);
					}
					
				};

			} else {
				if(projectNav.length > 0) {
					var currItemCounter = projectInfo.find('.projectNavCounter'),
					arrowNext = projectNav.find('.projectNavButtons .next'),
					arrowPrev = projectNav.find('.projectNavButtons .prev'),
					arrowPrevBlocked = false,
					arrowNextBlocked = false;
					arrowNext.addClass('projectNavInactive');
					arrowPrev.addClass('projectNavInactive');
				}
				projectEl.data('slider-inited', true);
				isAnimating = false;
			}
		} else {
			var sliderEl = projectEl.find('.portfolioSlider');
			if(sliderEl.length > 0) {
				sliderEl.data('portfolioSlider').goToSilent(0);
				imgPreloaderOverlay = projectEl.find('.first-img-preloader');
				imgPreloaderOverlay.css({
					width: currEl.width(),
					height: currEl.height()
				}).fadeIn();

				setTimeout(function() {
					sliderEl.show();
					
					setTimeout(function() {
						currEl.css({'visibility': 'hidden'});
						imgPreloaderOverlay.stop().fadeOut();
						sliderEl.data('portfolioSlider').isAnimating = false;
						sliderEl.data('portfolioSlider').goTo(1);
						isAnimating = false;
					}, 400);
					
				}, 450);
				
			} else {
				isAnimating = false;
			}
			
		}

		if(openedProjectInfo) {
			if(newOpenProjectInfo.is(openedProjectInfo)) {
				closeOpenedProject(currOpenProject.find(".thumbnailImage"));
				currOpenProject.find(".projectThumbnailHover").fadeOut(800, function(){currOpenProject.find(".projectThumbnailHover").css("visibility", "visible")});
				return false;
			} else {
				closeOpenedProject(currOpenProject.find(".thumbnailImage"));
				currOpenProject.find(".projectThumbnailHover").fadeOut(800, function(){currOpenProject.find(".projectThumbnailHover").css("visibility", "visible")});
			}
		}
		currOpenProject =projectEl;
		openedProjectInfo = newOpenProjectInfo.stop().delay(200).slideDown(900).data('project-open', true);
		currOpenProject.find(".projectThumbnailHover").fadeOut(200, function(){currOpenProject.find(".projectThumbnailHover").css("visibility", "hidden")});
	});
	
	$(".closeButton, #aboutPage, #logo").click(function() {
		
		// Add a delay to fix weird issue with resizing About page
		function closeSlider() {
			closeOpenedProject(currOpenProject.find(".thumbnailImage"));
			currOpenProject.find(".projectThumbnailHover").css("visibility", "visible");
		}
		//setTimeout(closeSlider, 400);
		setTimeout(closeSlider, 1);
		
	});*/
	
});
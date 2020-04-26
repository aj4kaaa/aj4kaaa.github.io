jQuery(document).ready(function () {

	// Код для параллакса фона
	$objWindow = $(window);

	var width = $(window).width();
	var backPos = '';
	
	
	if (width >= '767') {
		backPos = '50% ';
		
	} else {
		backPos = '70% ';
	}

	$('section[data-type="background"]').each(function () {
		var $bgObj = $(this);
		$(window).scroll(function () {
			var yPos = -($objWindow.scrollTop() / $bgObj.data('speed'));
			var coords = backPos + yPos + 'px';
			$bgObj.css({
				backgroundPosition: coords
			});
		});
	});

	$("#carousel2").owlCarousel({
		items: 3,
		loop: true,
		smartSpeed: 1000,
		autoplay: true,
		dotsEach: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			1000: {
				items: 3
			}
		}
	});

	const slider1 = $('#carousel1');
	slider1.owlCarousel({
		items: 1,
		loop: true,
		smartSpeed: 1000,
		dotsEach: true,
		autoplay: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	$('.slider__customNextBtn').click(function () {
		slider1.trigger('next.owl.carousel');
	});

	$('.slider__customPrevBtn').click(function () {
		slider1.trigger('prev.owl.carousel');
	});

	// HAMBURGER MENU

	$('.hamburger').on('click', function() {
		$(this).toggleClass('hamanimate');
		$('.header__wrap').toggleClass('hamactive');
	});

	// MASK 

	$('input[name=phone]').mask("+7(999)999-99-99");

	// VALIDATE

	function validateForm (form) {
		$(form).validate({
			rules: {
				firstname: "required",
				phone: "required",
				checkbox: "required"
			},
			messages: {
				firstname: "Пожалуйста введите ваше имя",
				phone: "Пожалуйста введите телефон",
				checkbox: "Отметьте это поле пожалуйста"
			}
			
		});
	}

	validateForm('#consultation2 form');
	validateForm('#consultation form');

	//MODAL

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});
	$('.overlay').on('click', function (e) {
		if ($(e.target).hasClass('overlay')) {
			$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
		}
	});

	// SEND FORM

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll adn pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else $('.pageup').fadeOut();
	});

	$("a[href^='#']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	// QUESTIONS

	$('.questions__naccs .questions__menu div').on("click", function () {
		const numberIndex = $(this).index();
	
		if (!$(this).is("questions__active")) {
			$(".questions__naccs .questions__menu div").removeClass("questions__active");
			$(".questions__naccs ul li").removeClass("questions__active");
	
			$(this).addClass("questions__active");
			$(".questions__naccs ul").find("li:eq(" + numberIndex + ")").addClass("questions__active");
	
			const listItemHeight = $(".questions__naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
			$(".questions__naccs ul").height(listItemHeight + "px");

			if (width <= '991') {
				$('.questions ul.questions__nacc li p').css('opacity','1');
			}
		}
	});

	// Form

	// let message = {
	// 	loading: 'Загрузка',
	// 	success: 'Спасибо! Скоро мы с вами свяжемся!',
	// 	failure: 'Что то пошло не так...'
	// };

	// let form = document.queryCommandValue('.main-form'),
	// 	input = form.getElementByTagName('inpt'),
	// 	statusMessage = document.createElement('div');

	// 	statusMessage.classList.add('status');

	// form.addEventListener('submit', function(event) {
	// 	event.preventDefault();
	// });

}); //конец ready
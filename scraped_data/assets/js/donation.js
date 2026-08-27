(function ($) {
	"use strict";
	var hasError = false;
	var selectedProductIDs = [];

	$(document).ready(function () {
		$(".step").on("click", function () {
			var container = $(this).attr("id");

			if ($("#totalAmountDonated").val() == "" || $("#totalAmountDonated").val() == 0) {
				return false;
			}

			if ($(".step").not($(this))) {
				$(".step").removeClass("active");
				return false;
			}

			$(this).addClass("active");

			$(".step").each(function (row, el) {
				if ($(el).attr("id") == container) {
					$("." + $(el).attr("id")).addClass("active");
				} else {
					$("." + $(el).attr("id")).removeClass("active");
				}
			});
		});

		$(".btn-register a").on("click", function (e) {
			e.preventDefault();
			$(".register").show();
			$(".login").hide();
			$("#amount").val($("#net_total").val());
		});

		$(".donation-forms")
			.on("click", ".checkbox-div", function (e) {
				var $checkboxDiv = $(this);
				var $form = $checkboxDiv.closest("form");

				selectDonationCheckbox($checkboxDiv);
				computeNetAmount($checkboxDiv);
				setDonationTotal($checkboxDiv);
			})
			.on("change", ".dquantity, .damount", function (e) {
				var $input = $(this);
				var $parent = $input.closest(".dparent");
				var $checkboxDiv = $parent.find(".checkbox-div");

				$input.val(inputMustHaveValue(e, $input[0]));
				$input.val(inputMinMaxValue(e, $input[0]));
		
				computeNetAmount($input);
				if ($checkboxDiv.hasClass("selected")) setDonationTotal($checkboxDiv);
			})
			.on("click", "#next-step", function (e) {
				e.preventDefault();
				var $button = $(this);
				var $form = $button.closest("form");
				var $totalField = $form.find("#net_total");

				if ($totalField.val() == "" || $totalField.val() == "0") {
					alert("Please select any option to proceed to donation process.");
				} else {
					$button.siblings(".modal__loading").addClass("active");
					submitForm();
				}
			});

		// LOGIN
		$(".act-login").on("click", function (e) {
			e.preventDefault();
			$(".modal__loading").addClass("active");

			var username = $("#loginUsername").val();
			var password = $("#loginPassword").val();
			// var transactionId = $("#transactionId").val();

			$.ajax({
				url: ajax_object.ajaxurl,
				type: "POST",
				dataType: "json",
				data: {
					action: "custom_login",
					username: username,
					password: password
					// transactionId: transactionId
				},
				success: function (response) {
					console.log(response);
					$(".modal__loading").removeClass("active");

					if (response.loggedin == true) {
						$("#step2").removeClass("active");
						$(".step2").removeClass("active");
						$("#step3").addClass("active");
						$(".step3").addClass("active");

						if (window.location.hostname == "localhost") {
							window.location.href = "//localhost/sankaraeye.com/checkout";
						} else if (window.location.hostname == "sankaraeye.mae") {
							window.location.href = "//sankaraeye.mae/checkout";
						} else {
							window.location.href = "//sankaraeye.com/checkout";
						}
					} else {
						$(".notice__wrapper--message").html("<p>" + response.message + "</p>");
					}
				}
			});
		});

		// REGISTER
		$(".act-register").on("click", function (e) {
			e.preventDefault();

			checkRegisterForm();

			console.log(hasError);
			console.log(ajax_object.ajaxurl);

			var $response = $("#js-dsu-response");
			var $spinner = $("#js-dsu-spinner");

			$spinner.show();
			$response.removeClass("valid invalid").hide().find(".insert-here").html("");

			$(".modal__loading").addClass("active");

			if (hasError) {
				$spinner.hide();

				$("html, body").animate(
					{
						scrollTop: $("#donationContainer").offset().top - 100
					},
					500
				);
			} else {
				var formData = $("#registerForm").serialize();
				console.log(ajax_object.ajaxurl + "?action=custom_register&" + formData);

				$.ajax({
					url: ajax_object.ajaxurl,
					type: "POST",
					data: {
						action: "custom_register",
						name: $("#registerForm #name").val(),
						birthday: $("#registerForm #birthday").val(),
						email: $("#registerForm #userEmail").val(),
						password: $("#registerForm #password").val(),
						address: $("#registerForm #address").val(),
						state: $("#registerForm #state").val(),
						pin: $("#registerForm #pin").val(),
						pan: $("#registerForm #pan").val(),
						how: $("#registerForm #how").val(),
						amount: $("#registerForm #amount").val()
					},
					success: function (data, textStatus, jqXHR) {
						console.log(data);
						console.log(textStatus);
						console.log(jqXHR);

						if (data) {
							// $('#step1, .step1').removeClass('active');
							// $('#step2, .step2').removeClass('active');
							// $('#step3, .step3').addClass('active');
							$(".modal__loading").removeClass("active");
							if (window.location.hostname == "localhost") {
								window.location.href = "//localhost/sankaraeye.com/checkout";
							} else {
								window.location.href = "//" + window.location.hostname + "/checkout";
							}
						} else {
							$(".modal__loading").removeClass("active");
							$(".notice__wrapper--message").html("<p>" + data + "</p>");
							$spinner.hide();
							$response
								.addClass("invalid")
								.show()
								.find(".insert-here")
								.html("<p>" + data + "</p>");
						}
					},
					error: function (data) {
						$spinner.hide();
						$response
							.addClass("invalid")
							.show()
							.find(".insert-here")
							.html("<p>" + data.responseText.replace(/"+/g, "") + "</p>");
					}
				});
			}
		});

		$(".input-must-have-value")
			// .keyup(function (e) {
			// 	this.value = inputMustHaveValue(e, this.value);
			// })
			// .change(function (e) {
			// 	this.value = inputMustHaveValue(e, this.value);
			// })
			.blur(function (e) {
				this.value = inputMustHaveValue(e, this);
				this.value = inputMinMaxValue(e, this);
			});
		// .focus(function (e) {
		// 	this.value = inputMustHaveValue(e, this.value);
		// });
	});

	function inputMustHaveValue(e, t) {
		var value = t.value;
		value = value.replace(/\D/g, ""); // remove all characters
		if (value.indexOf(".") >= 0) value = value.replace(".", ""); // remove decimal period
		if (value.trim() === "0") value = "1";
		if (value.trim() === "") value = "1";
		value = parseInt(value);
		if (value < 1) value = 1;
		return value;
	}

	function inputMinMaxValue(e, t) {
		var value = t.value;

		if (
			typeof t.min !== "undefined" && t.min !== "" &&
			typeof t.max !== "undefined" && t.max !== ""
		) {
			var min = parseInt(t.min);
			var max = parseInt(t.max);
			value = parseInt(value);

			if (value < min) { value = min; }
			else if (value > max) { value = max; }
		}

		return value;
	}

	function checkRegisterForm() {
		var name = $("#name").val();
		var birthdateDay = $("#birthdateDay").val();
		var birthdateMonth = $("#birthdatMonth").val();
		var birthdateYear = $("#birthdateYear").val();
		var email = $("#userEmail").val();
		var username = $("#username").val();
		var password = $("#password").val();
		var confirmPassword = $("#confirmPassword").val();
		var address = $("#address").val();
		var state = $("#state").val();
		var pin = $("#pin").val();
		var pan = $("#pan").val();
		var how = $("#how").val();
		var transactionId = $("#transactionId").val();

		$(".error").remove();

		hasError = false;

		if (name == "") {
			$("#name").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (username == "") {
			$("#username").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (email == "") {
			$("#userEmail").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (password == "") {
			$("#password").after('<span class="error">*This field is required</span>');
			hasError = true;
		} else {
			if (password.length < 6) {
				$("#password").after('<span class="error">*Password must be at least 6 characters long</span>');
				hasError = true;
			}
		}

		if (confirmPassword == "") {
			$("#confirmPassword").after('<span class="error">*This field is required</span>');
			hasError = true;
		} else {
			if (password && password != confirmPassword) {
				$("#password").after('<span class="error">*Password does no match</span>');
				hasError = true;
			}
		}

		if (address == "") {
			$("#address").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (state == "") {
			$("#state").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (pin == "") {
			$("#pin").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		if (pan == "") {
			$("#pan").after('<span class="error">*This field is required</span>');
			hasError = true;
		}

		return hasError;
	}

	function selectDonationCheckbox($checkboxDiv) {
		var $checkboxField = $checkboxDiv.find('input[type="checkbox"]');
		if ($checkboxDiv.hasClass("selected")) {
			$checkboxDiv.removeClass("selected");
			$checkboxField.removeAttr("checked");
		} else {
			$checkboxDiv.addClass("selected");
			$checkboxField.attr("checked", "checked");
		}
	}

	function setDonationTotal($checkboxDiv) {
		var $form = $checkboxDiv.closest("form");
		var $parent = $checkboxDiv.closest(".dparent");
		var $checkboxField = $checkboxDiv.find('input[type="checkbox"]');
		var $amountField = $parent.find(".damount");
		var $qtyField = $parent.find(".dquantity");
		var $netField = $parent.find(".dnetamount");
		var totalField = $form.find("#net_total");
		var $inputNetFields = $form.find(".dnetamount");
		var total = 0;

		// if amount field is empty, clear row and go back
		if ($amountField.val() == "") {
			alert("Please enter amount!");
			$checkboxDiv.removeClass("selected");
			$checkboxField.removeAttr("checked");
			return false;
		}

		// calculate each amount fields
		// and place value to the net amount field to frontend
		if ($checkboxDiv.hasClass("selected")) {
			var netAmount = $amountField.val() * $qtyField.val();
			$netField.val(netAmount);
		} else {
			$netField.val("");
		}

		// get all donation amount and calculate the total donation value
		$inputNetFields.each(function (row, elem) {
			var $elem = $(elem);
			var $parent = $elem.closest(".dparent");
			var $checkboxDiv = $parent.find(".checkbox-div");

			if ($checkboxDiv.hasClass("selected") && $elem.val()) {
				total += parseInt($elem.val());
			}
		});

		// place total donation value to frontend
		totalField.val(total);
		$("#donationAmount").val(total);

		// get product id
		var donation_product = $checkboxField.data("id");

		// console.log(formData);

		if (!$checkboxDiv.hasClass("selected")) {
			// remove product from woo cart
			var formData = {
				add_donation_to_cart: -1,
				ywcds_amount: $amountField.val(),
				action: "remove_from_cart",
				donation_product: donation_product,
				donation_product_qty: $qtyField.val()
			};

			updateWooCart(formData);

			for (var i = 0; i < selectedProductIDs.length; i++)
				if (selectedProductIDs[i] === donation_product) selectedProductIDs.splice(i, 1);
		} else {
			// update product from woo cart
			if (selectedProductIDs.length > 0 && selectedProductIDs.includes(donation_product)) {
				// remove product from woo cart
				var formData1 = {
					add_donation_to_cart: -1,
					ywcds_amount: $amountField.val(),
					action: "remove_from_cart",
					donation_product: donation_product,
					donation_product_qty: $qtyField.val()
				};

				// remove outdated product id
				for (var i = 0; i < selectedProductIDs.length; i++)
					if (selectedProductIDs[i] === donation_product) selectedProductIDs.splice(i, 1);

				// add back new updated product to woo cart
				var formData2 = {
					add_donation_to_cart: -1,
					ywcds_amount: $amountField.val(),
					action: "add_donation_to_the_cart",
					donation_product: donation_product,
					donation_product_qty: $qtyField.val()
				};
				selectedProductIDs.push(donation_product);

				$.ajax({
					type: "POST",
					url: ajax_object.ajaxurl,
					data: formData1,
					dataType: "json",

					success: function (response) {
						console.log(response);

						$.ajax({
							type: "POST",
							url: ajax_object.ajaxurl,
							data: formData2,
							dataType: "json",

							success: function (response) {
								console.log(response);
							}
						});
					}
				});
			} else {
				// add product to woo cart
				var formData = {
					add_donation_to_cart: -1,
					ywcds_amount: $amountField.val(),
					action: "add_donation_to_the_cart",
					donation_product: donation_product,
					donation_product_qty: $qtyField.val()
				};
				updateWooCart(formData);
				selectedProductIDs.push(donation_product);
			}
		}
	}

	function updateWooCart(formData) {
		$.ajax({
			type: "POST",
			url: ajax_object.ajaxurl,
			data: formData,
			dataType: "json",

			success: function (response) {
				console.log(response);
			}
		});
	}

	function computeNetAmount($input) {
		var $form = $input.closest("form");
		var $parent = $input.closest(".dparent");
		var $checkbox = $parent.find(".checkbox-div");
		var $amountField = $parent.find(".damount");
		var $qtyField = $parent.find(".dquantity");
		var $netField = $parent.find(".dnetamount");
		var $totalField = $form.find("#net_total");
		var $inputNetFields = $form.find(".dnetamount");
		var total = 0;

		// add input amount to its respected net amount field to frontend
		if ($checkbox.hasClass("selected")) {
			var netAmount = $amountField.val() * $qtyField.val();
			$netField.val(netAmount);
		} else {
			$netField.val("");
		}

		// get all donation amount and calculate the total
		$inputNetFields.each(function (row, elem) {
			var $elem = $(elem);
			var $parent = $elem.closest(".dparent");
			var $checkbox = $parent.find(".checkbox-div");

			if ($checkbox.hasClass("selected") && $elem.val()) {
				total += parseInt($elem.val());
			}
		});

		// place total to frontend
		$totalField.val(total);
		$("#donationAmount").val(total);
	}

	function submitForm() {
		if (window.location.hostname == "localhost") {
			window.location.href = "//localhost/sankaraeye.com/checkout";
		} else {
			window.location.href = "//" + window.location.hostname + "/checkout";
		}
	}

	function submitFirstStep($container) {
		if ($("body").hasClass("logged-in")) {
			if (window.location.hostname == "localhost") {
				window.location.href = "//localhost/sankaraeye.com/checkout";
			} else {
				window.location.href = "//" + window.location.hostname + "/checkout";
			}
		} else {
			var values = {},
				parent = "",
				type = "",
				amount = "",
				qty = "",
				netTotal = "",
				tax = "",
				types = $container.find(".donation__type:checked"),
				remarks = $container.find("#field--remarks");

			types.each(function (index, e) {
				parent = $(e).parent().parent();
				type = $(e).val();
				amount = parent.find(".damount");
				qty = parent.find(".dquantity");
				netTotal = parent.find(".dnetamount");
				tax = parent.find(".dtax");
				values["remark"] = remarks.val();
				values[index] = {};
				values[index]["type"] = type;
				values[index]["amount"] = $(amount).val();
				values[index]["qty"] = $(qty).val();
				values[index]["netTotal"] = $(netTotal).val();
				values[index]["tax"] = $(tax).val();
			});

			$.ajax({
				url: ajax_object.ajaxurl,
				type: "post",
				data: {
					action: "custom_donation",
					formValues: values
				},
				success: function (response) {
					$(".modal__loading").removeClass("active");
					if (response) {
						$("#step1").removeClass("active");
						$(".step1").removeClass("active");
						$("#step2").addClass("active");
						$(".step2").addClass("active");
						$("#transactionId").val(response);
						$("html, body").animate(
							{
								scrollTop: $("#donationContainer").offset().top - 100
							},
							500
						);
					}
				}
			});
		}
	}

	// CUSTOMIZE ALERT BOX

	var ALERT_TITLE = "Oops!";
	var ALERT_BUTTON_TEXT = "Ok";

	if (document.getElementById) {
		window.alert = function (txt) {
			createCustomAlert(txt);
		};
	}

	function createCustomAlert(txt) {
		var d = document;

		if (d.getElementById("modalContainer")) return;

		var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
		mObj.id = "modalContainer";
		mObj.style.height = d.documentElement.scrollHeight + "px";

		var alertObj = mObj.appendChild(d.createElement("div"));
		alertObj.id = "alertBox";
		alertObj.style.visiblity = "visible";

		var h1 = alertObj.appendChild(d.createElement("h1"));
		h1.appendChild(d.createTextNode(ALERT_TITLE));

		var msg = alertObj.appendChild(d.createElement("p"));
		//msg.appendChild(d.createTextNode(txt));
		msg.innerHTML = txt;

		var btn = alertObj.appendChild(d.createElement("a"));
		btn.id = "closeBtn";
		btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
		btn.href = "#";
		btn.focus();
		btn.onclick = function () {
			removeCustomAlert();
			return false;
		};

		alertObj.style.display = "block";
	}

	function removeCustomAlert() {
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
	}
})(jQuery);

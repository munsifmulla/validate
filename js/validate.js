//Validation Script for Form Validation
//Validate.js 1.0
//@Author MUNSIF MULLA [ http://www.github.com/geekme/ ]
//Date Started : 31/10/2013

(function ($) {

    $.fn.validate = function (options) {
        //Getting main Element
        var _main = this;
        var _inputElements = $(_main).find('[data-element="input"]');
        var _errorElement = $('<span>',{class:'inlineCallOut'});
        var _errorElements = $(_main).find('span');
        var _regName = /^[a-zA-Z ]*$/;//Validation with Alphabets and Spaces
        var _regPhone = /^([0-9\(\)\/\+ \-]*)$/;//Validation with Numbers and No-Spaces
        var _regEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:[a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)/; //Email validation
        var _errorConsole = {};
        var fn, flag=false;


        var config = $.extend({
            inline: true,
            popUp: false,
            onValidate:function(){}
        }, options);

        fn = {
            popUp: '',
            flag:false,
            _addPopUp: function () {
                fn.popUp = $('<div>', {
                    class: 'validatePopUp'
                }).appendTo('body');
                var _popUpheader = $('<div>', {class: "validateHeader"}).html("Validate alert.!").appendTo(fn.popUp);
                var _messageCont = $('<div>', {class: "validateMessage"}).appendTo(fn.popUp);
                var _button = $('<button>', {class: "validateExitPopUp", value: "Ok"}).html("OK").appendTo(fn.popUp);
                var _clear = $('<div>', {class: "clear"}).appendTo(fn.popUp);
            },
            _removePopUp: function () {
                $(".validateExitPopUp").bind("click", function () {
                    if(fn.popUp.hasClass("animated shake")){
                        fn.popUp.removeClass("animated shake");
                        fn.popUp.fadeOut();
                    }
                });
            },
            execute: function () {
                fn._addPopUp();
                fn._removePopUp();
            }
        }

        //Add the Error Elements
        _inputElements.parent().append(_errorElement);
        //Add PopUp Element
        fn.execute();

        this.each(function () {
            $(this).find('[data-element="button"]').on('click', function () {
                //Checking for NULL return
                _inputElements.each(function (key, item) {
                    var _dataType = $(item).data("felement");
                    switch (_dataType) {
                        case 'name':
                            if ($(item).data("mandatory") && $(item).val() == "") {
                                _errorConsole['name'] = "Please provide your Name.";
                            }
                            else if (!_regName.test($(item).val())) {
                                _errorConsole['name'] = "Name should not contain Numbers or Spl. Characters.";
                            }
                            else {
                                _errorConsole['name'] = null;
                            }
                            break;
                        case 'email':
                            if ($(item).data("mandatory") && $(item).val() == "") {
                                _errorConsole['email'] = "Please provide your Email.";
                            }
                            else if (!_regEmail.test($(item).val())) {
                                _errorConsole['email'] = "Please provide an valid Email";
                            }
                            else {
                                _errorConsole['email'] = null;
                            }
                            break;
                        case 'phone':
                            if ($(item).data("mandatory") && $(item).val() == "") {
                                _errorConsole['phone'] = "Please provide your Contact No.";
                            }
                            else if (!_regPhone.test($(item).val())) {
                                _errorConsole['phone'] = "Contact number should not contain any alphabets or spl. Characters ";
                            }
                            else {
                                _errorConsole['phone'] = null;
                            }
                            break;
                        case 'message':
                            if ($(item).data("mandatory") && $(item).val() == "") {
                                _errorConsole['message'] = "Tell us how you feel about it";
                            }
                            else {
                                _errorConsole['message'] = null;
                            }
                            break;
                    }
                });

                $.each(_errorConsole, function (key, item) {
                    if (config.popUp) {
                        if (_errorConsole[key] == null) {
                            _main.find('[data-felement="' + key + '"]').css("background","white");
                            fn.flag = true;
                            return;
                        }
                        else {
                            fn.popUp.find('.validateMessage').html(_errorConsole[key]);
                            if(fn.popUp.hasClass("animated shake")){
                                fn.popUp.removeClass("animated shake");
                                fn.popUp.show().addClass("animated shake");
                            }
                            else{
                                fn.popUp.show().addClass("animated shake");
                            }
                            _main.find('[data-felement="' + key + '"]').css("background","lightyellow");
                            _main.find('[data-felement="' + key + '"]').focus();
                            fn.flag = false;
                            return false;
                        }
                    }
                    else {
                    }
                    if (_errorConsole[key] == null) {
                        _main.find('[data-felement="' + key + '"]').css("background","white");
                        _main.find('[data-felement="' + key + '"]')
                            .parent().find('span')
                            .html("");
                        _main.find('[data-felement="' + key + '"]')
                            .parent().find('span').css('display','none');
                        fn.flag = true;
                        return;
                    }
                    else {
                        _main.find('[data-felement="' + key + '"]')
                            .parent().find('span')
                            .html(_errorConsole[key])
                            .fadeIn().delay(3000).fadeOut();

                        _main.find('[data-felement="' + key + '"]').css("background","lightyellow");
                        _main.find('[data-felement="' + key + '"]').focus();
                        fn.flag = false;
                        return false;
                    }
                });//each ends

                if(fn.flag){
                    config.onValidate().call(this)
                }
            });
        });
    };
}(jQuery));
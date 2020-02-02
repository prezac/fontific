$ = jQuery.noConflict();

//Loading Google Font API

if(typeof(google)!="undefined")
	google.load("webfont", "1");

function fontific_selector_update(obj){
	var selector = obj;
	var prototype = selector.parent().parent().parent().find('.fontific-selector-prototype');
	var collapsed = selector.parent().parent().parent().parent().find('.fontific-rule-collapsed span');
	var wrap = selector.parent();
	var text = selector.val();
	
	if( !text.length ){
		text = selector.attr('rel');
	}
	
	prototype.text(text);
	collapsed.text(text);
	
	var width = prototype.width();

	wrap.width(width+15);

	if( $.browser.webkit ){
		var offset = wrap.offset().left;
		selector.offset({left: offset});
	}
	
}

/**
 *	Collapse font rule
 *
 */
function fontific_rule_collapse(rule){
	var collapsed = rule.find('.fontific-rule-collapsed');
	var fieldset = rule.find('fieldset');

		collapsed.show();
		fieldset.hide();
		rule.addClass('collapsed');
}

/**
 *	Collapse font rule
 *
 */
function fontific_rule_collapse_toggle(rule){
	var collapsed = rule.find('.fontific-rule-collapsed');
	var fieldset = rule.find('fieldset');
	
	if( rule.hasClass('collapsed') ){
		collapsed.hide();
		fieldset.show();
		rule.removeClass('collapsed');
	}else{
		collapsed.show();
		fieldset.hide();
		rule.addClass('collapsed');
	}
}

/**
 *	Collapse all font rules
 *
 */

function fontific_collapse_all(){
	
	$('.fontific-rule').each(function(){
		var rule = $(this);
		var collapsed = rule.find('.fontific-rule-collapsed');
		var fieldset = rule.find('fieldset');

		collapsed.show();
		fieldset.hide();
		rule.addClass('collapsed');
	});
	
}

/**
 *	Expand all font rules
 *
 */

function fontific_expand_all(){
	$('.fontific-rule').each(function(){
		var rule = $(this);
		var collapsed = rule.find('.fontific-rule-collapsed');
		var fieldset = rule.find('fieldset');

		collapsed.hide();
		fieldset.show();
		rule.removeClass('collapsed');
	});
}

function fontific_init_rules(){
	
	// Update font preview
	
	$('.fontific-rule').each(function(){
		var rule = $(this);
		
		var font_family = rule.find('.fontific-font-family').val();
		var font_size = rule.find('.fontific-font-size').val();
		var line_height = rule.find('.fontific-font-spacing-line').val();
		var word_spacing = rule.find('.fontific-font-spacing-word').val();
		var letter_spacing = rule.find('.fontific-font-spacing-letter').val();
		var font_color = rule.find('.fontific-font-color').val();
		var text_shadow_hor = rule.find('.fontific-font-shadow-horizontal').val();
		var text_shadow_ver = rule.find('.fontific-font-shadow-vertical').val();
		var text_shadow_blur = rule.find('.fontific-font-shadow-blur').val();
		var text_shadow_color = rule.find('.fontific-font-shadow-color').val();
                var text_align = rule.find('.fontific-font-text-align').val();
		var text_transform = rule.find('.fontific-font-text-transform').val();
		
		WebFont.load({
			google: {
		    	families: [ font_family + "::cyrillic,latin" ]
			},
			loading: function() {
				//$('.fontific-font-preview textarea').css('color', '#fff');
			},
			fontactive: function(){
				rule.find('.fontific-font-preview textarea').css('font-family', font_family);
				rule.find('.fontific-font-summary .fontfamily').text(font_family);
			}
		});
		
		rule.find('.fontific-font-preview textarea').css({
			'font-size': font_size + 'px',
			'line-height': line_height + 'em',
			'word-spacing': word_spacing + 'em',
			'letter-spacing': letter_spacing + 'em',
			'color': '#' + font_color,
			'text-shadow': text_shadow_hor + 'px ' + text_shadow_ver + 'px '+ text_shadow_blur + 'px '+ '#' + text_shadow_color,
			'text-align': text_align,
			'text-transform':  text_transform,
		});
		
		// Setup color picker
		
		rule.find('.fontific-colorwheel').ColorPicker({
			color: '#000000',
			onChange: function (hsb, hex, rgb) {
				rule.find('.fontific-font-preview textarea').css('color', '#' + hex);
				rule.find('.fontific-font-color').val(hex);
			}
		});
	
                rule.find('.fontific-shadowcolorwheel').ColorPicker({
			color: '#000000',
			onChange: function (hsb, hex, rgb) {
                            var shadow = rule.find('.fontific-font-shadow-horizontal').val() +'px '+rule.find('.fontific-font-shadow-vertical').val()+'px '+rule.find('.fontific-font-shadow-blur').val()+'px '+'#'+hex;
                            rule.find('.fontific-font-preview textarea').css('text-shadow', shadow);
			    rule.find('.fontific-font-shadow-color').val(hex);
			}
		});
		
	});

	// Font family select
	$('.fontific-font-family').change(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		var font_family = $(this).val();
		
		WebFont.load({
			google: {
		    	families: [ font_family + "::cyrillic,latin" ]
			},
			loading: function() {
				//$('.fontific-font-preview textarea').css('color', '#fff');
			},
			fontactive: function(){
				rule.find('.fontific-font-preview textarea').css('font-family', font_family);
				rule.find('.fontific-font-summary .fontfamily').text(font_family);
			}
		});
		
	});
	
	$('.fontific-font-text-align').change(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		rule.find('.fontific-font-preview textarea').css('text-align', $(this).val());
	});

 	$('.fontific-font-text-transform').change(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		rule.find('.fontific-font-preview textarea').css('text-transform', $(this).val());
	});

	$('.fontific-font-variant').change(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		var font_variant = $(this).val();
		
		switch( font_variant ){
			case 'i':
				rule.find('.fontific-font-preview textarea').css('font-weight', 'normal');
				rule.find('.fontific-font-preview textarea').css('font-style', 'italic');
				rule.find('.fontific-font-summary .fontvariant').text("Italic");
			break;
			case 'b':
				rule.find('.fontific-font-preview textarea').css('font-weight', 'bold');
				rule.find('.fontific-font-preview textarea').css('font-style', 'normal');
				rule.find('.fontific-font-summary .fontvariant').text("Bold");
			break;
			case 'ib':
				rule.find('.fontific-font-preview textarea').css('font-weight', 'bold');
				rule.find('.fontific-font-preview textarea').css('font-style', 'italic');
				rule.find('.fontific-font-summary .fontvariant').text("BoldItalic");
			break;
			default:
				rule.find('.fontific-font-preview textarea').css('font-weight', 'normal');
				rule.find('.fontific-font-preview textarea').css('font-style', 'normal');
				rule.find('.fontific-font-summary .fontvariant').text("Regular");
			break;
		}
	});

	// Font size slider

	$('.fontific-font-size-slider').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		var font_size_value = rule.find('.fontific-font-size').val();
		if( font_size_value == '' ){
			font_size_value = 12;
		}
		
		$(this).slider({
			min: 8,
			max: 70,
			value: font_size_value,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
				rule.find('.fontific-font-summary .fontsize').text(ui.value + 'px');
				rule.find('.fontific-font-preview textarea').css('font-size', ui.value);
				rule.find('.fontific-font-size').val(ui.value);
			}
		});
		
	});

	// Font spacing sliders
	
	// Line height
	$('.fontific-spacing-line').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_line_height_value = rule.find('.fontific-font-spacing-line').val();
		if( font_line_height_value == '' ){
			font_line_height_value = 1;
		}
		
		$(this).slider({
			min: 0,
			max: 5,
			value: font_line_height_value,
			step: 0.1,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
				rule.find('.fontific-font-preview textarea').css('line-height', ui.value + 'em' );
				rule.find('.fontific-font-spacing-line').val(ui.value);
			}
		});
	});
	
	// Word spacing
	$('.fontific-spacing-word').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_word_spacing_value = rule.find('.fontific-font-spacing-word').val();
		if( font_word_spacing_value == '' ){
			font_word_spacing_value = 0;
		}
		
		$(this).slider({
			min: 0,
			max: 3,
			value: font_word_spacing_value,
			step: 0.01,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
				rule.find('.fontific-font-preview textarea').css('word-spacing', ui.value + 'em' );
				rule.find('.fontific-font-spacing-word').val(ui.value);
			}
		});
	});
	
	// Letter spacing

	$('.fontific-spacing-letter').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_letter_spacing_value = rule.find('.fontific-font-spacing-letter').val();
		if( font_letter_spacing_value == '' ){
			font_letter_spacing_value = 0;
		}
		
		$(this).slider({
			min: 0,
			max: 3,
			value: font_letter_spacing_value,
			step: 0.01,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
				rule.find('.fontific-font-preview textarea').css('letter-spacing', ui.value + 'em' );
				rule.find('.fontific-font-spacing-letter').val(ui.value);
			}
		});
	});
	
        $('.fontific-shadow-horizontal').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_shadow_horizontal_value = rule.find('.fontific-font-shadow-horizontal').val();
		if( font_shadow_horizontal_value == '' ){
			font_shadow_horizontal_value = 0;
		}
		
		$(this).slider({
			min: -5,
			max: 5,
			value: font_shadow_horizontal_value,
			step: 0.01,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
                                var shadow = ui.value +'px '+rule.find('.fontific-font-shadow-vertical').val()+'px '+rule.find('.fontific-font-shadow-blur').val()+'px #'+rule.find('.fontific-font-shadow-color').val();
				rule.find('.fontific-font-preview textarea').css('text-shadow', shadow );
				rule.find('.fontific-font-shadow-horizontal').val(ui.value);
			}
		});
	});
        
        $('.fontific-shadow-vertical').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_shadow_vertical_value = rule.find('.fontific-font-shadow-vertical').val();
		if( font_shadow_vertical_value == '' ){
			font_shadow_vertical_value = 0;
		}
		
		$(this).slider({
			min: -5,
			max: 5,
			value: font_shadow_vertical_value,
			step: 0.01,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
                                var shadow = rule.find('.fontific-font-shadow-horizontal').val()+'px '+ui.value +'px '+rule.find('.fontific-font-shadow-blur').val()+'px #'+rule.find('.fontific-font-shadow-color').val();
                                rule.find('.fontific-font-preview textarea').css('text-shadow', shadow );
				rule.find('.fontific-font-shadow-vertical').val(ui.value);
			}
		});
	});
        
        $('.fontific-shadow-blur').each(function(){
		var rule = $(this).parent().parent().parent().parent().parent();
		
		var font_shadow_blur_value = rule.find('.fontific-font-shadow-blur').val();
		if( font_shadow_blur_value == '' ){
			font_shadow_blur_value = 0;
		}
		
		$(this).slider({
			min: -5,
			max: 5,
			value: font_shadow_blur_value,
			step: 0.01,
			slide: function(event, ui){
				var rule = $(this).parent().parent().parent().parent().parent();
                                var shadow = rule.find('.fontific-font-shadow-horizontal').val()+'px '+rule.find('.fontific-font-shadow-vertical').val()+'px '+ui.value+'px #'+rule.find('.fontific-font-shadow-color').val();
                                rule.find('.fontific-font-preview textarea').css('text-shadow', shadow );
				rule.find('.fontific-font-shadow-blur').val(ui.value);
			}
		});
	});
                
	$('.fontific-selector').each(function(){
		
		/* Init all selector fields */
		fontific_selector_update($(this));
		
		$(this).focus(function(){
			var selector = $(this);
			var legend = selector.parent().parent();
			legend.addClass('focused');
			
			var text = selector.val();
			var rel = selector.attr('rel');
			
			if( text == rel ){
				selector.val('');
			}
			
		});
		
		$(this).blur(function(){
			var selector = $(this);
			var legend = selector.parent().parent();
			legend.removeClass('focused');
			
			var text = selector.val();
			var rel = selector.attr('rel');
			
			if( text == '' ){
				selector.val(rel);
			}
		});
		
		$(this).keyup(function(){
			fontific_selector_update($(this));
		});
	});
	
	// Rule controls
	$('.fontific-rule-controls .collapse').unbind();
	$('.fontific-rule-controls .collapse').click(function(){
		var rule = $(this).parent().parent();
		fontific_rule_collapse_toggle(rule);
	});
	
	$('.fontific-rule-controls .delete').unbind();
	$('.fontific-rule-controls .delete').each(function(){
		var rule = $(this).parent().parent();
		
		$(this).click(function(){
			
			if( confirm( 'Are you sure you want to delete the rule?' ) ){
				rule.slideUp('slow', function(){
					rule.remove();
					
					var data = {
							action: 'fontific_delete',
							rule: rule.attr('rel'),
						};

						$.post(ajaxurl, data, function(response) {
						});
					
				});
			}
		});
	});
	
	// Collapse at load
	$('.fontific-rule').each(function(){
		var rule = $(this);
		if( rule.hasClass('collapsed') ){
			fontific_rule_collapse(rule);
		}
	});
}

$(document).ready(function(){
	
	fontific_init_rules();
	
	// Add new font rule
	$('#fontific-add-rule a').click(function(){
		var data = {
				action: 'fontific_add_rule'
			};

			$.post(ajaxurl, data, function(response) {
				var container = '#fontific-font-factory';
				$(container).append(response);
				fontific_init_rules();
			});
		
	});
	
	// Save all changes
	$('.save-all a').click(function(){
		
		var rules = new Array();
		
		var button = $(this);
		
		button.addClass('ajax');
		
		$('.fontific-rule').each(function(){
			var rule = $(this);
			
			var font_variant = rule.find('.fontific-font-variant').val();
			var font_weight = "normal";
			var font_style = "normal";
                        var text_shadow_hor = rule.find('.fontific-font-shadow-horizontal').val();
                        var text_shadow_ver = rule.find('.fontific-font-shadow-vertical').val();
                        var text_shadow_blur = rule.find('.fontific-font-shadow-blur').val();
                        var text_shadow_color = rule.find('.fontific-font-shadow-color').val();
                        var text_shadow = text_shadow_hor+" "+text_shadow_ver+" "+text_shadow_blur+" "+text_shadow_color;
	
			switch(font_variant){
				case 'r': // Regular
				break;
				case 'b': // Bold
					font_weight = "bold";
					font_style = "normal";
				break;
				case 'i': // Italic
					font_weight = "normal";
					font_style = "italic";
				break;
				case 'ib': // Bold Itali
					font_weight = "bold";
					font_style = "italic";
				break;
			}
			
			rule_capsule = {
				//id: rule.attr('rel'),
				selector: rule.find('.fontific-selector').val(),
				font_family: rule.find('.fontific-font-family').val(),
				font_variant: font_variant,
				font_weight: font_weight,
				font_style: font_style,
				font_size: rule.find('.fontific-font-size').val(),
				font_color: rule.find('.fontific-font-color').val(),
				font_line_height: rule.find('.fontific-font-spacing-line').val(),
				font_word_spacing: rule.find('.fontific-font-spacing-word').val(),
				font_letter_spacing: rule.find('.fontific-font-spacing-letter').val(),
                                text_shadow: text_shadow,
                                text_align: rule.find('.fontific-font-text-align').val(),
                                text_transform: rule.find('.fontific-font-text-transform').val(),
                                collapsed: (rule.hasClass('collapsed'))?true:false
			};
			rules.push( rule_capsule );
		});
		
		var data = {
				action: 'fontific_save_all',
				rules: rules,
			};

			$.post(ajaxurl, data, function(response) {
				var container = '#fontific-font-factory';
				$(container).append(response);
				fontific_init_rules();
				button.removeClass('ajax');
			});
		
	});

	// Collapse all, uncollapse all
	$('.fontific-controls .collapse-all').click(function(){
		fontific_collapse_all();
	});
	
	$('.fontific-controls .expand-all').click(function(){
		fontific_expand_all();
	});
	
	
});

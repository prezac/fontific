<?php

$font_variants = array(
	'r' => __('Regular', 'fontific'),
	'i' => __('Italic', 'fontific'),
	'b' => __('Bold', 'fontific'),
	'ib' => __('BoldItalic', 'fontific'),
);

$font_text_align = array(
	'initial' => __('initial', 'fontific'),
	'center' => __('center', 'fontific'),
	'left' => __('left', 'fontific'),
	'right' => __('right', 'fontific'),
	'justify' => __('justify', 'fontific'),
	'inherit' => __('inherit', 'fontific'),
);

$font_text_transform = array(
	'none' => __('none', 'fontific'),
	'capitalize' => __('capitalize', 'fontific'),
	'uppercase' => __('uppercase', 'fontific'),
        'lowercase' => __('lowercase', 'fontific'),
);

$shadow = explode(" ", $rule['text_shadow']);
?>
<div id="fontific-rule-<?php echo $rule['id'];?>" class="fontific-rule<?php if($rule['collapsed']=='true'):?> collapsed<?php endif?>" rel="<?php echo $rule['id'];?>">
	<div class="fontific-rule-controls">
		<a href="javascript:void(0);" class="collapse" title="<?php _e('Collapse rule', 'fontific')?>"><img src="<?php echo plugins_url('images/collapse.png', __FILE__);?>" alt="collapse"/></a>
		<a href="javascript:void(0);" class="delete" title="<?php _e('Delete rule', 'fontific')?>"><img src="<?php echo plugins_url('images/delete.png', __FILE__);?>" alt="delete"/></a>
	</div>
	<div class="fontific-rule-collapsed">
		<span></span>
	</div>
	<fieldset>
		<legend>
			<span class="fontific-selector-wrap">
				<input type="text" value="<?php echo $rule['selector']?>" class="fontific-selector" rel="<?php _e('Enter selector here', 'fontific');?>"/>
			</span>
		</legend>
		<span class="fontific-selector-prototype"></span>

		<div class="fontific-font-settings">

			<div class="fontific-font-wrap">

				<div class="fontific-font-family-wrap">
					<label><?php _e('Font family', 'fontific');?></label>
					<select class="fontific-font-family" name="font[family]">
						<?php foreach( $google_fonts as $font ):?>
							<?php if( $font == $rule['font_family'] ):?>
							<option selected="selected"><?php echo $font;?></option>
							<?php else: ?>
							<option><?php echo $font;?></option>
							<?php endif;?>
						<?php endforeach; ?>
					</select>
				</div><!-- .fontific-font-family-wrap -->

				<div class="fontific-font-variant-wrap">
				        <input type="hidden" class="fontific-font-weight" value="<?php echo $rule['font_weight']?>"/>
				        <input type="hidden" class="fontific-font-style" value="<?php echo $rule['font_style']?>"/>
					<label><?php _e('Variant', 'fontific');?></label>
					<select class="fontific-font-variant" name="font[variant]">
						<?php foreach( $font_variants as $k => $variant ):?>
							<?php if( $k == $rule['font_variant'] ):?>
							<option selected="selected" value="<?php echo $k ?>"><?php echo $variant;?></option>
							<?php else: ?>
							<option value="<?php echo $k ?>"><?php echo $variant;?></option>
							<?php endif;?>
						<?php endforeach; ?>
					</select>
				</div><!-- .fontific-font-variant-wrap -->

			</div><!-- .fontific-font-wrap -->

			<div class="fontific-font-outfit-wrap">

				<div class="fontific-font-size-wrap">
					<label><?php _e('Font size', 'fontific');?></label>
					<div class="fontific-font-size-slider"></div>
					<input type="hidden" class="fontific-font-size" value="<?php echo $rule['font_size']?>"/>
				</div><!-- .fontiffic-font-size-wrap -->

				<div class="fontific-font-color-outer-wrap">
					<label><?php _e('Font color', 'fontific');?></label>
					<span class="fontific-font-color-wrap">
						<label for="fc">#</label>
						<input type="text" size="6" name="font[color]" class="fontific-font-color" maxlength="6" value="<?php echo $rule['font_color']?>"/>

					</span>
					<img src="<?php echo plugins_url( 'images/color.png', __FILE__ );?>" alt="Color wheel" class="fontific-colorwheel"/>
				</div><!-- .fontiffic-font-color-outer-wrap -->

			</div><!-- .fontific-font-outfit-wrap -->

		</div><!-- .fontific-font-factory -->
		<div class="fontific-font-preview">
			<label><?php _e('Preview', 'fontific');?><span class="fontific-font-summary"><span class="fontfamily"><?php echo $rule['font_family'];?></span>, <span class="fontsize"><?php echo $rule['font_size'];?>px</span>, <span class="fontvariant"><?php echo $font_variants[$rule['font_variant']];?></span></span></label>
				<textarea><?php _e('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'fontific');?></textarea>
		</div><!-- .fontific-font-preview -->
		<div class="fontific-font-spacing">
			<div class="fontific-spacing-line-wrap">
				<label><?php _e('Line height', 'fontific');?></label>
				<div class="fontific-spacing-line"></div>
				<input type="hidden" class="fontific-font-spacing-line" value="<?php echo $rule['font_line_height']?>"/>
			</div><!-- .fontific-spacing-line-wrap -->
			<div class="fontific-spacing-word-wrap">
				<label><?php _e('Word spacing', 'fontific');?></label>
				<div class="fontific-spacing-word"></div>
				<input type="hidden" class="fontific-font-spacing-word" value="<?php echo $rule['font_word_spacing']?>"/>
			</div><!-- .fontific-spacing-word-wrap -->
			<div class="fontific-spacing-letter-wrap">
				<label><?php _e('Letter spacing', 'fontific');?></label>
				<div class="fontific-spacing-letter"></div>
				<input type="hidden" class="fontific-font-spacing-letter" value="<?php echo $rule['font_letter_spacing']?>"/>
			</div><!-- .fontific-spacing-letter-wrap -->
			<div class="fontific-font-text-align-wrap">
				<label><?php _e('Text align', 'fontific');?></label>
				<select class="fontific-font-text-align" name="font[text_align]">
					<?php foreach( $font_text_align as $k => $text_align ):?>
						<?php if( $k == $rule['text_align'] ):?>
						<option selected="selected" value="<?php echo $k ?>"><?php echo $text_align;?></option>
						<?php else: ?>
						<option value="<?php echo $k ?>"><?php echo $text_align;?></option>
						<?php endif;?>
					<?php endforeach; ?>
				</select>
			</div><!-- .fontific-font-text-align-wrap -->
			<div class="fontific-font-text-transform-wrap">
				<label><?php _e('Text transform', 'fontific');?></label>
				<select class="fontific-font-text-transform" name="font[text_transform]">
					<?php foreach( $font_text_transform as $k => $text_transform ):?>
						<?php if( $k == $rule['text_transform'] ):?>
						<option selected="selected" value="<?php echo $k ?>"><?php echo $text_transform;?></option>
						<?php else: ?>
						<option value="<?php echo $k ?>"><?php echo $text_transform;?></option>
						<?php endif;?>
					<?php endforeach; ?>
				</select>
			</div><!-- .fontific-font-text-transform-wrap -->
		</div><!-- .fontiffic-font-spacing -->

		<div class="fontific-font-shadow">
			<div class="fontific-shadow-horizontal-wrap">
				<label><?php _e('Horizontal shadow position', 'fontific');?></label>
				<div class="fontific-shadow-horizontal"></div>
				<input type="hidden" class="fontific-font-shadow-horizontal" value="<?php echo $shadow[0]?>"/>
			</div><!-- .fontific-shadow-horizontal-wrap -->
			<div class="fontific-shadow-vertical-wrap">
				<label><?php _e('Vertical shadow position', 'fontific');?></label>
				<div class="fontific-shadow-vertical"></div>
				<input type="hidden" class="fontific-font-shadow-vertical" value="<?php echo $shadow[1]?>"/>
			</div><!-- .fontific-shadow-vertical-wrap -->
			<div class="fontific-shadow-blur-wrap">
				<label><?php _e('Blur shadow position', 'fontific');?></label>
				<div class="fontific-shadow-blur"></div>
				<input type="hidden" class="fontific-font-shadow-blur" value="<?php echo $shadow[2]?>"/>
			</div><!-- .fontific-shadow-blur-wrap -->
			<div class="fontific-font-shadow-color-outer-wrap">
				<label><?php _e('Shadow color', 'fontific');?></label>
				<span class="fontific-font-shadow-color-wrap">
					<label for="fc">#</label>
					<input type="text" size="6" name="text[shadow_color]" class="fontific-font-shadow-color" maxlength="6" value="<?php if ($shadow[3]=="") {echo $rule['text_shadow_color'];}else{echo $shadow[3];}?>"/>
				</span>
				<img src="<?php echo plugins_url( 'images/color.png', __FILE__ );?>" alt="Color wheel" class="fontific-shadowcolorwheel"/>
			</div><!-- .fontiffic-font-shadow_color-outer-wrap -->
		</div><!-- .fontiffic-font-shadow -->
	</fieldset>
</div>

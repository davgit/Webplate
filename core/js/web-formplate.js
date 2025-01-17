/**
 * jQuery File: 	formplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	23 May 2014
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $plugin_name					= 'formplate', $defaults =
	{
	};

	// The actual plugin constructor
	function Plugin($element, $options) 
	{
		this.element 					= $element;
		this.settings 					= $.extend({}, $defaults, $options);
		this._defaults 					= $defaults;
		this._name 						= $plugin_name;

		// Initilize plugin
		this.init();
	}


	// Plugin
	// ---------------------------------------------------------------------------------------
	Plugin.prototype 					= 
	{
		init 							: function()
		{
			// Variables
			// ---------------------------------------------------------------------------------------
			var $this 					= this;
			var $settings 				= $this.settings;


			// Execute
			// ---------------------------------------------------------------------------------------
			// Setup
			$this.setup_formplate();
		},

		// Public functions
		// ---------------------------------------------------------------------------------------
		setup_formplate 				: function($arrows_html)
		{
			// Variables
			var $this 					= this;
			var $settings 				= $this.settings;

			// Set the colour scheme
			$data_form_colour			= $('body').data('formplate-colour');
			if($data_form_colour != undefined)
			{
				$('html').addClass('fp-colour-' + $data_form_colour);
			}

			// Checkboxes
			$('.formplate input[type="checkbox"]').each(function()
			{
				// Wrap input
				$(this).wrap('<span class="fp-checkbox"></span>');

				// Check state
				if($(this).is(':checked'))
				{
					$(this).parents('.fp-checkbox').addClass('checked');
				}
			});

			// Toggle on change
			$('.formplate .fp-checkbox').on('click', function()
			{
				var $checkbox 		= $(this).find('input[type="checkbox"]');

				// Check current state
				if($(this).hasClass('checked'))
				{
					$checkbox.removeAttr('checked');
				}
				else
				{
					$checkbox.attr('checked', 'checked');
				}

				// Toggle the class
				$(this).toggleClass('checked');
			});

			// Radio inputs
			$('.formplate input[type="radio"]').each(function()
			{
				// Wrap input
				$(this).wrap('<span class="fp-radio"></span>');

				// Check state
				if($(this).is(':checked'))
				{
					$(this).parents('.fp-radio').addClass('checked');
				}
			});

			// Execute on change
			$('.formplate input[type="radio"]').change(function()
			{
				// Check for all other similarly named elements
				var $radio_name 	= $(this).attr('name');
				$('input[name="'+ $radio_name +'"]').parents('.fp-radio').removeClass('checked');
				
				// Check current one
				$(this).parents('.fp-radio').toggleClass('checked');
			});

			// Drop-down selects
			$('.formplate select').each(function()
			{
				// Wrap select
				$(this).wrap('<span class="fp-select"></span>');
			});
		}
	};


	// Plugin wrapper
	// ---------------------------------------------------------------------------------------
	$.fn[$plugin_name] 					= function($options)
	{
		var $plugin;

		this.each(function()
		{
			$plugin 					= $.data(this, 'plugin_' + $plugin_name);

			if(!$plugin)
			{
				$plugin 				= new Plugin(this, $options);
				$.data(this, 'plugin_' + $plugin_name, $plugin);
			}
		});

		return $plugin;
	};
})(jQuery, window, document);



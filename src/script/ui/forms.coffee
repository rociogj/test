F6 = F6 or {}
F6.Forms = do ->
  _api = {}
  isDesktop = $(window).width() > 992
  documentClick = false
  init = ->
    _api.setupCustomSelect()
    _api.setupDateField()
    # _api.fieldValidation()
    return

  _api.setupCustomSelect = (select) ->
  		# Handler of select click
	   $('.form__select-oper').on 'click', ->
	    		selectWidth = $(@).outerWidth()
		    	$(@).mousedown ->
		    		false
		    	$('.form__select-dropdown').css
		    		   'top': $(@).position().top + parseInt($(@).css('height')) + 15
		    	if !$(@).next('.form__select-dropdown').hasClass('open')
		    		$('.form__select-oper').removeClass 'select--opened'
		    		$('.form__select-dropdown').stop(true, true).fadeOut('fast').removeClass 'open'
		    		$(@).addClass 'select--opened'
		    		$(@).next('.form__select-dropdown').stop(true, true).fadeIn()
		    		$(@).next('.form__select-dropdown').css
		    		   'top': $(@).position().top + parseInt($(@).css('height'))
		    		   'left': $(@).position().left
		    		   'width': selectWidth
		    		$(@).next('.form__select-dropdown').addClass 'open'
		    	else
		    		$(@).next('.form__select-dropdown').stop(true, true).fadeOut('fast').removeClass 'open'
		    		$(@).removeClass 'select--opened'
		    	return
			
				# Handler of options click
				$('.form__select-dropdown li').on 'click', (event) ->
						event.preventDefault()
						value = $(@).attr('data-value')
						$('.form__select-dropdown li').removeClass 'active'
						$(@).addClass 'active'
						$(@).parents('.form__select-field').find('input').val value
						$(@).parents('.form__select-field').find('.form__select-oper').text(value).removeClass 'select--opened'
						$(@).parents('.form__select-field').find('.form__select-dropdown').stop(true, true).fadeOut('fast').removeClass 'open'
						return

				$(window).on 'click', ->
						if $('.form__select-dropdown').hasClass 'open'
			 				$('.form__select-dropdown').fadeOut('fast').removeClass 'open'
			 				$('.form__select-oper').removeClass 'select--opened'
			 				return
				$('.form__select-field').on 'click', (event) ->
					event.stopPropagation()
					return
				return		
	  
  _api.setupDateField = ->
	   if !$('input.datepicker-input').length
	     return true
	   $('input.datepicker-input').datepicker
	     classes: 'form__date-field'
	     language:
	       days: [
	         'Domingo'
	         'Lunes'
	         'Martes'
	         'Miercoles'
	         'Jueves'
	         'Viernes'
	         'Sábado'
	       ]
	       daysShort: [
	         'D'
 	         'L'
	         'M'
	         'X'
	         'J'
	         'V'
	         'S'
	       ]
   	    daysMin: [
	         'D'
	         'L'
	         'M'
	         'X'
	         'J'
	         'V'
	         'S'
	       ]
	       dateFormat: 'dd/mm/yyyy'
	       months: [
	         'Enero'
	         'Febrero'
	         'Marzo'
	         'Abril'
	         'Mayo'
	         'Junio'
	         'Julio'
	         'Agosto'
	         'Septiembre'
	         'Octubre'
	         'Noviembre'
	         'Diciembre'
	       ]
	       monthsShort: [
	         'Ene'
	         'Feb'
	         'Mar'
	         'Abr'
	         'May'
	         'Jun'
	         'Jul'
 	         'Ago'
 	         'Sep'
	         'Oct'
	         'Nov'
	         'Dic'
	       ]
	       today: 'Hoy'
	       clear: 'Borrar'
	   $('input.datepicker-input').data 'datepicker'
	   return

	 init()
	 return _api
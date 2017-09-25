jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 767

  init = ->
    setFeaturesTabs()
    setJSON()
    return


  setFeaturesTabs = ->
    $('.features__tab a').on 'click', (event) ->
      event.preventDefault()
      if $(@).hasClass 'active'
        return true
      tab = $(@).attr('data-tab')
      $('.features__tab a').removeClass 'active'
      $('.features__content').hide(0).removeClass 'active'
      $(@).addClass 'active'
      $('.features__content[data-tab='+tab+']').fadeIn().addClass 'active'
      $('.features__contents').attr('data-tab', tab)
      return
    return

  setJSON = ->
    $.getJSON 'http://taco-randomizer.herokuapp.com/random/', (data) ->
    	items = []
    	$.each data, (key, val) ->
    		if val == undefined
    			return true
    		if key == 'shell'
    			return true
    		items.push '<p class=\'feature__title\'>' + val.name + '</p>'
    		items.push '<p class=\'feature__description\'>' + val.recipe.substring(50, 100) + '</p>'
    		items.push '<a href="#" class=\'feature__link\'>' + val.recipe.substring(70, 76) + '</a>'
    		items.push '<a href="#" class=\'feature__link\'>' + val.recipe.substring(55, 67) + '</a>'
    		items.push '<a href="#" class=\'feature__link\'>' + val.recipe.substring(73, 80) + '</a>'
    		items.push '<a href="#" class=\'btn btn--secondary\'>' + val.recipe.substring(0, 12) + '</a>'######
	    	$('<div/>',
	    		'class': 'feature col-md-3 col-sm-6 col-xs-12'
	    		html: items.join('')).appendTo '.features .belt'
	    	items = []
    		return
    	return
   	return

  init()
  return
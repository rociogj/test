jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 1023

  init = ->
  			if !isDesktop
      			setFooterNav()
      			return
      setJSONFooter()
      return

  setFooterNav = ->
    $('.footer__item').on 'click touchstart', (event) ->
      event.preventDefault()
      if $(@).hasClass 'active'
        $(@).removeClass 'active'
        $(@).find('ul').stop(true, true).slideUp()
        return true
      $('.footer__item').removeClass 'active'
      $('.footer__item ul').slideUp()
      $(@).addClass 'active'
      $(@).find('ul').stop(true, true).slideDown()
      return
    return

  setJSONFooter = ->
    $.getJSON 'https://netflixroulette.net/api/api.php?actor=Leonardo%20Dicaprio', (data) ->
    	items = []
    	$.each data, (key, val) ->
    		if val == undefined
    			return true
    		if key == 5
    			return true
    		items.push '<a href="#">' + val.director + '</a>'
    		items.push '<ul class="col-xs-12">'
    		items.push '<li><a href="#">' + val.show_title + '</a></li>'
    		items.push '<li><a href="#">' + val.show_title + '</a>'
    		items.push '<li><a href="#">' + val.show_title + '</a>'
    		items.push '<li><a href="#">' + val.show_title + '</a>'
    		items.push '<li><a href="#">' + val.show_title + '</a>'
    		items.push '</ul>'
	    	$('<li/>',
	    		'class': 'col-lg-2 col-md-2 col-sm-12 col-xs-12 footer__item'
	    		html: items.join('')).appendTo '.footer__list'
	    	items = []
    		return
    	return
   	return


  init()
  return
jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 767

  init = ->
  	if !isDesktop
      setBurgerNav()
      return
    #setJSON()
    return

  setBurgerNav = ->
    $('.burger-nav').on 'click', (event) ->
      event.preventDefault()
      $('nav').toggleClass 'open'
      return
    return

  setJSON = ->
    $.getJSON 'http://api.dataatwork.org/v1/jobs', (result) ->
      breeds = result.message
      return
    $.getJSON 'http://api.dataatwork.org/v1/jobs', (data) ->
      items = []
      console.log data
      $.each data, (key, val) ->
        console.log('val', val.title)
        items.push '<li class=\'item\'>'
        items.push '<p class=\'text\'>' + val.title + '</p>'
        items.push '</li>'
        return
      $('<ul/>',
        'class': 'new-list'
        html: items.join('')).appendTo '.footer__list ul'
      return

  init()
  return
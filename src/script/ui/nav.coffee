jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 767

  init = ->
  	if !isDesktop
      setBurgerNav()
      return
    return

  setBurgerNav = ->
    $('.burger-nav').on 'click', (event) ->
      event.preventDefault()
      $('nav').toggleClass 'open'
      return
    return

  init()
  return
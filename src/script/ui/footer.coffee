jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 1023

  init = ->
  	if !isDesktop
      setFooterNav()
      return
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

  

  init()
  return
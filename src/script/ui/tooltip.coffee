eventOn = undefined
eventOff = undefined
F6 = F6 or {}
F6.Tooltip = do ->
  _api = {}
  isDesktop = $(window).width() > 992
  isMobile = $(window).width() <= 767
  isTablet = $(window).width() > 767 and $(window).width() <= 1024
  _api.init = ->
    setupEvents()
    return


  setupEvents = ->
    if isMobile or isTablet
      eventOn = 'click'
      eventOff = 'click'
      $('.tooltip-container').on eventOn, (event) ->
        event.stopPropagation()
        return
      $(window).on eventOn, hideTooltip
    else
      eventOn = 'mouseover'
      eventOff = 'mouseout'
      $('.tooltip-icon').on eventOff, ->
        hideTooltip $(@)
        return

    $('.tooltip-icon').on eventOn, ->
      if isDesktop
        showTooltip $(@)
        return

  showTooltip = (elem) ->
    if elem == undefined
      elem = $('.tooltip-icon')
    tooltipHeight = elem.next('.tooltip-content').outerHeight(true)
    tooltipWidth = elem.next('.tooltip-content').outerWidth(true)

    ###update left attr from -14000rem (css)###

    if isDesktop
      elem.next('.tooltip-content').css 'left': tooltipWidth / -2

    ###Define vertical tooltip position###

    ###Calculate the space from icon to window's top to define tooltip position###

    topPosition = undefined
    iconOffsetTop = elem.offset().top - $(document).scrollTop()
    iconOffsetTopHeader = elem.offset().top - $(window).scrollTop() - $('header').outerHeight(true)

    ###tooltip top arrow###

    if iconOffsetTop < tooltipHeight or iconOffsetTopHeader < tooltipHeight
      elem.parents('.tooltip-container').addClass 'top-arrow'
      topPosition = tooltipHeight + 38 - tooltipHeight

      ###tooltip bottom arrow###

    else
      elem.parents('.tooltip-container').removeClass 'top-arrow'
      topPosition = tooltipHeight * -1 - 15

    ###Define hozirontal tooltip position###

    ###La posicion se calcula en funcion de la anchura, por lo que si esta cambia, hay que volver a ajustarla###

    $('.tooltip-container').removeClass 'visible'
    elem.parents('.tooltip-container').addClass 'visible'
    if isDesktop
      elem.next('.tooltip-content').css
        'top': topPosition
        'left': tooltipWidth / -2

      ###******** Calculate tooltip width and update left value*****###

      totalWidth = elem.next('.tooltip-content').offset().left + tooltipWidth
      subtractWidth = (totalWidth - $(window).width()) * 2
      if totalWidth > $(window).width()
        tooltipWidth -= subtractWidth + 50
        elem.next('.tooltip-content').css
          'min-width': tooltipWidth
          'left': tooltipWidth / -2
    return

  hideTooltip = (elem) ->
    $('.tooltip-container').removeClass 'visible'
    $('.tooltip-content').removeClass 'current'
    return





  _api.init()
  return _api
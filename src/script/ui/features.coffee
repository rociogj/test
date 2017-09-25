jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 767

  init = ->
    setFeaturesTabs()

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

  init()
  return
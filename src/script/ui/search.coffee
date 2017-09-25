jQuery(document).ready ($) ->
  isDesktop = $(window).width() > 767

  init = ->
    setSearchTabs()


  setSearchTabs = ->
    $('.search__tab a').on 'click', (event) ->
      event.preventDefault()
      if $(@).hasClass 'active'
        return true
      tab = $(@).attr('data-tab')
      $('.search__tab a').removeClass 'active'
      $('.search__content').hide(0).removeClass 'active'
      $(@).addClass 'active'
      $('.search__content[data-tab='+tab+']').fadeIn().addClass 'active'
      $('.search__contents').attr('data-tab', tab)
      return
    return

  init()
  return
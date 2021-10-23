# requestErrorText

The `requestErrorText` configuration parameter sets the error message text that will appear in {% raw %}[`data-ajax-cart-messages="{{ line_item.key }}"`](/reference/data-ajax-cart-messages/){% endraw %} containers when a Cart Ajax API request is not successful and doesn't have any error descriptions, or if the request is not performed at all due to internet connection, for example.

By default the text is "*There was an error while updating your cart. Please try again.*".

You can change the message if your store language is not English or the phrase doesn't fit to your store:
{% raw %}
```html
<script type="module">
  import { configure } from {% endraw %}{% include code/last-release-file-name.html asset_url=true %}{% raw %};

  configure({
  	requestErrorText: `{{ 'sections.cart.cart_error' | t }}`
  })
</script>
```
{% endraw %}